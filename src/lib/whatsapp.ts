import { contact } from "@/config/site.config";

export function buildWhatsAppUrl(message?: string): string {
  const text = encodeURIComponent(message ?? contact.whatsappDefaultMessage);
  return `https://wa.me/${contact.whatsappNumber}?text=${text}`;
}
