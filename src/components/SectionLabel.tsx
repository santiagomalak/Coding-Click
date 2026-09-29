type Props = { number: string; label: string };

export default function SectionLabel({ number, label }: Props) {
  return (
    <p className="text-[11px] uppercase tracking-[0.08em] text-muted">
      [ {number} — {label} ]
    </p>
  );
}
