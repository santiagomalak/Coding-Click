// Helpers compartidos por los componentes de Three.js (esferas de fondo y ball-pit del footer).
// Ver docs/03-marca-y-diseno.md para el contexto de diseño de estas piezas.

/** Alto y ancho del plano visible por la cámara a una profundidad z dada (mundo 3D). */
export function viewSizeAtZ(camera: { fov: number; aspect: number; position: { z: number } }, z: number) {
  const distance = camera.position.z - z;
  const vFov = (camera.fov * Math.PI) / 180;
  const height = 2 * Math.tan(vFov / 2) * distance;
  return { width: height * camera.aspect, height };
}
