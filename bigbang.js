(function () {
  const container = document.getElementById('three-container');
  if (!container) {
    console.error("Error: #three-container not found in DOM.");
    return;
  }

  // Scene setup
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 10;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  console.log("Appending renderer to container:", container);
  container.appendChild(renderer.domElement);

  // Particle system
  const particleCount = 5000;
  const positions = new Float32Array(particleCount * 3);
  const velocities = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount * 3; i++) {
    positions[i] = 0; // Start at the center
    velocities[i] = (Math.random() - 0.5) * 0.1; // Random velocities for explosion
  }

  const particleGeometry = new THREE.BufferGeometry();
  particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const particleMaterial = new THREE.PointsMaterial({
    size: 1.0, // Temporarily increase size for debugging
    color: 0xffffff,
    transparent: true,
    opacity: 0.8,
  });

  const particles = new THREE.Points(particleGeometry, particleMaterial);
  scene.add(particles);

  // Debugging helper
  const axesHelper = new THREE.AxesHelper(5);
  scene.add(axesHelper);

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);

    // Update particle positions
    const posArray = particleGeometry.attributes.position.array;
    for (let i = 0; i < posArray.length; i++) {
      posArray[i] += velocities[i] * 0.5; // Move particles outward
    }
    console.log("First particle position:", posArray[0], posArray[1], posArray[2]);
    particleGeometry.attributes.position.needsUpdate = true;

    renderer.render(scene, camera);
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
})();
