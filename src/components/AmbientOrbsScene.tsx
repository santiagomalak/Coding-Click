import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { gsap, isDesktopPointer, prefersReducedMotion } from "@/lib/motion";
import { viewSizeAtZ } from "@/lib/three-utils";

// Esferas grandes, mate/glossy, ancladas a las esquinas del viewport, sangrando fuera de pantalla.
// Referencia visual: shot de Dribbble "kynesys — Crypto Research Lab" (Denys Ishchenko) — la referencia
// en sí es estática (confirmado cuadro por cuadro sobre una grabación real del shot), pero acá le sumamos
// vida propia para que no se sienta "muerta": 4 formas DISTINTAS (una esfera lisa se ve igual rotando,
// por eso las otras tres tienen relieve — grooves, blob con ruido, facetada), rotación + deriva tipo
// Lissajous (sube/baja y va y viene en un patrón suave, no al azar) y una caída lenta de entrada al
// cargar la página. La física real (caen/rebotan/se empujan con el mouse y el click) vive aparte, en el
// ball-pit del footer (`PhysicsBallPitScene.tsx`).

// Ruido barato (suma de senos) solo para desplazar vértices una vez al construir la geometría —
// no hace falta una librería de ruido real para esto.
function cheapNoise(x: number, y: number, z: number) {
  return (Math.sin(x * 3.1 + y * 1.7) + Math.sin(y * 2.3 + z * 2.9) + Math.sin(z * 4.1 + x * 2.2)) / 3;
}

function buildSmoothSphere(radius: number) {
  return new THREE.SphereGeometry(radius, 48, 48);
}

// Esfera acanalada (grooves), como el objeto "Morph" de la referencia.
function buildRidgedSphere(radius: number) {
  const geo = new THREE.SphereGeometry(radius, 96, 96);
  const pos = geo.attributes.position;
  const v = new THREE.Vector3();
  const n = new THREE.Vector3();
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);
    n.copy(v).normalize();
    const angle = Math.atan2(n.z, n.x);
    const ridge = Math.sin(angle * 11) * 0.05 + Math.sin(n.y * 16) * 0.025;
    v.addScaledVector(n, ridge * radius);
    pos.setXYZ(i, v.x, v.y, v.z);
  }
  geo.computeVertexNormals();
  return geo;
}

// Blob orgánico con ruido, como el objeto "LQD" de la referencia.
function buildBlobSphere(radius: number) {
  const geo = new THREE.IcosahedronGeometry(radius, 5);
  const pos = geo.attributes.position;
  const v = new THREE.Vector3();
  const n = new THREE.Vector3();
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);
    n.copy(v).normalize();
    const noise = cheapNoise(n.x * 2.6, n.y * 2.6, n.z * 2.6);
    v.addScaledVector(n, noise * radius * 0.16);
    pos.setXYZ(i, v.x, v.y, v.z);
  }
  geo.computeVertexNormals();
  return geo;
}

// Forma facetada low-poly, como un cristal — variedad visual barata y con sombreado plano bien marcado.
function buildFacetedShape(radius: number) {
  return new THREE.IcosahedronGeometry(radius, 0).toNonIndexed();
}

const SHAPE_BUILDERS = [buildSmoothSphere, buildRidgedSphere, buildBlobSphere, buildFacetedShape];

