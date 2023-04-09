import * as THREE from 'three';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';
import { CSG } from 'three-csg-ts';
import * as CedarGeoPars from './CedarGeometryParam.js'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.6, 1200);
camera.position.z = 500;
const renderer = new THREE.WebGLRenderer({antialias: true});

renderer.setClearColor("#233143");
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
})

 ///////////////////////////////////////////////////////////////
//                  Vessel Volumes                          //


const volumes = [
    {rout : CedarGeoPars.fFrontVesselOuterRadius, rin: CedarGeoPars.fFrontVesselInnerRadius, length: CedarGeoPars.fFrontVesselZLength, z: CedarGeoPars.fFrontVesselPosition[2] - 0.5 * CedarGeoPars.fFrontVesselZLength, colour: "#CFD4D9"},
    {rout : CedarGeoPars.fMainVesselOuterRadius, rin: CedarGeoPars.fFrontPipeInnerRadius, length: 1 , z: CedarGeoPars.fFrontVesselPosition[2] + 0.5 * CedarGeoPars.fFrontVesselZLength,colour: "#CFD4D9"},
    {rout : CedarGeoPars.fMainVesselOuterRadius, rin: CedarGeoPars.fMainVesselInnerRadius, length: CedarGeoPars.fMainVesselCylinderZLength ,z: CedarGeoPars.fFrontVesselPosition[2] + 0.5 * CedarGeoPars.fFrontVesselZLength + 1,colour: "#CFD4D9"},
];


for(let i=0; i<3; i++){
    var R =  volumes[i]['rout'];
    var r =  volumes[i]['rin'];
    var cx = 0;
    var cy = 0;
    var sAngle = THREE.MathUtils.degToRad(0);
    var eAngle = THREE.MathUtils.degToRad(360);

    let shape = new THREE.Shape();

    shape.absarc(cx, cy, R, sAngle, eAngle);
    shape.absarc(cx, cy, r, eAngle, sAngle, true);

    var extrudeSettings1 = {
        steps: 2,
        depth: volumes[i]['length']
    }
    var material1 = new THREE.MeshBasicMaterial( { color: volumes[i]['colour'] } );

    var cylinder1 = new THREE.ExtrudeGeometry(shape, extrudeSettings1 );
    var mesh = new THREE.Mesh( cylinder1, material1 );
    mesh.position.set(0,0,volumes[i]['z']);
    scene.add(mesh)

}

const coneL = (CedarGeoPars.fExitWindowPosition[2] - 0.5*CedarGeoPars.fExitWindowZLength) - (CedarGeoPars.fMainVesselCylinderPosition[2]
    +0.5*CedarGeoPars.fMainVesselCylinderZLength);

const conePos = (CedarGeoPars.fMainVesselCylinderPosition[2]
    +0.5*CedarGeoPars.fMainVesselCylinderZLength) + 0.5*coneL;

var bigCylinder = new THREE.CylinderGeometry(CedarGeoPars.fExitPipeOuterRadius,CedarGeoPars.fMainVesselOuterRadius, coneL, 32 );
var smallCylinder = new THREE.CylinderGeometry(CedarGeoPars.fExitPipeInnerRadius,CedarGeoPars.fMainVesselInnerRadius, coneL, 32 );

const material = new THREE.MeshBasicMaterial( {color: "#CFD4D9"} );
const cylinderBig = new THREE.Mesh( bigCylinder, material );
const cylinderSmall = new THREE.Mesh( smallCylinder, material );

const subRes = CSG.subtract(cylinderBig, cylinderSmall);
subRes.rotation.set(Math.PI / 2,0,0);
subRes.position.set(0,0,conePos);
scene.add( subRes );

 ///////////////////////////////////////////////////////////////
//                  Particle                                 //

const geometry = new THREE.SphereGeometry( 1, 32, 16 );
const materialparticle = new THREE.MeshBasicMaterial( { color: '#EE4B2B' } );
const sphere = new THREE.Mesh( geometry, materialparticle );
sphere.position.set(0,0,-400)
scene.add( sphere );

 ///////////////////////////////////////////////////////////////
//                  Magnin Mirror                            //

var R =  CedarGeoPars.fManginMirrorOuterRadius;
var r =  CedarGeoPars.fManginMirrorInnerRadius;
var cx = 0;
var cy = 0;
var sAngle = THREE.MathUtils.degToRad(0);
var eAngle = THREE.MathUtils.degToRad(360);

let shape = new THREE.Shape();

shape.absarc(cx, cy, R, sAngle, eAngle);
shape.absarc(cx, cy, r, eAngle, sAngle, true);

