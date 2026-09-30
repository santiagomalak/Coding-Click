type Props = { items: string[] };

// Marquee infinito (gris -> blanco en hover). El movimiento se detiene solo
// si el usuario pide menos animación (regla global en styles/index.css).
export default function Marquee({ items }: Props) {
  const doubled = [...items, ...items];
  return (
    <div className="group overflow-hidden border-y border-line py-6">
      <div className="flex w-max animate-marquee gap-16 group-hover:[animation-play-state:paused]">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="whitespace-nowrap font-display text-xl uppercase tracking-wide text-muted transition-colors hover:text-ink md:text-2xl"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
