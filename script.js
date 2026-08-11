// Typing Animation
const typingText = document.querySelector('.typing-text');
const roles = ['Software Engineer', 'AI/ML Developer', 'Cloud Architect', 'Problem Solver'];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeRole() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        typingText.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingText.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 500; // Pause before typing next
    }

    setTimeout(typeRole, typingSpeed);
}

// Start typing animation
setTimeout(typeRole, 1000);

// Mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = mobileMenuBtn.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');

        // Links that just point to "#" (like the logo) scroll to the very top
        if (href === '#') {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Scroll to top button
const scrollTopBtn = document.querySelector('.scroll-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('section, .project-card, .skill-category, .stat-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Active nav link highlighting
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.scrollY;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add stagger animation delay to grid items
document.querySelectorAll('.skills-grid .skill-category').forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
});

document.querySelectorAll('.about-stats .stat-card').forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
});

document.querySelectorAll('.project-features .feature').forEach((feature, index) => {
    feature.style.transitionDelay = `${index * 0.1}s`;
});

// Resume Modal
const resumeModal = document.getElementById('resume-modal');
const resumeTriggers = document.querySelectorAll('.resume-trigger');
const resumeClose = document.querySelector('.resume-close');
const resumeOverlay = document.querySelector('.resume-modal-overlay');

function openResumeModal(e) {
    e.preventDefault();
    resumeModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    navLinks.classList.remove('active');
}

function closeResumeModal(e) {
    if (e) e.preventDefault();
    resumeModal.classList.remove('active');
    document.body.style.overflow = '';
}

resumeTriggers.forEach(trigger => trigger.addEventListener('click', openResumeModal));
resumeClose.addEventListener('click', closeResumeModal);
resumeOverlay.addEventListener('click', closeResumeModal);

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && resumeModal.classList.contains('active')) {
        closeResumeModal();
    }
});

// Neural Playground - 3D Feedforward Network Visualization (Three.js)
(function initNeuralLab() {
    const container = document.getElementById('neural-canvas');
    if (!container || typeof THREE === 'undefined') return;

    const layerSizes = [3, 4, 4, 1];
    const layerSpacingX = 5;
    const nodeSpacingY = 1.6;

    let scene, camera, renderer, animationId;
    let nodes = [];
    let connections = [];
    let running = false;
    let pulseSeeds = [];

    function buildScene() {
        scene = new THREE.Scene();

        const width = container.clientWidth;
        const height = container.clientHeight;

        camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
        camera.position.set(0, 0, 14);

        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        const ambient = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambient);

        const group = new THREE.Group();
        scene.add(group);

        // Build nodes per layer
        const nodeGeo = new THREE.SphereGeometry(0.22, 16, 16);
        nodes = [];

        layerSizes.forEach((count, layerIdx) => {
            const x = (layerIdx - (layerSizes.length - 1) / 2) * layerSpacingX;
            const layerNodes = [];

            for (let i = 0; i < count; i++) {
                const y = (i - (count - 1) / 2) * nodeSpacingY;
                const color = layerIdx === 0
                    ? 0x818cf8
                    : layerIdx === layerSizes.length - 1
                        ? 0x34d399
                        : 0x22d3ee;

                const material = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.85 });
                const mesh = new THREE.Mesh(nodeGeo, material);
                mesh.position.set(x, y, 0);
                group.add(mesh);
                layerNodes.push(mesh);
            }
            nodes.push(layerNodes);
        });

        // Build connections between consecutive layers
        connections = [];
        for (let l = 0; l < nodes.length - 1; l++) {
            nodes[l].forEach(nodeA => {
                nodes[l + 1].forEach(nodeB => {
                    const points = [nodeA.position.clone(), nodeB.position.clone()];
                    const geo = new THREE.BufferGeometry().setFromPoints(points);
                    const mat = new THREE.LineBasicMaterial({ color: 0x334155, transparent: true, opacity: 0.35 });
                    const line = new THREE.Line(geo, mat);
                    group.add(line);
                    connections.push({ line, mat });
                });
            });
        }

        neuralLabState.group = group;
    }

    const neuralLabState = { group: null, t: 0 };

    function animate() {
        animationId = requestAnimationFrame(animate);
        neuralLabState.t += 0.01;

        if (neuralLabState.group) {
            // Floating coordinate system responding to ambient "noise"
            neuralLabState.group.rotation.y = Math.sin(neuralLabState.t * 0.4) * 0.25;
            neuralLabState.group.rotation.x = Math.cos(neuralLabState.t * 0.3) * 0.08;
            neuralLabState.group.position.y = Math.sin(neuralLabState.t * 0.6) * 0.15;
        }

        // Node activation pulses
        nodes.forEach((layer, layerIdx) => {
            layer.forEach((node, i) => {
                const phase = neuralLabState.t * 2 + layerIdx * 0.8 + i * 0.5;
                const pulse = running ? (Math.sin(phase) * 0.5 + 0.5) : 0.15;
                const scale = 1 + pulse * 0.35;
                node.scale.setScalar(scale);
                node.material.opacity = 0.6 + pulse * 0.4;
            });
        });

        // Connection glow pulses
        connections.forEach((conn, idx) => {
            const phase = neuralLabState.t * 3 - idx * 0.05;
            const glow = running ? (Math.sin(phase) * 0.5 + 0.5) : 0;
            conn.mat.opacity = 0.15 + glow * 0.5;
            conn.mat.color.setHex(running && glow > 0.6 ? 0x22d3ee : 0x334155);
        });

        renderer.render(scene, camera);
    }

    function handleResize() {
        if (!renderer || !camera) return;
        const width = container.clientWidth;
        const height = container.clientHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    }

    buildScene();
    animate();
    window.addEventListener('resize', handleResize);

    // Expose a way for the control panel to toggle "running" state
    window.__neuralLabSetRunning = (state) => { running = state; };
})();

