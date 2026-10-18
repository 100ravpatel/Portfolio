// Initialize Lucide Icons
lucide.createIcons();
gsap.registerPlugin(ScrollTrigger);

// ============================================================================
// 1. THREE.JS APPLE-STYLE 3D HARDWARE CORE SETUP
// ============================================================================
const canvas = document.getElementById('webgl-stage');
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x03050a, 0.035);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 0, 11);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.2;

// Studio Lighting (Apple Key Light + Rim Light + Cyan Accent Light)
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
keyLight.position.set(6, 8, 6);
scene.add(keyLight);

const rimLight = new THREE.PointLight(0x29B5E8, 4, 25);
rimLight.position.set(-5, 3, 4);
scene.add(rimLight);

const bottomLight = new THREE.PointLight(0x818cf8, 3, 25);
bottomLight.position.set(4, -5, 3);
scene.add(bottomLight);

// ============================================================================
// 2. BUILD THE 3-LAYER DATA CORE (STORAGE, COMPUTE, CLOUD SERVICES)
// ============================================================================
const productGroup = new THREE.Group();
scene.add(productGroup);

// Materials: Anodized Space-Gray Metal + Glowing Snowflake Cyan Wireframes
const metalMaterial = new THREE.MeshStandardMaterial({
    color: 0x161f30,
    metalness: 0.88,
    roughness: 0.22,
});

const cyanWireMaterial = new THREE.LineBasicMaterial({
    color: 0x29B5E8,
    transparent: true,
    opacity: 0.55
});

const indigoWireMaterial = new THREE.LineBasicMaterial({
    color: 0x818cf8,
    transparent: true,
    opacity: 0.45
});

// Helper to create a hexagonal platter (like an enterprise server / M-series die)
function createHexPlatter(radius, height, wireMat) {
    const group = new THREE.Group();
    const geo = new THREE.CylinderGeometry(radius, radius, height, 6);
    const mesh = new THREE.Mesh(geo, metalMaterial);
    const edges = new THREE.EdgesGeometry(geo);
    const wire = new THREE.LineSegments(edges, wireMat);
    group.add(mesh);
    group.add(wire);
    return group;
}

// Top Layer: Cloud Services & BI Layer
const topLayer = createHexPlatter(1.75, 0.28, cyanWireMaterial);
topLayer.position.y = 0.42;
productGroup.add(topLayer);

// Middle Layer: Virtual Compute Cluster Layer
const midLayer = createHexPlatter(2.0, 0.34, indigoWireMaterial);
midLayer.position.y = 0;
productGroup.add(midLayer);

// Bottom Layer: Storage & Zero-Copy Cloning Layer
const botLayer = createHexPlatter(1.75, 0.28, cyanWireMaterial);
botLayer.position.y = -0.42;
productGroup.add(botLayer);

// Inner Glowing Crystal Kernel (Revealed when layers explode on scroll)
const kernelGeo = new THREE.OctahedronGeometry(0.75, 1);
const kernelMat = new THREE.MeshStandardMaterial({
    color: 0x29B5E8,
    emissive: 0x0ea5e9,
    emissiveIntensity: 0.7,
    wireframe: true
});
const kernelMesh = new THREE.Mesh(kernelGeo, kernelMat);
productGroup.add(kernelMesh);

// Orbital Data Rings around the Core
const ring1Geo = new THREE.TorusGeometry(2.65, 0.018, 16, 100);
const ring1Mat = new THREE.MeshBasicMaterial({ color: 0x29B5E8, transparent: true, opacity: 0.5 });
const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
ring1.rotation.x = Math.PI / 2.2;
productGroup.add(ring1);

const ring2Geo = new THREE.TorusGeometry(3.1, 0.012, 16, 100);
const ring2Mat = new THREE.MeshBasicMaterial({ color: 0x818cf8, transparent: true, opacity: 0.35 });
const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
ring2.rotation.x = Math.PI / 3;
ring2.rotation.y = Math.PI / 6;
productGroup.add(ring2);

