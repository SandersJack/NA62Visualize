import * as THREE from 'three';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';
import { CSG } from 'three-csg-ts';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.6, 1200);
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer({antialias: true});

renderer.setClearColor("#233143");
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
})

const volumes = [
    {rout : 1.50, rin: 1.39, length: 3.39, z: -21.5, colour: 0x14D14A},
    {rout : 2.79, rin: 1.39, length: .1 , z: -18.11,colour: 0xBE61CF},
    {rout : 2.79, rin: 2.67, length: 44.9 ,z: -18.01,colour: 0x16A7F5},
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

var bigCylinder = new THREE.CylinderGeometry(0.39,2.79, 3.2105, 32 );
var smallCylinder = new THREE.CylinderGeometry(0.375,2.67, 3.2105, 32 );

const material = new THREE.MeshBasicMaterial( {color: 0x90F615} );
const cylinderBig = new THREE.Mesh( bigCylinder, material );
const cylinderSmall = new THREE.Mesh( smallCylinder, material );

const subRes = CSG.subtract(cylinderBig, cylinderSmall);
subRes.rotation.set(Math.PI / 2,0,0);
subRes.position.set(0,0,26.89+(3.2105*0.5));
//var hollowCylinder = subRes.toMesh( material );

scene.add( subRes );

const geometry = new THREE.SphereGeometry( 0.1, 32, 16 );
const materialparticle = new THREE.MeshBasicMaterial( { color: '#EE4B2B' } );
const sphere = new THREE.Mesh( geometry, materialparticle );
sphere.position.set(0,0,-40)
scene.add( sphere );

// Lights
const lights = [];
const lightValues = [
    {colour: 0x14D14A, intensity: 8, dist: 12, x: 1, y: 0, z: 8},
    {colour: 0xBE61CF, intensity: 6, dist: 12, x: -2, y: 1, z: -10},
    {colour: 0x00FFFF, intensity: 3, dist: 10, x: 0, y: 10, z: 1},
    {colour: 0x00FF00, intensity: 6, dist: 12, x: 0, y: -10, z: -1},
    {colour: 0x16A7F5, intensity: 6, dist: 12, x: 10, y: 3, z: 0},
    {colour: 0x90F615, intensity: 6, dist: 12, x: -10, y: -1, z: 0}
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
    if(sphere.position.z == 50)
        sphere.position.z = -40
    renderer.render(scene, camera);
    controls.update();
};

rendering();
