import * as THREE from 'three';

export class ThreeScene {
    constructor(container, sceneType) {
        this.container = container;
        this.sceneType = sceneType;
        this.mouse = { x: 0, y: 0 };
        this.targetRotation = { x: 0, y: 0 };
        this.animationId = null;
        this.objects = [];
        this.clock = new THREE.Clock();
        this.mainGroup = null;
        this.particles = null;
    }

    init() {
        const w = this.container.clientWidth;
        const h = this.container.clientHeight;

        if (w === 0 || h === 0) {
            console.warn('Container has zero size, retrying...');
            setTimeout(() => this.init(), 100);
            return;
        }

        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.FogExp2(0x050a18, 0.015);

        this.camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 1000);
        this.camera.position.z = 6;

        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        });
        this.renderer.setSize(w, h);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1.2;

        // Вставляем canvas первым элементом (до лейблов)
        this.container.insertBefore(this.renderer.domElement, this.container.firstChild);

        this.setupLights();
        this.createScene();
        this.createParticles();

        this.boundMouseMove = this.onMouseMove.bind(this);
        this.boundTouchMove = this.onTouchMove.bind(this);
        this.boundResize = this.onResize.bind(this);

        this.container.addEventListener('mousemove', this.boundMouseMove);
        this.container.addEventListener('touchmove', this.boundTouchMove, { passive: true });
        window.addEventListener('resize', this.boundResize);

        this.animate();
    }

    setupLights() {
        this.scene.add(new THREE.AmbientLight(0x4f8fff, 0.3));

        const main = new THREE.DirectionalLight(0xffffff, 1.2);
        main.position.set(5, 5, 5);
        this.scene.add(main);

        const accent = new THREE.PointLight(0x8b5cf6, 0.8, 20);
        accent.position.set(-3, 2, 3);
        this.scene.add(accent);

        const warm = new THREE.PointLight(0xf59e0b, 0.5, 15);
        warm.position.set(3, -2, 2);
        this.scene.add(warm);

        const rim = new THREE.PointLight(0x4f8fff, 0.6, 20);
        rim.position.set(0, 3, -5);
        this.scene.add(rim);
    }

    createScene() {
        const builders = {
            graduation: () => this.buildGraduation(),
            conference: () => this.buildConference(),
            sport: () => this.buildSport(),
            library: () => this.buildLibrary(),
            coworking: () => this.buildCoworking(),
            career: () => this.buildCareer()
        };
        const build = builders[this.sceneType] || builders.graduation;
        build();
    }

    // ── 1. GRADUATION ──
    buildGraduation() {
        const g = new THREE.Group();

        const baseMat = new THREE.MeshPhysicalMaterial({
            color: 0x1a1a2e, metalness: 0.3, roughness: 0.4,
            clearcoat: 0.8, clearcoatRoughness: 0.2
        });

        const base = new THREE.Mesh(new THREE.BoxGeometry(2.5, 0.15, 2.5, 4, 1, 4), baseMat);
        base.position.y = 0.5;
        g.add(base);

        const dome = new THREE.Mesh(
            new THREE.SphereGeometry(0.9, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2),
            new THREE.MeshPhysicalMaterial({ color: 0x1a1a2e, metalness: 0.4, roughness: 0.3, clearcoat: 1 })
        );
        g.add(dome);

        const btnMat = new THREE.MeshPhysicalMaterial({
            color: 0xf59e0b, metalness: 0.9, roughness: 0.1,
            emissive: 0xf59e0b, emissiveIntensity: 0.3
        });
        const btn = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.15, 16), btnMat);
        btn.position.y = 0.55;
        g.add(btn);

        const tassleMat = new THREE.MeshPhysicalMaterial({ color: 0xf59e0b, metalness: 0.6, roughness: 0.3 });
        const tassle = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 1.2, 8), tassleMat);
        tassle.position.set(1.2, 0, 0);
        tassle.rotation.z = Math.PI / 6;
        g.add(tassle);

        const fringe = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.001, 0.3, 8), tassleMat);
        fringe.position.set(1.5, -0.6, 0);
        g.add(fringe);

        for (let i = 0; i < 5; i++) {
            const star = new THREE.Mesh(
                new THREE.OctahedronGeometry(0.12, 0),
                new THREE.MeshPhysicalMaterial({
                    color: 0x4f8fff, emissive: 0x4f8fff,
                    emissiveIntensity: 0.5, metalness: 0.8, roughness: 0.2
                })
            );
            const angle = (i / 5) * Math.PI * 2;
            star.position.set(Math.cos(angle) * 2, Math.sin(angle * 0.5) * 0.5, Math.sin(angle) * 2);
            star.userData = { angle: angle, speed: 0.5 + Math.random() * 0.5, type: 'star' };
            g.add(star);
            this.objects.push(star);
        }

        g.rotation.x = -0.3;
        this.mainGroup = g;
        this.scene.add(g);
    }

    // ── 2. CONFERENCE ──
    buildConference() {
        const g = new THREE.Group();

        const podium = new THREE.Mesh(
            new THREE.CylinderGeometry(1.5, 1.8, 0.4, 32),
            new THREE.MeshPhysicalMaterial({ color: 0x0f172a, metalness: 0.5, roughness: 0.3, clearcoat: 0.5 })
        );
        podium.position.y = -1.5;
        g.add(podium);

        const stick = new THREE.Mesh(
            new THREE.CylinderGeometry(0.04, 0.04, 3, 8),
            new THREE.MeshPhysicalMaterial({ color: 0x374151, metalness: 0.9, roughness: 0.1 })
        );
        stick.position.y = 0.2;
        g.add(stick);

        const mic = new THREE.Mesh(
            new THREE.SphereGeometry(0.25, 32, 32),
            new THREE.MeshPhysicalMaterial({ color: 0x4f8fff, metalness: 0.7, roughness: 0.2, emissive: 0x4f8fff, emissiveIntensity: 0.15 })
        );
        mic.position.y = 1.8;
        g.add(mic);

        const wire = new THREE.Mesh(
            new THREE.SphereGeometry(0.27, 16, 16),
            new THREE.MeshPhysicalMaterial({ color: 0x4f8fff, wireframe: true, transparent: true, opacity: 0.4 })
        );
        wire.position.y = 1.8;
        g.add(wire);
        this.objects.push(wire);

        for (let i = 0; i < 4; i++) {
            const ring = new THREE.Mesh(
                new THREE.TorusGeometry(0.6 + i * 0.4, 0.02, 8, 64),
                new THREE.MeshPhysicalMaterial({
                    color: 0x4f8fff, emissive: 0x4f8fff, emissiveIntensity: 0.3,
                    transparent: true, opacity: 0.6 - i * 0.12
                })
            );
            ring.position.y = 1.8;
            ring.rotation.x = Math.PI / 2;
            ring.userData = { baseScale: 1, index: i, type: 'wave' };
            g.add(ring);
            this.objects.push(ring);
        }

        this.mainGroup = g;
        this.scene.add(g);
    }

    // ── 3. SPORT ──
    buildSport() {
        const g = new THREE.Group();

        const barMat = new THREE.MeshPhysicalMaterial({ color: 0x64748b, metalness: 0.95, roughness: 0.05 });
        const weightMat = new THREE.MeshPhysicalMaterial({ color: 0x1e293b, metalness: 0.8, roughness: 0.2, clearcoat: 0.6 });

        const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 3.5, 16), barMat);
        bar.rotation.z = Math.PI / 2;
        g.add(bar);

        for (let side = -1; side <= 1; side += 2) {
            for (let j = 0; j < 3; j++) {
                const disk = new THREE.Mesh(
                    new THREE.CylinderGeometry(0.6 - j * 0.1, 0.6 - j * 0.1, 0.15, 32),
                    weightMat
                );
                disk.rotation.z = Math.PI / 2;
                disk.position.x = side * (1.2 + j * 0.2);
                g.add(disk);
            }
        }

        const colors = [0x10b981, 0x4f8fff, 0xf59e0b];
        for (let i = 0; i < 3; i++) {
            const ring = new THREE.Mesh(
                new THREE.TorusGeometry(1.5 + i * 0.5, 0.03, 16, 64),
                new THREE.MeshPhysicalMaterial({
                    color: colors[i], emissive: colors[i], emissiveIntensity: 0.4,
                    transparent: true, opacity: 0.5
                })
            );
            ring.userData = { speed: 0.3 + i * 0.2, axis: i, type: 'orbit' };
            g.add(ring);
            this.objects.push(ring);
        }

        this.mainGroup = g;
        this.scene.add(g);
    }

    // ── 4. LIBRARY ──
    buildLibrary() {
        const g = new THREE.Group();

        const coverMat = new THREE.MeshPhysicalMaterial({ color: 0x1e3a5f, metalness: 0.3, roughness: 0.5, clearcoat: 0.4 });

        const left = new THREE.Mesh(new THREE.BoxGeometry(1.5, 2, 0.08), coverMat);
        left.position.set(-0.8, 0, 0);
        left.rotation.y = 0.2;
        g.add(left);

        const right = new THREE.Mesh(new THREE.BoxGeometry(1.5, 2, 0.08), coverMat);
        right.position.set(0.8, 0, 0);
        right.rotation.y = -0.2;
        g.add(right);

        const spine = new THREE.Mesh(
            new THREE.BoxGeometry(0.08, 2, 0.4),
            new THREE.MeshPhysicalMaterial({ color: 0xf59e0b, metalness: 0.5, roughness: 0.3 })
        );
        spine.position.set(0, 0, -0.15);
        g.add(spine);

        const pageMat = new THREE.MeshPhysicalMaterial({ color: 0xf1f5f9, roughness: 0.8, transparent: true, opacity: 0.9 });
        for (let i = 0; i < 8; i++) {
            const page = new THREE.Mesh(new THREE.PlaneGeometry(1.3, 1.8), pageMat);
            const angle = (i / 8) * 0.4 - 0.2;
            page.position.set(Math.sin(angle) * 0.7, 0, Math.cos(angle) * 0.05 - 0.1);
            page.rotation.y = angle;
            g.add(page);
        }

        const flyMat = new THREE.MeshPhysicalMaterial({
            color: 0x4f8fff, emissive: 0x4f8fff, emissiveIntensity: 0.2,
            transparent: true, opacity: 0.6, side: THREE.DoubleSide
        });
        for (let i = 0; i < 6; i++) {
            const fly = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 0.7), flyMat);
            const a = (i / 6) * Math.PI * 2;
            fly.position.set(Math.cos(a) * 2.5, Math.sin(a * 1.3), Math.sin(a) * 2.5);
            fly.rotation.set(Math.random(), Math.random(), Math.random());
            fly.userData = { angle: a, speed: 0.3 + Math.random() * 0.3, type: 'fly' };
            g.add(fly);
            this.objects.push(fly);
        }

        this.mainGroup = g;
        this.scene.add(g);
    }

    // ── 5. COWORKING ──
    buildCoworking() {
        const g = new THREE.Group();

        const tableMat = new THREE.MeshPhysicalMaterial({ color: 0x1e293b, metalness: 0.3, roughness: 0.4, clearcoat: 0.6 });
        const tableTop = new THREE.Mesh(new THREE.BoxGeometry(3.5, 0.1, 2), tableMat);
        tableTop.position.y = -0.8;
        g.add(tableTop);

        const legMat = new THREE.MeshPhysicalMaterial({ color: 0x374151, metalness: 0.8, roughness: 0.2 });
        [[-1.5, -0.7], [1.5, -0.7], [-1.5, 0.7], [1.5, 0.7]].forEach(([x, z]) => {
            const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.4, 8), legMat);
            leg.position.set(x, -1.5, z);
            g.add(leg);
        });

        const screen = new THREE.Mesh(
            new THREE.BoxGeometry(2, 1.3, 0.05),
            new THREE.MeshPhysicalMaterial({ color: 0x4f8fff, emissive: 0x4f8fff, emissiveIntensity: 0.4, metalness: 0.1, roughness: 0.3 })
        );
        screen.position.set(0, 0.3, -0.5);
        g.add(screen);
        this.objects.push(screen);

        const frame = new THREE.Mesh(
            new THREE.BoxGeometry(2.2, 1.5, 0.03),
            new THREE.MeshPhysicalMaterial({ color: 0x0f172a, metalness: 0.7, roughness: 0.2 })
        );
        frame.position.set(0, 0.3, -0.53);
        g.add(frame);

        const stand = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.5, 0.1), legMat);
        stand.position.set(0, -0.55, -0.5);
        g.add(stand);

        const mug = new THREE.Mesh(
            new THREE.CylinderGeometry(0.15, 0.12, 0.3, 16),
            new THREE.MeshPhysicalMaterial({ color: 0xf59e0b, metalness: 0.2, roughness: 0.4 })
        );
        mug.position.set(1.2, -0.6, 0.3);
        g.add(mug);

        for (let i = 0; i < 3; i++) {
            const arc = new THREE.Mesh(
                new THREE.TorusGeometry(0.3 + i * 0.2, 0.02, 8, 32, Math.PI),
                new THREE.MeshPhysicalMaterial({
                    color: 0x10b981, emissive: 0x10b981, emissiveIntensity: 0.5,
                    transparent: true, opacity: 0.7 - i * 0.2
                })
            );
            arc.position.set(-1.3, 0.3 + i * 0.3, 0.5);
            arc.rotation.z = -Math.PI / 2;
            arc.userData = { baseY: 0.3 + i * 0.3, index: i, type: 'wifi' };
            g.add(arc);
            this.objects.push(arc);
        }

        g.rotation.x = -0.4;
        g.rotation.y = 0.3;
        this.mainGroup = g;
        this.scene.add(g);
    }

    // ── 6. CAREER ──
    buildCareer() {
        const g = new THREE.Group();

        const body = new THREE.Mesh(
            new THREE.CylinderGeometry(0.3, 0.4, 2, 32),
            new THREE.MeshPhysicalMaterial({ color: 0xf8fafc, metalness: 0.4, roughness: 0.3, clearcoat: 0.8 })
        );
        g.add(body);

        const nose = new THREE.Mesh(
            new THREE.ConeGeometry(0.3, 0.8, 32),
            new THREE.MeshPhysicalMaterial({ color: 0xef4444, metalness: 0.5, roughness: 0.2, emissive: 0xef4444, emissiveIntensity: 0.1 })
        );
        nose.position.y = 1.4;
        g.add(nose);

        const finMat = new THREE.MeshPhysicalMaterial({ color: 0x4f8fff, metalness: 0.6, roughness: 0.2 });
        for (let i = 0; i < 4; i++) {
            const shape = new THREE.Shape();
            shape.moveTo(0, 0);
            shape.lineTo(0.5, 0);
            shape.lineTo(0, 0.8);
            shape.lineTo(0, 0);
            const fin = new THREE.Mesh(
                new THREE.ExtrudeGeometry(shape, { depth: 0.05, bevelEnabled: false }),
                finMat
            );
            fin.rotation.y = (i / 4) * Math.PI * 2;
            fin.position.y = -0.8;
            g.add(fin);
        }

        const flame = new THREE.Mesh(
            new THREE.ConeGeometry(0.25, 1.2, 16),
            new THREE.MeshPhysicalMaterial({ color: 0xf59e0b, emissive: 0xf59e0b, emissiveIntensity: 1, transparent: true, opacity: 0.8 })
        );
        flame.position.y = -1.6;
        flame.rotation.x = Math.PI;
        flame.userData = { type: 'flame' };
        g.add(flame);
        this.objects.push(flame);

        const innerFlame = new THREE.Mesh(
            new THREE.ConeGeometry(0.12, 0.8, 16),
            new THREE.MeshPhysicalMaterial({ color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 1, transparent: true, opacity: 0.9 })
        );
        innerFlame.position.y = -1.4;
        innerFlame.rotation.x = Math.PI;
        innerFlame.userData = { type: 'flame' };
        g.add(innerFlame);
        this.objects.push(innerFlame);

        for (let i = 0; i < 2; i++) {
            const orbit = new THREE.Mesh(
                new THREE.TorusGeometry(2.5 + i * 0.6, 0.02, 8, 128),
                new THREE.MeshPhysicalMaterial({
                    color: 0x4f8fff, emissive: 0x4f8fff, emissiveIntensity: 0.3,
                    transparent: true, opacity: 0.4 - i * 0.15
                })
            );
            orbit.rotation.x = Math.PI / 3 + i * 0.4;
            orbit.rotation.y = i * 0.6;
            orbit.userData = { speed: 0.2 + i * 0.1, type: 'orbit' };
            g.add(orbit);
            this.objects.push(orbit);
        }

        for (let i = 0; i < 4; i++) {
            const sat = new THREE.Mesh(
                new THREE.IcosahedronGeometry(0.1, 1),
                new THREE.MeshPhysicalMaterial({ color: 0xf59e0b, emissive: 0xf59e0b, emissiveIntensity: 0.6 })
            );
            const a = (i / 4) * Math.PI * 2;
            sat.position.set(Math.cos(a) * 2.5, Math.sin(a), Math.sin(a) * 2.5);
            sat.userData = { angle: a, radius: 2.5, speed: 0.4, type: 'satellite' };
            g.add(sat);
            this.objects.push(sat);
        }

        g.rotation.z = 0.2;
        this.mainGroup = g;
        this.scene.add(g);
    }

    // ── PARTICLES ──
    createParticles() {
        const count = 200;
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count * 3; i++) {
            positions[i] = (Math.random() - 0.5) * 20;
        }
        const geo = new THREE.BufferGeometry();
        geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        this.particles = new THREE.Points(geo, new THREE.PointsMaterial({
            color: 0x4f8fff, size: 0.03, transparent: true, opacity: 0.6, sizeAttenuation: true
        }));
        this.scene.add(this.particles);
    }

    // ── ANIMATE ──
    animate() {
        this.animationId = requestAnimationFrame(this.animate.bind(this));

        const t = this.clock.getElapsedTime();

        this.targetRotation.x += (this.mouse.y * 0.5 - this.targetRotation.x) * 0.05;
        this.targetRotation.y += (this.mouse.x * 0.8 - this.targetRotation.y) * 0.05;

        if (this.mainGroup) {
            this.mainGroup.rotation.y = this.targetRotation.y + t * 0.15;
            const baseX = this.sceneType === 'coworking' ? -0.4 : 0;
            this.mainGroup.rotation.x = baseX + this.targetRotation.x;
        }

        this.objects.forEach(obj => {
            const d = obj.userData;
            if (!d || !d.type) return;

            switch (d.type) {
                case 'wave':
                    const s = 1 + Math.sin(t * 2 + d.index * 1.5) * 0.3;
                    obj.scale.set(s, s, s);
                    obj.material.opacity = 0.4 + Math.sin(t * 3 + d.index) * 0.2;
                    break;
                case 'orbit':
                    obj.rotation.z += d.speed * 0.01;
                    obj.rotation.x += d.speed * 0.005;
                    break;
                case 'fly':
                    const fa = d.angle + t * d.speed;
                    obj.position.x = Math.cos(fa) * 2.5;
                    obj.position.z = Math.sin(fa) * 2.5;
                    obj.position.y = Math.sin(t * d.speed * 2);
                    obj.rotation.x = t * 0.5;
                    obj.rotation.z = t * 0.3;
                    break;
                case 'flame':
                    const flicker = 0.85 + Math.random() * 0.3;
                    obj.scale.set(flicker, 0.8 + Math.random() * 0.4, flicker);
                    break;
                case 'satellite':
                    const sa = d.angle + t * d.speed;
                    obj.position.x = Math.cos(sa) * d.radius;
                    obj.position.z = Math.sin(sa) * d.radius;
                    obj.position.y = Math.sin(sa * 2) * 0.8;
                    break;
                case 'wifi':
                    obj.material.opacity = 0.3 + Math.sin(t * 2 + d.index * 1.5) * 0.3;
                    break;
                case 'star':
                    const sta = d.angle + t * d.speed;
                    obj.position.x = Math.cos(sta) * 2;
                    obj.position.z = Math.sin(sta) * 2;
                    obj.position.y = Math.sin(sta * 2) * 0.5;
                    obj.rotation.x = t;
                    obj.rotation.y = t * 0.7;
                    break;
            }
        });

        if (this.particles) {
            this.particles.rotation.y = t * 0.02;
            this.particles.rotation.x = Math.sin(t * 0.01) * 0.1;
        }

        this.renderer.render(this.scene, this.camera);
    }

    // ── EVENTS ──
    onMouseMove(e) {
        const rect = this.container.getBoundingClientRect();
        this.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        this.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    }

    onTouchMove(e) {
        if (e.touches.length > 0) {
            const rect = this.container.getBoundingClientRect();
            this.mouse.x = ((e.touches[0].clientX - rect.left) / rect.width) * 2 - 1;
            this.mouse.y = -((e.touches[0].clientY - rect.top) / rect.height) * 2 + 1;
        }
    }

    onResize() {
        const w = this.container.clientWidth;
        const h = this.container.clientHeight;
        if (w === 0 || h === 0) return;
        this.camera.aspect = w / h;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(w, h);
    }

    destroy() {
        if (this.animationId) cancelAnimationFrame(this.animationId);
        this.container.removeEventListener('mousemove', this.boundMouseMove);
        this.container.removeEventListener('touchmove', this.boundTouchMove);
        window.removeEventListener('resize', this.boundResize);
        if (this.renderer) {
            this.renderer.dispose();
            const canvas = this.renderer.domElement;
            if (canvas && canvas.parentNode) {
                canvas.parentNode.removeChild(canvas);
            }
        }
    }
}
