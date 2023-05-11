var container = document.getElementById("shiba")
var width = document.body.clientWidth;
var height = container.clientHeight;
var scene = new THREE.Scene();

var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(width, height);
document.body.appendChild(container);
container.appendChild(renderer.domElement);

var light = new THREE.AmbientLight(0xe8e8d3);
scene.add(light);

var camera = new THREE.PerspectiveCamera(35, width / height);

var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.autoRotate = true;
camera.position.set(2.7, 1.7, 2.8);
controls.target = new THREE.Vector3(0, 0.5, 0);
controls.enabled = false;
controls.update();

var loader = new THREE.GLTFLoader();
loader.load('gltf/shiba/shiba.gltf', function (gltf) {
    scene.add(gltf.scene);
});

animate();

// fix an issue when 'document.body.clientWidth' returns wrong width at the beginning of the html
addEventListener("load", function () {
    camera.aspect = document.body.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( document.body.clientWidth, container.clientHeight);
})

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    controls.update();
}