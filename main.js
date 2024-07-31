import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const sunGeometry = new THREE.SphereGeometry(3, 32, 32);
const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);

const planets = [];

function createPlanet(size, color, distance) {
    const geometry = new THREE.SphereGeometry(size, 32, 32);
    const material = new THREE.MeshBasicMaterial({ color });
    const planet = new THREE.Mesh(geometry, material);
    planet.userData = { distance, angle: 0 };
    scene.add(planet);
    planets.push(planet);
}

createPlanet(0.5, 0xff0000, 8);
createPlanet(0.9, 0xffa500, 12);
createPlanet(1, 0x0000ff, 16);
createPlanet(0.7, 0xff4500, 20);
createPlanet(2, 0xffd700, 28);
createPlanet(1.7, 0xf4a460, 34);
createPlanet(1.5, 0x00ffff, 40);
createPlanet(1.4, 0xadd8e6, 46);

camera.position.z = 50;

function animate() {
    requestAnimationFrame(animate);

    sun.rotation.y += 0.005;

    planets.forEach(planet => {
        planet.userData.angle += 0.01;
        planet.position.x = planet.userData.distance * Math.cos(planet.userData.angle);
        planet.position.z = planet.userData.distance * Math.sin(planet.userData.angle);
    });

    renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