// Ambient Starfield / Data Particles
const partCount = 900;
const partPos = new Float32Array(partCount * 3);
for (let i = 0; i < partCount * 3; i++) {
    partPos[i] = (Math.random() - 0.5) * 35;
}
const partGeo = new THREE.BufferGeometry();
partGeo.setAttribute('position', new THREE.BufferAttribute(partPos, 3));
const partMat = new THREE.PointsMaterial({ size: 0.04, color: 0x38bdf8, transparent: true, opacity: 0.5 });
const particles = new THREE.Points(partGeo, partMat);
scene.add(particles);

// Initial Hero Pose
productGroup.rotation.set(0.35, -0.4, 0);

// ============================================================================
// 3. GSAP SCROLLTRIGGER CHOREOGRAPHY (APPLE PRODUCT SCROLL)
// ============================================================================
const hudLabel = document.getElementById('hud-stage-label');
const isDesktop = () => window.innerWidth >= 1024;

// Master timeline scrubbed by page scroll
const masterTl = gsap.timeline({
    scrollTrigger: {
        trigger: "main",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.2,
        onUpdate: (self) => {
            const p = self.progress;
            document.getElementById('scroll-progress').style.width = `${p * 100}%`;
            if (hudLabel) {
                if (p < 0.18) hudLabel.textContent = "STAGE 01 // ASSEMBLED DATA CORE";
                else if (p < 0.42) hudLabel.textContent = "STAGE 02 // 500M+ DAILY TELEMETRY";
                else if (p < 0.68) hudLabel.textContent = "STAGE 03 // EXPLODED SNOWFLAKE LAYERS";
                else if (p < 0.85) hudLabel.textContent = "STAGE 04 // TABLEAU BI ENGINE";
                else hudLabel.textContent = "STAGE 05 // READY FOR CONNECTION";
            }
        }
    }
});

// Transition 1: Hero -> Telemetry (Move 3D Core to Right, Rotate 90 deg)
masterTl.to(productGroup.position, {
    x: () => isDesktop() ? 3.1 : 0,
    y: () => isDesktop() ? 0.2 : 0,
    z: () => isDesktop() ? 0.5 : -2,
    duration: 1,
    ease: "power2.inOut"
}, "stage1")
.to(productGroup.rotation, {
    x: 0.55,
    y: Math.PI * 0.65,
    z: -0.15,
    duration: 1,
    ease: "power2.inOut"
}, "stage1")
.to(ring1.scale, { x: 1.12, y: 1.12, z: 1.12, duration: 1 }, "stage1");

// Transition 2: Telemetry -> Snowflake Architecture (Move Left + EXPLODE LAYERS APART)
masterTl.to(productGroup.position, {
    x: () => isDesktop() ? -3.1 : 0,
    y: 0,
    z: () => isDesktop() ? 1.0 : -1.5,
    duration: 1.2,
    ease: "power2.inOut"
}, "stage2")
.to(productGroup.rotation, {
    x: 0.28,
    y: Math.PI * 1.35,
    z: 0.1,
    duration: 1.2,
    ease: "power2.inOut"
}, "stage2")
// Explode Top & Bottom Platters outward like an Apple chip teardown
.to(topLayer.position, { y: 1.55, duration: 1.2, ease: "power2.out" }, "stage2")
.to(botLayer.position, { y: -1.55, duration: 1.2, ease: "power2.out" }, "stage2")
.to(kernelMesh.scale, { x: 1.45, y: 1.45, z: 1.45, duration: 1.2 }, "stage2")
.to(ring1.rotation, { x: Math.PI / 1.4, y: 0.6, duration: 1.2 }, "stage2");

