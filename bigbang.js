
// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('three-container').appendChild(renderer.domElement);

// Particle System
const particleCount = 5000;
const positions = new Float32Array(particleCount * 3);
const velocities = new Float32Array(particleCount * 3);

for (let i = 0; i < particleCount * 3; i++) {
  positions[i] = 0; // Start all particles at the center
  velocities[i] = (Math.random() - 0.5) * 0.1; // Random velocity for explosion
}

const particleGeometry = new THREE.BufferGeometry();
particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

const particleMaterial = new THREE.PointsMaterial({
  size: 0.03,
  color: 0xffffff,
});

const particles = new THREE.Points(particleGeometry, particleMaterial);
scene.add(particles);

// Lighting
const ambientLight = new THREE.AmbientLight(0x404040, 2);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(30, 20, 30);
scene.add(directionalLight);

// Animation phases
let timeElapsed = 0;
let phase = 0; // 0: Black, 1: Flash, 2: Collapse, 3: Explosion

function animate() {
  requestAnimationFrame(animate);

  if (phase === 0) {
    renderer.setClearColor(0x000000); // Black background
    if (timeElapsed > 30) {
      phase = 1;
      timeElapsed = 0;
    }
  } else if (phase === 1) {
    renderer.setClearColor(0xffffff); // Flash white
    if (timeElapsed > 10) {
      phase = 2;
      timeElapsed = 0;
    }
  } else if (phase === 2) {
    renderer.setClearColor(0x000000); // Collapse
    const positionAttribute = particleGeometry.attributes.position;
    const posArray = positionAttribute.array;
    for (let i = 0; i < posArray.length; i++) {
      posArray[i] *= 0.9;
    }
    positionAttribute.needsUpdate = true;
    if (timeElapsed > 20) {
      phase = 3;
      timeElapsed = 0;
    }
  } else if (phase === 3) {
    const positionAttribute = particleGeometry.attributes.position;
    const posArray = positionAttribute.array;
    for (let i = 0; i < posArray.length; i++) {
      posArray[i] += velocities[i] * 5; // Explosion outward
    }
    positionAttribute.needsUpdate = true;
  }

  renderer.render(scene, camera);
  timeElapsed++;
}

animate();

// Handle window resize
window.addEventListener('resize', () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});
