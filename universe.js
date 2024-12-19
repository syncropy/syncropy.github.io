// Universe Simulation Module

class UniverseSimulation {
    constructor(canvasElement) {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ 
            canvas: canvasElement,
            antialias: true 
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        
        this.setupScene();
        this.setupMenu();
    }

    setupScene() {
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
        const menuContainer = document.getElementById('cosmic-menu');

        // Render courses from menu_tji
        Object.entries(menu_tji)
            .filter(([,v]) => v[1].includes('type:course'))
            .forEach(([,courseData]) => {
                const courseId = courseData[0].split(':')[1];
                const courseName = courseData[1].split('name:')[1];
                
                // Find associated details
                const ingredients = Object.values(menu_tji)
                    .find(i => i[1].includes(`parent:${courseId}`) && i[1].includes('type:ingredients'));
                const technique = Object.values(menu_tji)
                    .find(i => i[1].includes(`parent:${courseId}`) && i[1].includes('type:preparation'));
                const narrative = Object.values(menu_tji)
                    .find(i => i[1].includes(`parent:${courseId}`) && i[1].includes('type:narrative'));

                // Create course section
                const courseSection = document.createElement('div');
                courseSection.className = 'course-section';
                courseSection.dataset.courseId = courseId;

                // Populate course details
                courseSection.innerHTML = `
                    <div class="course-details">
                        <h2>${courseName.replace(/([A-Z])/g, ' $1').trim()}</h2>
                        ${ingredients ? `<p>Ingredients: ${ingredients[1].split('items:')[1]}</p>` : ''}
                        ${technique ? `<p>Technique: ${technique[1].split('method:')[1]}</p>` : ''}
                        ${narrative ? `<p class="narrative">${narrative[1].split('content:')[1]}</p>` : ''}
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
                        .find(i => 
                            i[1].includes(`parent:${courseId}`) && 
                            i[1].includes('type:physics')
                        );

                    if (physicsConfig) {
                        // Parse physics config
                        const configStr = physicsConfig[1].split('config:')[1].trim();
                        const parsedConfig = eval('(' + configStr + ')');

                        // Update universe simulation
                        this.updateSimulation(parsedConfig);
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
    const universeSimulation = new UniverseSimulation(document.getElementById('universe-canvas'));
});
