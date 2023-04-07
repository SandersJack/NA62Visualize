import * as THREE from 'three';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';

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
    {rout : 150, rin: 139, length: .339, z: -2.15,colour: 0x14D14A},
    {rout : 279, rin: 139, length: .01 ,z: -1.811,colour: 0xBE61CF},
    {rout : 279, rin: 267, length: 4.49 ,z: -1.801,colour: 0x16A7F5},
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
    mesh.scale.set(0.01,0.01,1)
    scene.add(mesh)
}

var R =  279;
var r =  267;
var cx = 0;
var cy = 0;
var sAngle = THREE.MathUtils.degToRad(0);
var eAngle = THREE.MathUtils.degToRad(360);

let shape = new THREE.Shape();
shape.absarc(cx, cy, R, sAngle, eAngle);
shape.absarc(cx, cy, r, eAngle, sAngle, true);

var extrudeSettings2 = {
    steps: 20,
    depth: 0.32105
};

var cylinder2 = new THREE.ExtrudeGeometry(shape, extrudeSettings2 );
const material2 = new THREE.MeshBasicMaterial( { color: 0xBE61CF } );
var mesh2 = new THREE.Mesh( cylinder2, material2 );
mesh2.position.set(0,0,2.689);
mesh2.scale.set(0.01,0.01,1)
scene.add(mesh2)

var R =  3.9;
var r =  3.75;
var cx = 0;
var cy = 0;
var sAngle = THREE.MathUtils.degToRad(0);
var eAngle = THREE.MathUtils.degToRad(360);
const material3 = new THREE.MeshBasicMaterial( { color: 0x90F615 } );
let shape1 = new THREE.Shape();
shape1.absarc(cx, cy, R, sAngle, eAngle);
shape1.absarc(cx, cy, r, eAngle, sAngle, true);

var extrudeSettings3 = {
    steps: 2,
    depth: 0
};

var cylinder3 = new THREE.ExtrudeGeometry(shape1, extrudeSettings3 );

var mesh3 = new THREE.Mesh( cylinder3, material3 );
mesh3.position.set(0,0,3.01005);
mesh3.scale.set(0.01,0.01,1)
scene.add(mesh3)



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
    renderer.render(scene, camera);
    controls.update();
};

rendering();
