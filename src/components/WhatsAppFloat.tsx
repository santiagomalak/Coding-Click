import { buildWhatsAppUrl } from "@/lib/whatsapp";

export default function WhatsAppFloat() {
  return (
    <a
      href={buildWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 border border-accent bg-bg px-4 py-3 text-xs uppercase tracking-wide text-accent hover:bg-accent hover:text-bg transition-colors"
    >
      WhatsApp
    </a>
  );
}
