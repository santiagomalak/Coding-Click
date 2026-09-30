import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { gsap, isDesktopPointer, prefersReducedMotion } from "@/lib/motion";
import { viewSizeAtZ } from "@/lib/three-utils";

// Esferas grandes, mate/glossy, ancladas a las esquinas del viewport, sangrando fuera de pantalla.
// Referencia visual: shot de Dribbble "kynesys — Crypto Research Lab" (Denys Ishchenko) — SOLO decorativas,
// no tienen física ni colisión entre ellas (confirmado cuadro por cuadro sobre una grabación del shot:
// ni siquiera reaccionan al cursor). Acá les sumamos una rotación lenta y un parallax sutil con el mouse
// como plus propio, no como algo tomado de la referencia. La física real (caen/rebotan/se empujan) vive
// aparte, en el ball-pit del footer (`PhysicsBallPitScene.tsx`).
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

    const geometry = new THREE.SphereGeometry(1, 48, 48);
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

    const meshes: THREE.Mesh[] = [];

    function layout() {
      const { width: viewW, height: viewH } = viewSizeAtZ(camera, 0);
      const radius = Math.max(viewW, viewH) * 0.24;
      meshes.forEach((mesh, i) => {
        const [sx, sy] = corners[i];
        mesh.scale.setScalar(radius);
        mesh.position.set(sx * viewW * 0.42, sy * viewH * 0.42, -1 - i * 0.4);
      });
    }

    for (let i = 0; i < count; i++) {
      const mesh = new THREE.Mesh(geometry, material);
      mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      scene.add(mesh);
      meshes.push(mesh);
    }
    layout();

    const desktopPointer = isDesktopPointer();
    let targetRotX = 0;
    let targetRotY = 0;

    function onPointerMove(e: PointerEvent) {
      if (!desktopPointer) return;
      targetRotY = (e.clientX / window.innerWidth - 0.5) * 0.12;
      targetRotX = (e.clientY / window.innerHeight - 0.5) * 0.08;
    }
    if (desktopPointer) window.addEventListener("pointermove", onPointerMove);

    function onResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      layout();
    }
    window.addEventListener("resize", onResize);

    function tick() {
      scene.rotation.y += (targetRotY - scene.rotation.y) * 0.04;
      scene.rotation.x += (targetRotX - scene.rotation.x) * 0.04;
      for (const mesh of meshes) {
        mesh.rotation.y += 0.0015;
        mesh.rotation.x += 0.0008;
      }
      renderer.render(scene, camera);
    }
    gsap.ticker.add(tick);

    return () => {
      gsap.ticker.remove(tick);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", onResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={containerRef} aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 opacity-70" />;
}
