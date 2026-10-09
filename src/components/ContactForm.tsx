import { useEffect, useState, type FormEvent } from 'react'
import { Icon } from '../Icons'
import { getWhatsAppUrl } from '../config'

type Props = { initialMessage: string }
type Fields = { name: string; business: string; phone: string; email: string; inquiry: string; message: string }
type FieldName = keyof Fields
const initialFields: Fields = { name: '', business: '', phone: '', email: '', inquiry: '', message: '' }

export function ContactForm({ initialMessage }: Props) {
  const [fields, setFields] = useState<Fields>(initialFields)
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({})
  const [status, setStatus] = useState('')
  const [sentDemo, setSentDemo] = useState(false)

  useEffect(() => {
    if (initialMessage) {
      setFields((current) => ({ ...current, message: initialMessage }))
      setStatus('')
      setSentDemo(false)
    }
  }, [initialMessage])

  const whatsappUrl = getWhatsAppUrl(`FARMORA inquiry\nName: ${fields.name}\nBusiness: ${fields.business}\nInquiry: ${fields.inquiry}\nMessage: ${fields.message}`)

  function updateField(name: FieldName, value: string) {
    setFields((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: undefined }))
    setStatus('')
  }

  function validate(): Partial<Record<FieldName, string>> {
    const next: Partial<Record<FieldName, string>> = {}
    if (fields.name.trim().length < 2) next.name = 'Please enter your full name.'
    if (fields.business.trim().length < 2) next.business = 'Please enter your business name.'
    if (fields.phone.replace(/\D/g, '').length < 7 || !/^[+()\d\s.-]{7,24}$/.test(fields.phone.trim())) next.phone = 'Enter a valid phone number, including area or country code if needed.'
    if (fields.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) next.email = 'Enter a valid email address or leave this field blank.'
    if (!fields.inquiry) next.inquiry = 'Choose the kind of inquiry you have.'
    if (fields.message.trim().length < 12) next.message = 'Add a little more detail (at least 12 characters).'
    return next
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors = validate()
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) {
      setStatus('Please review the highlighted fields and try again.')
      setSentDemo(false)
      document.getElementById(Object.keys(nextErrors)[0])?.focus()
      return
    }
    setStatus('Your details look good. This is a front-end demonstration, so your inquiry was not sent or stored.')
    setSentDemo(true)
  }

  const fieldProps = (name: FieldName) => ({
    id: name,
    name,
    value: fields[name],
    onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => updateField(name, event.target.value),
    'aria-invalid': Boolean(errors[name]),
    'aria-describedby': errors[name] ? `${name}-error` : undefined,
  })

  return (
    <>
      <form className="inquiry-form" onSubmit={handleSubmit} noValidate>
        <div className="form-grid">
          <div className="form-field">
            <label htmlFor="name">Full name <span>*</span></label>
            <input {...fieldProps('name')} autoComplete="name" placeholder="Your name" />
            {errors.name && <small className="field-error" id="name-error">{errors.name}</small>}
          </div>
          <div className="form-field">
            <label htmlFor="business">Business name <span>*</span></label>
            <input {...fieldProps('business')} autoComplete="organization" placeholder="Farm, pharmacy or business" />
            {errors.business && <small className="field-error" id="business-error">{errors.business}</small>}
          </div>
          <div className="form-field">
            <label htmlFor="phone">Phone number <span>*</span></label>
            <input {...fieldProps('phone')} autoComplete="tel" inputMode="tel" placeholder="+92 3xx xxxxxxx" />
            {errors.phone && <small className="field-error" id="phone-error">{errors.phone}</small>}
          </div>
          <div className="form-field">
            <label htmlFor="email">Email <span className="optional">Optional</span></label>
            <input {...fieldProps('email')} autoComplete="email" inputMode="email" placeholder="you@business.com" />
            {errors.email && <small className="field-error" id="email-error">{errors.email}</small>}
          </div>
          <div className="form-field form-wide">
            <label htmlFor="inquiry">Inquiry type <span>*</span></label>
            <div className="select-wrap">
              <select {...fieldProps('inquiry')}>
                <option value="">Choose an inquiry type</option>
                <option>Product information</option>
                <option>Catalog request</option>
                <option>Wholesale / distribution</option>
                <option>Other business inquiry</option>
              </select>
              <Icon name="chevron" size={17} />
            </div>
            {errors.inquiry && <small className="field-error" id="inquiry-error">{errors.inquiry}</small>}
          </div>
          <div className="form-field form-wide">
            <label htmlFor="message">How can we help? <span>*</span></label>
            <textarea {...fieldProps('message')} rows={4} placeholder="Tell us a little about what you are looking for…" />
            {errors.message && <small className="field-error" id="message-error">{errors.message}</small>}
          </div>
        </div>
        <div className="form-footer">
          <p className="form-caption"><span>*</span> Required fields. Demo submissions are not delivered or saved.</p>
          <button className="button button-primary" type="submit">{sentDemo ? 'Check another inquiry' : 'Review inquiry'} <Icon name="arrow" size={17} /></button>
        </div>
        {status && <p className={`form-status${sentDemo ? ' form-status-success' : ' form-status-error'}`} role="status"><Icon name={sentDemo ? 'check' : 'spark'} size={17} />{status}</p>}
      </form>
      <div className="whatsapp-fallback">
        <span className="whatsapp-icon"><Icon name="message" size={19} /></span>
        <div><strong>Prefer WhatsApp?</strong><small>{whatsappUrl ? 'Continue this inquiry in WhatsApp.' : 'WhatsApp is not configured yet.'}</small></div>
        {whatsappUrl
          ? <a className="text-link" href={whatsappUrl} target="_blank" rel="noopener noreferrer">Open WhatsApp <Icon name="arrow" size={15} /></a>
          : <a className="text-link" href="#inquiry-form">Use this form <Icon name="arrow" size={15} /></a>}
      </div>
    </>
  )
}