// Hyperparameter Controls
(function initLabControls() {
    const lrSlider = document.getElementById('lr-slider');
    const lrValue = document.getElementById('lr-value');
    const dropoutSlider = document.getElementById('dropout-slider');
    const dropoutValue = document.getElementById('dropout-value');
    const epochsSlider = document.getElementById('epochs-slider');
    const epochsValue = document.getElementById('epochs-value');
    const runBtn = document.getElementById('run-inference-btn');
    const labStatus = document.getElementById('lab-status');

    if (!lrSlider) return;

    lrSlider.addEventListener('input', () => {
        const lr = (lrSlider.value / 1000).toFixed(3);
        lrValue.textContent = lr;
    });

    dropoutSlider.addEventListener('input', () => {
        const dropout = (dropoutSlider.value / 100).toFixed(2);
        dropoutValue.textContent = dropout;
    });

    epochsSlider.addEventListener('input', () => {
        epochsValue.textContent = epochsSlider.value;
    });

    runBtn.addEventListener('click', () => {
        labStatus.classList.add('running');
        labStatus.innerHTML = '<span class="status-dot"></span> Status: Running';
        if (window.__neuralLabSetRunning) window.__neuralLabSetRunning(true);

        runBtn.disabled = true;
        const originalHTML = runBtn.innerHTML;
        runBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Running Inference...';

        setTimeout(() => {
            labStatus.classList.remove('running');
            labStatus.innerHTML = '<span class="status-dot"></span> Status: Idle';
            if (window.__neuralLabSetRunning) window.__neuralLabSetRunning(false);
            runBtn.disabled = false;
            runBtn.innerHTML = originalHTML;
        }, 2600);
    });
})();

// Contact Form Submission (Formspree)
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitBtn = contactForm.querySelector('.form-submit');
        const originalBtnHTML = submitBtn.innerHTML;

        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        formStatus.textContent = '';
        formStatus.className = 'form-status';

        const formData = new FormData(contactForm);

        try {
            // Replace YOUR_FORM_ID below with your Formspree form ID
            // Sign up free at https://formspree.io and create a new form to get this ID
            const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                formStatus.textContent = "Message sent! I'll get back to you soon.";
                formStatus.classList.add('success');
                contactForm.reset();
            } else {
                throw new Error('Submission failed');
            }
        } catch (err) {
            formStatus.textContent = 'Something went wrong. Please email me directly instead.';
            formStatus.classList.add('error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnHTML;
        }
    });
}

// Console Easter Egg
console.log('%c👋 Hey there, curious developer!', 'font-size: 20px; font-weight: bold; color: #6366f1;');
console.log('%cLooking for something? Feel free to reach out!', 'font-size: 14px; color: #94a3b8;');
console.log('%c📧 biswalashutosh168@gmail.com', 'font-size: 12px; color: #0ea5e9;');
