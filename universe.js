// Universe Simulation Module

class UniverseSimulation {
    constructor(canvasElement) {
        console.log('UniverseSimulation constructor called');
        console.log('Canvas Element:', canvasElement);
        console.log('menu_tji full data:', menu_tji);

        if (!canvasElement) {
            console.error('No canvas element found!');
            return;
        }

        if (typeof THREE === 'undefined') {
            console.error('Three.js not loaded!');
            return;
        }

        try {
            this.scene = new THREE.Scene();
            this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            this.renderer = new THREE.WebGLRenderer({ 
                canvas: canvasElement,
                antialias: true 
            });
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.renderer.setClearColor(0x000000);  // Explicitly set background to black
            
            console.log('Renderer setup complete');
            this.setupScene();
            this.setupMenu();
        } catch (error) {
            console.error('Error in UniverseSimulation constructor:', error);
        }
    }

    setupScene() {
        console.log('Setting up scene');
        // Initial cosmic configuration
        this.camera.position.z = 5;

        // Ambient lighting
        const ambientLight = new THREE.AmbientLight(0x404040);
        this.scene.add(ambientLight);

        // Particle system
        this.particleGeometry = new THREE.BufferGeometry();
        const particleCount = 10000;
        const posArray = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 100;
        }

        this.particleGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        
        this.particleMaterial = new THREE.PointsMaterial({
            size: 0.005,
            color: 0xffffff,
            transparent: true,
            opacity: 0.6
        });

        this.particleSystem = new THREE.Points(this.particleGeometry, this.particleMaterial);
        this.scene.add(this.particleSystem);

        this.animate();
    }

    setupMenu() {
        console.log('Setting up menu');
        const menuContainer = document.getElementById('cosmic-menu');

        if (!menuContainer) {
            console.error('No menu container found!');
            return;
        }

        // Render courses from menu_tji
        Object.values(menu_tji)
            .filter(item => item.type === 'course')
            .forEach(course => {
                const courseSection = document.createElement('div');
                courseSection.className = 'course-section';
                courseSection.dataset.courseId = course.id;

                courseSection.innerHTML = `
                    <div class="course-details">
                        <h2>${course.name ? course.name.replace(/([A-Z])/g, ' $1').trim() : 'Unnamed Course'}</h2>
                        ${course.items ? `<p>Ingredients: ${course.items}</p>` : ''}
                        ${course.method ? `<p>Technique: ${course.method}</p>` : ''}
                        ${course.steps ? `<p>Technique: ${course.steps}</p>` : ''}
                        ${course.content ? `<p class="narrative">${course.content}</p>` : ''}
                    </div>
                `;

                menuContainer.appendChild(courseSection);
            });

        this.setupScrollInteraction();
    }

    setupScrollInteraction() {
        const courseSections = document.querySelectorAll('.course-section');
        
        window.addEventListener('scroll', () => {
            const scrollPosition = window.pageYOffset;
            const windowHeight = window.innerHeight;

            courseSections.forEach((section, index) => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;

                // Check if section is in view
                if (
                    scrollPosition + windowHeight/2 >= sectionTop && 
                    scrollPosition < sectionTop + sectionHeight
                ) {
                    section.classList.add('active');

                    // Find corresponding physics config
                    const courseId = section.dataset.courseId;
                    const physicsConfig = Object.values(menu_tji)
                        .find(item => item.id === courseId && item.type === 'physics');

                    if (physicsConfig) {
                        // Update universe simulation
                        this.updateSimulation(physicsConfig.config);
                    }
                } else {
                    section.classList.remove('active');
                }
            });
        });
    }

    updateSimulation(physicsConfig) {
        // Update particle system based on physics config
        const { particleDensity, energy, temperature, expansion, chaos } = physicsConfig;

        // Modify particle system based on config
        this.particleSystem.material.size = 0.005 + (energy / 1e20) * 0.05;
        this.particleSystem.material.opacity = 0.2 + (temperature / 1e10);
        
        // Simulate expansion
        this.particleSystem.scale.set(
            1 + (expansion / 500),
            1 + (expansion / 500),
            1 + (expansion / 500)
        );

        // Add some chaotic movement
        const positions = this.particleSystem.geometry.attributes.position.array;
        for (let i = 0; i < positions.length; i++) {
            positions[i] += (Math.random() - 0.5) * chaos * 0.1;
        }
        this.particleSystem.geometry.attributes.position.needsUpdate = true;
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        this.renderer.render(this.scene, this.camera);
    }
}

// Initialize Universe Simulation on page load
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded fired');
    const canvasElement = document.getElementById('universe-canvas');
    
    if (canvasElement) {
        console.log('Canvas element found, initializing simulation');
        const universeSimulation = new UniverseSimulation(canvasElement);
    } else {
        console.error('No canvas element found with ID universe-canvas');
    }
});

// Fallback initialization in case DOMContentLoaded doesn't fire
window.addEventListener('load', () => {
    console.log('Window load event fired');
    const canvasElement = document.getElementById('universe-canvas');
    
    if (canvasElement) {
        console.log('Canvas element found via window load, initializing simulation');
        const universeSimulation = new UniverseSimulation(canvasElement);
    }
});