// Transition 3: Snowflake -> Tableau BI (Move Right + Reassemble + Isometric Tilt)
masterTl.to(productGroup.position, {
    x: () => isDesktop() ? 3.1 : 0,
    y: 0.1,
    z: () => isDesktop() ? 0.6 : -2,
    duration: 1.2,
    ease: "power2.inOut"
}, "stage3")
.to(productGroup.rotation, {
    x: 0.85,
    y: Math.PI * 2.1,
    z: -0.25,
    duration: 1.2,
    ease: "power2.inOut"
}, "stage3")
.to(topLayer.position, { y: 0.55, duration: 1.2 }, "stage3")
.to(botLayer.position, { y: -0.55, duration: 1.2 }, "stage3")
.to(kernelMesh.scale, { x: 1.0, y: 1.0, z: 1.0, duration: 1.2 }, "stage3")
.to(ring2.scale, { x: 1.25, y: 1.25, z: 1.25, duration: 1.2 }, "stage3");

// Transition 4: Tableau BI -> Tech Stack & Contact (Center & Pull Back)
masterTl.to(productGroup.position, {
    x: 0,
    y: 0,
    z: -2.2,
    duration: 1.2,
    ease: "power2.inOut"
}, "stage4")
.to(productGroup.rotation, {
    x: Math.PI / 3,
    y: Math.PI * 2.8,
    z: 0,
    duration: 1.2,
    ease: "power2.inOut"
}, "stage4")
.to(topLayer.position, { y: 0.42, duration: 1.2 }, "stage4")
.to(botLayer.position, { y: -0.42, duration: 1.2 }, "stage4");

// ============================================================================
// 4. CONTINUOUS IDLE ANIMATION & SUBTLE MOUSE PARALLAX
// ============================================================================
let mouseX = 0;
let mouseY = 0;
window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
});

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    ScrollTrigger.refresh();
});

function animate() {
    requestAnimationFrame(animate);

    // Subtle continuous rotation on the crystal kernel & orbital rings
    kernelMesh.rotation.y += 0.012;
    kernelMesh.rotation.x += 0.006;
    ring1.rotation.z += 0.004;
    ring2.rotation.z -= 0.003;
    particles.rotation.y += 0.0005;

    // Gentle camera parallax with mouse
    camera.position.x += (mouseX * 0.35 - camera.position.x) * 0.05;
    camera.position.y += (-mouseY * 0.35 - camera.position.y) * 0.05;

    renderer.render(scene, camera);
}
animate();

// ============================================================================
// 5. GOOGLE SHEETS CONTACT FORM HANDLER
// ============================================================================
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxEZW_OFN4iAt6Q4CNus8Sfq8IcLQPeMVDyO4-IvuBFRTw-szvMvKh6BCCWqIHmJ8Fx/exec';

const contactForm = document.getElementById('portfolio-contact-form');
const submitBtn = document.getElementById('submit-btn');
const submitText = document.getElementById('submit-text');
const formStatus = document.getElementById('form-status');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        submitBtn.disabled = true;
        submitText.textContent = 'Sending Message...';
        formStatus.classList.add('hidden');

        const payload = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            company: document.getElementById('company').value.trim(),
            message: document.getElementById('message').value.trim()
        };

        try {
            await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                body: JSON.stringify(payload)
            });

            formStatus.className = 'block p-4 rounded-xl text-xs font-mono bg-emerald-500/15 border border-emerald-500/40 text-emerald-300';
            formStatus.textContent = '✓ Message delivered! Thank you for reaching out—Saurav will get back to you shortly.';
            contactForm.reset();
        } catch (err) {
            formStatus.className = 'block p-4 rounded-xl text-xs font-mono bg-rose-500/15 border border-rose-500/40 text-rose-300';
            formStatus.textContent = '✕ Could not send message right now. Please email sauravpateliit120@gmail.com directly.';
        } finally {
            submitBtn.disabled = false;
            submitText.textContent = 'Send Message';
        }
    });
}
