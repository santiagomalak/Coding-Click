import { useEffect, useRef } from "react";
import * as THREE from "three";
import * as CANNON from "cannon-es";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { gsap, isDesktopPointer, prefersReducedMotion } from "@/lib/motion";
import { viewSizeAtZ } from "@/lib/three-utils";

// Objetos de fondo con FÍSICA REAL (cannon-es) — de tamaños y formas variados, se sueltan desde
// arriba al centro de la pantalla y caen/rebotan/se apilan con gravedad real contra el piso y los
// bordes del viewport. Reaccionan al mouse y al evento global "site:click-impulse" en toda la
// página (el mismo que dispara `ClickRipple.tsx`), igual que el ball-pit del footer — comparten
// el mismo motor y el mismo ajuste de estabilidad (spawn en grilla sin superposición + solver con
// más iteraciones, ver `PhysicsBallPitScene.tsx`).
//
// Iteración anterior (4 esferas lisas fijas, una por esquina, sin física, con deriva simulada por
// GSAP) reemplazada por pedido de Santiago 2026-09-30: "no me gusta que haya una en cada esquina,
// deberían aparecer de diversos tamaños y formas... como si las soltaran desde el medio arriba y
// caigan" + "mejor usar leyes de física reales para que sea algo que realmente sirva".
//
// Simplificación a propósito: la FORMA visual (lisa/acanalada/blob/facetada) es solo estética —
// el cuerpo físico de cada una sigue siendo una esfera simple (CANNON.Sphere). Un hull real por
// forma sería mucho más caro y no se nota la diferencia en objetos tan chicos de fondo.

function cheapNoise(x: number, y: number, z: number) {
  return (Math.sin(x * 3.1 + y * 1.7) + Math.sin(y * 2.3 + z * 2.9) + Math.sin(z * 4.1 + x * 2.2)) / 3;
}

function buildSmoothSphere(radius: number) {
  return new THREE.SphereGeometry(radius, 40, 40);
}