var extrudeSettings1 = {
    steps: 3,
    depth: CedarGeoPars.fManginMirrorZLength
}
var material1 = new THREE.MeshBasicMaterial( { color: 0x00FFFF } );

var materialT = new THREE.MeshBasicMaterial( { color: 0x90F615 } );
var cylinder1 = new THREE.ExtrudeGeometry(shape, extrudeSettings1 );
var meshCyl = new THREE.Mesh( cylinder1, materialT );

var largeSphere = new THREE.SphereGeometry(CedarGeoPars.fManginMirrorReflectingSurfaceRadius,64,16)
var meshLSp = new THREE.Mesh( largeSphere, material1 );

var smallSphere = new THREE.SphereGeometry(CedarGeoPars.fManginMirrorRefractingSurfaceRadius,32,16)
var meshSSp = new THREE.Mesh( smallSphere, material1 );

meshLSp.position.set(0,0,CedarGeoPars.fManginMirrorReflectingSurfaceRadius 
    - 0.5*CedarGeoPars.fManginMirrorZLength);
meshLSp.updateMatrix();
meshCyl.updateMatrix();
const intRes = CSG.intersect(meshCyl, meshLSp);

intRes.position.set(0,0,CedarGeoPars.fManginMirrorRefractingSurfaceRadius 
    + 0.5*CedarGeoPars.fManginMirrorZLength);
intRes.updateMatrix();
const LenseMesh = CSG.subtract(intRes,meshSSp)

const ManginPos = CedarGeoPars.fManginMirrorPosition
LenseMesh.position.set(ManginPos[0],ManginPos[1],ManginPos[2]);
scene.add(LenseMesh)

 ///////////////////////////////////////////////////////////////
//                  Chromatic Corrector                      //

var R =  CedarGeoPars.fChromaticCorrectorOuterRadius;
var r =  CedarGeoPars.fChromaticCorrectorInnerRadius;
var cx = 0;
var cy = 0;
var sAngle = THREE.MathUtils.degToRad(0);
var eAngle = THREE.MathUtils.degToRad(360);

let shapeRing = new THREE.Shape();

shapeRing.absarc(cx, cy, R, sAngle, eAngle);
shapeRing.absarc(cx, cy, r, eAngle, sAngle, true);

var extrudeSettings2 = {
    steps: 2,
    depth: CedarGeoPars.fChromaticCorrectorZLength
}
var material2 = new THREE.MeshBasicMaterial( { color: 0x00FFFF } );

var cylinder2 = new THREE.ExtrudeGeometry(shapeRing, extrudeSettings2 );
var meshCyl2 = new THREE.Mesh( cylinder2, materialT );

var intSphere = new THREE.SphereGeometry(CedarGeoPars.fChromaticCorrectorRearSurfaceRadius,100,100);
var meshintSph = new THREE.Mesh( intSphere, material2 );

var dL = -CedarGeoPars.fChromaticCorrectorRearSurfaceRadius + CedarGeoPars.fChromaticCorrectorZLength;
dL += CedarGeoPars.fChromaticCorrectorRearSurfaceRadius - Math.sqrt(Math.pow(CedarGeoPars.fChromaticCorrectorRearSurfaceRadius,2) - Math.pow(CedarGeoPars.fChromaticCorrectorInnerRadius,2));
dL += 0.5*CedarGeoPars.fChromaticCorrectorZLength;; // This is for temp as it would not work with dL. Need to check against MC

meshintSph.position.set(0,0,dL);

meshintSph.updateMatrix();
meshCyl2.updateMatrix();
const intSolid = CSG.intersect(meshCyl2,meshintSph);

const ChromPos = CedarGeoPars.fChromaticCorrectorPosition;
intSolid.position.set(ChromPos[0],ChromPos[1],ChromPos[2]);
scene.add(intSolid);

///////////////////////////////////////////////////////////////
//                  Condenser Volumes                       //

var angle = 180 / CedarGeoPars.fNSectors - 0.25*CedarGeoPars.fInterCondenserAngle;
const Lxwedge = (CedarGeoPars.fCondenserRadialOffset - CedarGeoPars.fCondenserDistanceToCentre) * Math.tan(angle);
const Dz = (CedarGeoPars.fCondenserRadialOffset-CedarGeoPars.fCondenserDistanceToCentre);

let g = new THREE.BoxGeometry(Lxwedge, CedarGeoPars.fCondenserZLength, Dz);
let pos = g.attributes.position;
for(let i = 0; i < pos.count; i++){
  if (pos.getZ(i) < 0) pos.setY(i, 0); // change Y-coord by condition
}
g.computeVertexNormals(); // don't forget to re-compute normals

