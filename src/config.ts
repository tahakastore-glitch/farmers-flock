/** Add a verified business WhatsApp number in international format (digits only, no +).
 * Example format: country code followed by the subscriber number. Leave empty until configured.
 */
export const BUSINESS_WHATSAPP_NUMBER = ''

export function getWhatsAppUrl(message: string): string | null {
  const digits = BUSINESS_WHATSAPP_NUMBER.replace(/\D/g, '')
  if (digits.length < 8 || digits.length > 15) return null
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`
}