// Esfera acanalada (grooves), como el objeto "Morph" de la referencia Kynesys.
function buildRidgedSphere(radius: number) {
  const geo = new THREE.SphereGeometry(radius, 80, 80);
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
  const geo = new THREE.IcosahedronGeometry(radius, 4);
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

// Forma facetada low-poly, como un cristal.
function buildFacetedShape(radius: number) {
  return new THREE.IcosahedronGeometry(radius, 0).toNonIndexed();
}

const SHAPE_BUILDERS = [buildSmoothSphere, buildRidgedSphere, buildBlobSphere, buildFacetedShape];

const DESKTOP_COUNT = 6;
const MOBILE_COUNT = 4;

export default function AmbientOrbs() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || prefersReducedMotion()) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    const isMobile = width < 768;
    const count = isMobile ? MOBILE_COUNT : DESKTOP_COUNT;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
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

    const world = new CANNON.World({ gravity: new CANNON.Vec3(0, -9.82, 0) });
    world.broadphase = new CANNON.SAPBroadphase(world);
    world.allowSleep = true;
    const solver = new CANNON.GSSolver();
    solver.iterations = 20;
    world.solver = solver;

    const wallMaterial = new CANNON.Material("wall");
    const sphereMaterial = new CANNON.Material("sphere");
    world.addContactMaterial(new CANNON.ContactMaterial(wallMaterial, sphereMaterial, { friction: 0.3, restitution: 0.35 }));
    world.addContactMaterial(new CANNON.ContactMaterial(sphereMaterial, sphereMaterial, { friction: 0.15, restitution: 0.4 }));

    const wallBodies: CANNON.Body[] = [];
    function addStaticBox(pos: [number, number, number], size: [number, number, number]) {
      const body = new CANNON.Body({ mass: 0, material: wallMaterial });
      body.addShape(new CANNON.Box(new CANNON.Vec3(size[0] / 2, size[1] / 2, size[2] / 2)));
      body.position.set(...pos);
      world.addBody(body);
      wallBodies.push(body);
    }

    let halfW = 0;
    let halfH = 0;

    function buildBounds() {
      for (const body of wallBodies) world.removeBody(body);
      wallBodies.length = 0;

      const { width: viewW, height: viewH } = viewSizeAtZ(camera, 0);
      halfW = viewW / 2;
      halfH = viewH / 2;
      const thick = 2;

      // Piso levantado a la mitad de la mitad inferior del viewport (no al borde real): así los
      // objetos se asientan en el tercio superior/medio de la pantalla y dejan libre la franja
      // inferior donde suele haber UI (CTAs del hero, footer) — antes caían hasta el borde exacto
      // y terminaban tapando esos elementos (bug real confirmado 2026-09-30 en el sitio en vivo).
      const floorY = -halfH * 0.5;
      addStaticBox([0, floorY - thick / 2 + 0.05, 0], [viewW + thick * 2, thick, 4]);
      addStaticBox([-halfW - thick / 2 + 0.05, 0, 0], [thick, viewH + thick * 2, 4]);
      addStaticBox([halfW + thick / 2 - 0.05, 0, 0], [thick, viewH + thick * 2, 4]);
      addStaticBox([0, 0, -2.2], [viewW + thick * 2, viewH + thick * 2, thick]);
      addStaticBox([0, 0, 2.2], [viewW + thick * 2, viewH + thick * 2, thick]);
    }
    buildBounds();

    // Radio base relativo al viewport, con variación de tamaño por objeto ("diversos tamaños").
    const baseRadius = Math.max(halfW, halfH) * 0.11;
    const radii = Array.from({ length: count }, () => baseRadius * (0.6 + Math.random() * 0.7));
    const maxRadius = Math.max(...radii);

    const bodies: CANNON.Body[] = [];
    const meshes: THREE.Mesh[] = [];
    const geometries: THREE.BufferGeometry[] = [];

    // Se sueltan desde arriba, cerca del centro horizontal (no una por esquina), en una grilla
    // angosta de 2 columnas para no arrancar superpuestas (la separación usa el radio más grande
    // del grupo, así ninguna se toca al arrancar sin importar el tamaño que le tocó).
    const cols = 2;
    const cellWidth = maxRadius * 2.6;
    const rowSpacing = maxRadius * 3.4;

    for (let i = 0; i < count; i++) {
      const radius = radii[i];
      const geometry = SHAPE_BUILDERS[i % SHAPE_BUILDERS.length](radius);
      geometries.push(geometry);

      const col = i % cols;
      const row = Math.floor(i / cols);
      const cellCenterX = -cellWidth * ((cols - 1) / 2) + cellWidth * col;
      const x = cellCenterX + (Math.random() - 0.5) * cellWidth * 0.25;
      // Arrancan arriba del borde visible del viewport para que se las vea caer, no ya adentro.
      const y = halfH * 1.3 + row * rowSpacing + Math.random() * 0.2;
      const z = (Math.random() - 0.5) * 1.0;

      const body = new CANNON.Body({
        mass: 1,
        shape: new CANNON.Sphere(radius),
        material: sphereMaterial,
        position: new CANNON.Vec3(x, y, z),
        linearDamping: 0.1,
        angularDamping: 0.4,
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
      pointerNdc.x = (clientX / window.innerWidth) * 2 - 1;
      pointerNdc.y = -(clientY / window.innerHeight) * 2 + 1;
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
      applyRadialImpulse(pointerToWorld(e.clientX, e.clientY), 1.6, 1.6);
    }
    if (desktopPointer) window.addEventListener("pointermove", onPointerMove);

    function onClickImpulse(e: Event) {
      const detail = (e as CustomEvent<{ x: number; y: number }>).detail;
      if (!detail) return;
      applyRadialImpulse(pointerToWorld(detail.x, detail.y), 5, 2.4);
    }
    window.addEventListener("site:click-impulse", onClickImpulse);

    function onResize() {
      width = window.innerWidth;
      height = window.innerHeight;
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
      if (desktopPointer) window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("site:click-impulse", onClickImpulse);
      window.removeEventListener("resize", onResize);
      for (const geometry of geometries) geometry.dispose();
      material.dispose();
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

  // Las esferas ambientales están ancladas al viewport completo (position: fixed), así que sin
  // este fix terminaban superpuestas visualmente con el contenido del footer una vez que se
  // asentaban ahí por gravedad (bug real confirmado 2026-09-30 revisando el sitio en vivo: tapaban
  // el logo y el copyright). Se atenúan a 0 apenas el footer se acerca, dejando la capa ambiental
  // reservada al resto del sitio — el footer ya tiene su propio ball-pit dedicado.
  useEffect(() => {
    const container = containerRef.current;
    const footer = document.querySelector("footer");
    if (!container || !footer || prefersReducedMotion()) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        container.style.opacity = entry.isIntersecting ? "0" : "0.7";
      },
      { rootMargin: "0px 0px 400px 0px", threshold: 0 },
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 opacity-70 transition-opacity duration-700 ease-out"
    />
  );
}