let m = new THREE.MeshLambertMaterial({color: 0x00FF00});
let wedge = new THREE.Mesh(g, m);

console.log(CedarGeoPars.fCondenserOuterRadius)
var Tube = new THREE.CylinderGeometry(CedarGeoPars.fCondenserOuterRadius,CedarGeoPars.fCondenserOuterRadius,CedarGeoPars.fCondenserZLength,20,32, false, 0, Math.PI);
var TubeMesh = new THREE.Mesh(Tube, m);
wedge.position.set(0.5*CedarGeoPars.fCondenserRadialOffset + 0.5*CedarGeoPars.fCondenserDistanceToCentre,0,0);
wedge.rotation.set(0,Math.PI/2,0);
wedge.updateMatrix();
TubeMesh.updateMatrix();

const intCond = CSG.intersect(TubeMesh,wedge);

var ConSphere = new THREE.SphereGeometry(CedarGeoPars.fCondenserFrontSurfaceRadius,32,16)
var ConSphereMesh = new THREE.Mesh(ConSphere,m);
ConSphereMesh.position.set(0,-(CedarGeoPars.fCondenserFrontSurfaceRadius-.5*CedarGeoPars.fCondenserZLength),0);
ConSphereMesh.updateMatrix();
intCond.updateMatrix();

for(let i=0; i<CedarGeoPars.fNSectors; i++){
    var intCond2 = CSG.intersect(intCond,ConSphereMesh);
    var tangle = ((i+2.5) * Math.PI*2)/CedarGeoPars.fNSectors;
    intCond2.position.set(CedarGeoPars.fCondenserPosition[1],CedarGeoPars.fCondenserPosition[0],CedarGeoPars.fCondenserPosition[2]);
    intCond2.rotation.set(-Math.PI/2,Math.PI,0);
    
    intCond2.position.x += CedarGeoPars.fCondenserRadialOffset * Math.sin(tangle);
    intCond2.position.y += CedarGeoPars.fCondenserRadialOffset * Math.cos(tangle);

    intCond2.rotation.y -= (-tangle - Math.PI/2);
    scene.add(intCond2)

    var windowsh = new THREE.CylinderGeometry(CedarGeoPars.fQuartzWindowRadius,CedarGeoPars.fQuartzWindowRadius,CedarGeoPars.fQuartzWindowZLength,20,32, false, 0, 2*Math.PI);
    var windowmesh = new THREE.Mesh(windowsh,m);

    windowmesh.position.x += CedarGeoPars.fQuartzWindowRadialOffset * Math.sin(tangle);
    windowmesh.position.y += CedarGeoPars.fQuartzWindowRadialOffset * Math.cos(tangle);

    windowmesh.rotation.set(Math.PI/2,0,0);
    windowmesh.position.z = CedarGeoPars.fQuartzWindowDiskPosition[2];

    scene.add(windowmesh)
}


// Lights
const lights = [];
const lightValues = [
    {colour: 0x14D14A, intensity: 8, dist: 120, x: 1, y: 0, z: 8},
    {colour: 0xBE61CF, intensity: 6, dist: 120, x: -2, y: 1, z: -10},
    {colour: 0x00FFFF, intensity: 3, dist: 100, x: 0, y: 10, z: 10},
    {colour: 0x00FF00, intensity: 6, dist: 120, x: 0, y: -10, z: -10},
    {colour: 0x16A7F5, intensity: 6, dist: 120, x: 10, y: 3, z: 0},
    {colour: 0x90F615, intensity: 6, dist: 120, x: -10, y: -10, z: 0}
];
for (let i=0; i<6; i++) {
    lights[i] = new THREE.PointLight(
        lightValues[i]['colour'], 
        lightValues[i]['intensity'], 
        lightValues[i]['dist']);
    lights[i].position.set(
        lightValues[i]['x'], 
        lightValues[i]['y'], 
        lightValues[i]['z']);
    scene.add(lights[i]);
}

//Trackball Controls for Camera 
const controls = new TrackballControls(camera, renderer.domElement); 
controls.rotateSpeed = 4;
controls.dynamicDampingFactor = 0.15;

// Axes Helper
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper); // X == red, Y == green, Z == blue

const rendering = function() {
    requestAnimationFrame(rendering);    // Constantly rotate box
    //scene.rotation.z -= 0.005;
    //scene.rotation.x -= 0.01;
    sphere.position.z += 1
    if(sphere.position.z == 500)
        sphere.position.z = -400
    renderer.render(scene, camera);
    controls.update();
};

rendering();
