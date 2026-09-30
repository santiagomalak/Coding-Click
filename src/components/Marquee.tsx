type Props = { items: string[] };

// Marquee infinito (gris -> blanco en hover, cada 4to ítem en lima como "latido" fijo).
// Fade en los bordes vía mask-image así el texto no se corta feo contra el borde del
// contenedor. El movimiento se detiene solo si el usuario pide menos animación (regla
// global en styles/index.css).
export default function Marquee({ items }: Props) {
  const doubled = [...items, ...items];
  return (
    <div
      className="group overflow-hidden border-y border-line py-6
        [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]
        [-webkit-mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
    >
      <div className="flex w-max animate-marquee gap-16 group-hover:[animation-play-state:paused]">
        {doubled.map((item, i) => {
          const isAccent = (i % items.length) % 4 === 0;
          return (
            <span
              key={i}
              className={`whitespace-nowrap font-display text-xl uppercase tracking-wide transition-colors md:text-2xl ${
                isAccent ? "text-accent" : "text-muted hover:text-ink"
              }`}
            >
              {item}
            </span>
          );
        })}
      </div>
    </div>
  );
}
