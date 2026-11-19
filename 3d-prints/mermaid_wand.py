import numpy as np, trimesh, sys
from shapely.geometry import Polygon, Point, LineString, box
from shapely.ops import unary_union
from shapely import affinity

def ext(poly, h, z0=0):
    poly = poly.buffer(0)
    parts = [poly] if poly.geom_type=='Polygon' else list(poly.geoms)
    ms=[]
    for p in parts:
        m = trimesh.creation.extrude_polygon(p, h); m.apply_translation([0,0,z0]); ms.append(m)
    return ms

def soft(poly, h, inset=0.8, top=1.0):
    """slab with stepped/softened top edge"""
    return ext(poly, h-top) + ext(poly.buffer(-inset), top, h-top)

def ellipse(cx,cy,rx,ry,ang=0):
    e = affinity.scale(Point(0,0).buffer(1,64), rx, ry)
    return affinity.translate(affinity.rotate(e, ang, origin=(0,0)), cx, cy)

parts=[]
# --- handle (y from 22 to 150), 10 mm wide, rounded
handle = LineString([(0,22),(0,150)]).buffer(5, cap_style=1)
parts += soft(handle, 6)
# grip bands
for y in (40,48,56):
    parts += ext(box(-4.2,y-1.2,4.2,y+1.2), 0.8, 6)

# --- mermaid tail (bottom)
fluke = unary_union([
    ellipse(-11,9,14,6.5,-28), ellipse(11,9,14,6.5,28),
    Polygon([(-5,26),(5,26),(5,5),(-5,5)]),
])
notch = Polygon([(0,6),(-4,-6),(4,-6)])
fluke = fluke.difference(notch).buffer(1).buffer(-1)
parts += soft(fluke, 4.2)
# raised fin lines on tail
for s in (-1,1):
    for k,a in enumerate((15,30,45)):
        L = LineString([(s*4,12),(s*(4+24*np.cos(np.radians(a-5))), 12-24*np.sin(np.radians(a-5)))])
        parts += ext(L.buffer(0.7).intersection(fluke.buffer(-2)), 0.8, 4.2)
# scale arcs on lower handle (tail continues up the handle)
for y in (26,32):
    arc = Point(0,y+3).buffer(4.2).exterior.intersection(box(-4,y-2,4,y+3)).buffer(0.55)
    parts += ext(arc.intersection(handle.buffer(-0.9)), 0.8, 6)

# --- starfish below shell
def star(cx,cy,R,r,n=5):
    pts=[]
    for i in range(2*n):
        rad = R if i%2==0 else r
        a = np.pi/2 + i*np.pi/n
        pts.append((cx+rad*np.cos(a), cy+rad*np.sin(a)))
    return Polygon(pts).buffer(1.6).buffer(-1.6+1.2)
st = star(0,126,12.5,6.8)
parts += soft(st, 7.4, inset=1.0, top=1.2)
for i in range(5):  # dots on arms
    a=np.pi/2+i*2*np.pi/5
    for d in (3.5,7):
        parts.append(trimesh.creation.icosphere(2,radius=1.1).apply_translation([d*np.cos(a),126+d*np.sin(a),7.4]))

# --- scallop shell (top)
hy=154; R=36; n=9
ang = np.linspace(np.radians(-72), np.radians(72), 400)
lobe = np.abs(np.cos(ang*(n/2)/np.radians(72)*np.pi/2*2/2*np.radians(72)/np.radians(72)*1.0))
# scallop edge: bumps per rib
t = (ang - ang[0])/(ang[-1]-ang[0])*n
rr = R + 2.6*np.abs(np.sin(np.pi*t))
pts=[(rr[i]*np.sin(ang[i]), hy+rr[i]*np.cos(ang[i])) for i in range(len(ang))]
shell = Polygon([(0,hy-2)]+pts).buffer(1.5).buffer(-1.5)
ears = box(-9,hy-4,9,hy+5).buffer(1.5)
shell = unary_union([shell, ears])
parts += soft(shell, 3.4, top=0.8)
# radial ribs (one per lobe valley-centre)
for k in range(n):
    a = np.radians(-72) + (k+0.5)/n*np.radians(144)
    L = LineString([(0,hy+8),(R*0.97*np.sin(a), hy+R*0.97*np.cos(a))])
    w = L.buffer(1.2, cap_style=1)
    parts += ext(w.intersection(shell.buffer(-2.2)), 1.4, 3.4)
# hinge line on ears
parts += ext(box(-8,hy+1.5,8,hy+3), 0.8, 3.4)
# pearl
pearl = trimesh.creation.icosphere(4, radius=6)
pearl.vertices[:,2] = np.maximum(pearl.vertices[:,2], -2)  # flatten bottom into shell
pearl.apply_translation([0,hy+10,4.4])
parts.append(pearl)

from trimesh import boolean
m = boolean.union(parts, engine='manifold')
# lay along X for the bed and centre
m.apply_transform(trimesh.transformations.rotation_matrix(-np.pi/2,[0,0,1]))
m.apply_translation(-m.bounds[0]*[1,1,1])
print('watertight',m.is_watertight,'bounds',m.extents.round(1),'vol cm3',round(m.volume/1000,2))
m.export(sys.argv[1])
