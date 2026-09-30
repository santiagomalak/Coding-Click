import { useEffect, useRef } from "react";
import * as THREE from "three";
import * as CANNON from "cannon-es";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { gsap, isDesktopPointer, prefersReducedMotion } from "@/lib/motion";
import { viewSizeAtZ } from "@/lib/three-utils";

const DESKTOP_COUNT = 18;
const MOBILE_COUNT = 9;
const SPHERE_RADIUS = 0.45;

// Ball-pit con física real (cannon-es): las esferas caen, rebotan y se apilan dentro del contenedor,
// se pueden empujar con el mouse y reciben un impulso más fuerte con cada click gracias al evento
// "site:click-impulse" que ya dispara `ClickRipple.tsx`. Ver docs/03-marca-y-diseno.md.
export default function PhysicsBallPitScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || prefersReducedMotion()) return;

    let width = container.clientWidth;
    let height = container.clientHeight;
    const isNarrow = width < 640;
    const count = isNarrow ? MOBILE_COUNT : DESKTOP_COUNT;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(0, 0, 12);

    const pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    pmrem.dispose();

    const key = new THREE.DirectionalLight(0xffffff, 1.2);
    key.position.set(-4, 6, 8);
    scene.add(key);
    scene.add(new THREE.AmbientLight(0x222222, 1.1));
    const accentLight = new THREE.PointLight(0xc6ff3d, 0.5, 40);
    accentLight.position.set(3, 2, 6);
    scene.add(accentLight);

    const world = new CANNON.World({ gravity: new CANNON.Vec3(0, -9.82, 0) });
    world.broadphase = new CANNON.SAPBroadphase(world);
    world.allowSleep = true;

    const wallMaterial = new CANNON.Material("wall");
    const sphereMaterial = new CANNON.Material("sphere");
    world.addContactMaterial(new CANNON.ContactMaterial(wallMaterial, sphereMaterial, { friction: 0.3, restitution: 0.45 }));
    world.addContactMaterial(new CANNON.ContactMaterial(sphereMaterial, sphereMaterial, { friction: 0.15, restitution: 0.55 }));

    const wallBodies: CANNON.Body[] = [];
    function addStaticBox(pos: [number, number, number], size: [number, number, number]) {
      const body = new CANNON.Body({ mass: 0, material: wallMaterial });
      body.addShape(new CANNON.Box(new CANNON.Vec3(size[0] / 2, size[1] / 2, size[2] / 2)));
      body.position.set(...pos);
      world.addBody(body);
      wallBodies.push(body);
    }

    function buildBounds() {
      for (const body of wallBodies) world.removeBody(body);
      wallBodies.length = 0;

      const { width: viewW, height: viewH } = viewSizeAtZ(camera, 0);
      const halfW = viewW / 2;
      const halfH = viewH / 2;
      const thick = 2;

      addStaticBox([0, -halfH - thick / 2 + 0.05, 0], [viewW + thick * 2, thick, 4]);
      addStaticBox([-halfW - thick / 2 + 0.05, 0, 0], [thick, viewH + thick * 2, 4]);
      addStaticBox([halfW + thick / 2 - 0.05, 0, 0], [thick, viewH + thick * 2, 4]);
      addStaticBox([0, 0, -1.6], [viewW + thick * 2, viewH + thick * 2, thick]);
      addStaticBox([0, 0, 1.6], [viewW + thick * 2, viewH + thick * 2, thick]);

      return { halfW, halfH };
    }

    const { halfW } = buildBounds();

    // Negro brillante con clearcoat + luz rim blanca — igual que AmbientOrbs, nunca el
    // acento como color de relleno (ver docs/03-marca-y-diseno.md). El lima queda solo
    // como luz de acento sutil (accentLight) y en el ripple de click.
    const geometry = new THREE.SphereGeometry(SPHERE_RADIUS, 32, 32);
    const material = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#111111"),
      metalness: 0.15,
      roughness: 0.22,
      clearcoat: 1,
      clearcoatRoughness: 0.15,
    });

    const bodies: CANNON.Body[] = [];
    const meshes: THREE.Mesh[] = [];

    for (let i = 0; i < count; i++) {
      const body = new CANNON.Body({
        mass: 1,
        shape: new CANNON.Sphere(SPHERE_RADIUS),
        material: sphereMaterial,
        position: new CANNON.Vec3((Math.random() - 0.5) * halfW * 1.3, 4 + i * 0.6, (Math.random() - 0.5) * 0.6),
        linearDamping: 0.35,
        angularDamping: 0.6,
      });
      world.addBody(body);
      bodies.push(body);

      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);
      meshes.push(mesh);
    }

    const raycaster = new THREE.Raycaster();
    const pointerNdc = new THREE.Vector2();
    const zeroPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const hitPoint = new THREE.Vector3();

    function pointerToWorld(clientX: number, clientY: number) {
      const rect = container!.getBoundingClientRect();
      pointerNdc.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      pointerNdc.y = -((clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointerNdc, camera);
      raycaster.ray.intersectPlane(zeroPlane, hitPoint);
      return hitPoint;
    }

    function applyRadialImpulse(point: THREE.Vector3, strength: number, radius: number) {
      for (const body of bodies) {
        const dx = body.position.x - point.x;
        const dy = body.position.y - point.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 0.001;
        if (dist >= radius) continue;
        const falloff = 1 - dist / radius;
        body.applyImpulse(
          new CANNON.Vec3((dx / dist) * strength * falloff, (dy / dist) * strength * falloff * 0.6 + strength * falloff * 0.15, 0)
        );
        body.wakeUp();
      }
    }

    const desktopPointer = isDesktopPointer();

    function onPointerMove(e: PointerEvent) {
      if (!desktopPointer) return;
      const rect = container!.getBoundingClientRect();
      if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) return;
      applyRadialImpulse(pointerToWorld(e.clientX, e.clientY), 2, 1.8);
    }
    window.addEventListener("pointermove", onPointerMove);

    function onClickImpulse(e: Event) {
      const detail = (e as CustomEvent<{ x: number; y: number }>).detail;
      if (!detail) return;
      const rect = container!.getBoundingClientRect();
      if (detail.x < rect.left || detail.x > rect.right || detail.y < rect.top || detail.y > rect.bottom) return;
      applyRadialImpulse(pointerToWorld(detail.x, detail.y), 6, 2.6);
    }
    window.addEventListener("site:click-impulse", onClickImpulse);

    function onResize() {
      width = container!.clientWidth;
      height = container!.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      buildBounds();
    }
    window.addEventListener("resize", onResize);

    function tick() {
      world.fixedStep();
      for (let i = 0; i < bodies.length; i++) {
        meshes[i].position.copy(bodies[i].position as unknown as THREE.Vector3);
        meshes[i].quaternion.copy(bodies[i].quaternion as unknown as THREE.Quaternion);
      }
      renderer.render(scene, camera);
    }
    gsap.ticker.add(tick);

    return () => {
      gsap.ticker.remove(tick);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("site:click-impulse", onClickImpulse);
      window.removeEventListener("resize", onResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={containerRef} aria-hidden="true" className="absolute inset-0" />;
}
