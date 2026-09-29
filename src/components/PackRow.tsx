type Props = {
  index: string;
  name: string;
  description: string;
  price?: string;
  highlighted?: boolean;
};

export default function PackRow({ index, name, description, price, highlighted }: Props) {
  return (
    <div
      className={`group flex flex-col gap-2 border-b border-line px-[5vw] py-8 transition-colors hover:bg-ink hover:text-bg md:flex-row md:items-baseline md:justify-between ${
        highlighted ? "bg-line/30" : ""
      }`}
    >
      <div className="flex items-baseline gap-4">
        <span className="text-sm text-muted group-hover:text-bg">{index}</span>
        <span className="font-display text-3xl md:text-5xl">{name}</span>
        {highlighted && <span className="text-[11px] uppercase tracking-[0.08em] text-accent group-hover:text-bg">[ recomendado ]</span>}
      </div>
      <div className="max-w-md text-sm text-muted group-hover:text-bg">
        <p>{description}</p>
        {price && <p className="mt-1 text-ink group-hover:text-bg">{price}</p>}
      </div>
    </div>
  );
}