export default function AmbientOrbs() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || prefersReducedMotion()) return;

    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 2 : 4;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 10;

    const pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    pmrem.dispose();

    const key = new THREE.DirectionalLight(0xffffff, 1);
    key.position.set(-5, 6, 8);
    scene.add(key);
    scene.add(new THREE.AmbientLight(0x0a0a0a, 1.4));

    const material = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#0d0d0d"),
      roughness: 0.3,
      metalness: 0.15,
      clearcoat: 1,
      clearcoatRoughness: 0.2,
    });

    const corners: Array<[number, number]> = [
      [-1, 1],
      [1, 1],
      [-1, -1],
      [1, -1],
    ];

    type OrbState = {
      mesh: THREE.Mesh;
      baseX: number;
      baseY: number;
      driftAmpX: number;
      driftAmpY: number;
      driftFreqX: number;
      driftFreqY: number;
      driftPhaseX: number;
      driftPhaseY: number;
      rotSpeedX: number;
      rotSpeedY: number;
    };
    const orbs: OrbState[] = [];
    const geometries: THREE.BufferGeometry[] = [];
    let currentViewH = 0;

    function layout() {
      const { width: viewW, height: viewH } = viewSizeAtZ(camera, 0);
      currentViewH = viewH;
      const radius = Math.max(viewW, viewH) * 0.24;
      orbs.forEach((orb, i) => {
        const [sx, sy] = corners[i];
        orb.mesh.scale.setScalar(radius);
        orb.baseX = sx * viewW * 0.42;
        orb.baseY = sy * viewH * 0.42;
        orb.mesh.position.x = orb.baseX;
        orb.mesh.position.z = -1 - i * 0.4;
        orb.driftAmpX = radius * 0.06;
        orb.driftAmpY = radius * 0.09;
      });
    }

    for (let i = 0; i < count; i++) {
      const geometry = SHAPE_BUILDERS[i % SHAPE_BUILDERS.length](1);
      geometries.push(geometry);
      const mesh = new THREE.Mesh(geometry, material);
      mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      scene.add(mesh);
      orbs.push({
        mesh,
        baseX: 0,
        baseY: 0,
        driftAmpX: 0,
        driftAmpY: 0,
        driftFreqX: 0.15 + Math.random() * 0.08,
        driftFreqY: 0.11 + Math.random() * 0.06,
        driftPhaseX: Math.random() * Math.PI * 2,
        driftPhaseY: Math.random() * Math.PI * 2,
        rotSpeedX: 0.002 + Math.random() * 0.0025,
        rotSpeedY: 0.0025 + Math.random() * 0.003,
      });
    }
    layout();

    // Caída de entrada: arrancan arriba del viewport (en unidades del mundo 3D, no píxeles
    // de pantalla) y bajan lento hasta su posición de reposo.
    const fallState = orbs.map(() => ({ y: 0 }));
    orbs.forEach((orb, i) => {
      fallState[i].y = orb.baseY + currentViewH * 1.3;
      gsap.to(fallState[i], {
        y: orb.baseY,
        duration: 2.6 + i * 0.25,
        delay: 0.15 + i * 0.12,
        ease: "power2.out",
      });
    });

    const desktopPointer = isDesktopPointer();
    let targetRotY = 0;
    let targetRotX = 0;

    function onPointerMove(e: PointerEvent) {
      if (!desktopPointer) return;
      targetRotY = (e.clientX / window.innerWidth - 0.5) * 0.16;
      targetRotX = (e.clientY / window.innerHeight - 0.5) * 0.1;
    }
    if (desktopPointer) window.addEventListener("pointermove", onPointerMove);

    function onResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      layout();
      orbs.forEach((orb, i) => {
        fallState[i].y = orb.baseY;
      });
    }
    window.addEventListener("resize", onResize);

    const clock = new THREE.Clock();

    function tick() {
      const t = clock.getElapsedTime();
      scene.rotation.y += (targetRotY - scene.rotation.y) * 0.04;
      scene.rotation.x += (targetRotX - scene.rotation.x) * 0.04;

      orbs.forEach((orb, i) => {
        orb.mesh.rotation.x += orb.rotSpeedX;
        orb.mesh.rotation.y += orb.rotSpeedY;
        orb.mesh.position.x = orb.baseX + Math.sin(t * orb.driftFreqX + orb.driftPhaseX) * orb.driftAmpX;
        orb.mesh.position.y = fallState[i].y + Math.sin(t * orb.driftFreqY + orb.driftPhaseY) * orb.driftAmpY;
      });

      renderer.render(scene, camera);
    }
    gsap.ticker.add(tick);

    return () => {
      gsap.ticker.remove(tick);
      gsap.killTweensOf(fallState);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", onResize);
      for (const geometry of geometries) geometry.dispose();
      material.dispose();
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={containerRef} aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 opacity-70" />;
}
