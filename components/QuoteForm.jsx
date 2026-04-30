'use client'
import { useState } from 'react'

export default function QuoteForm({ productName = '', productId = '', prefillService = '' }) {
  const [form, setForm] = useState({
    name: '', company: '', email: '', phone: '',
    quantity: '', message: '',
    product_name: productName,
    product_id: productId,
    service_type: prefillService || 'product',
  })
  const [status, setStatus] = useState('idle') // idle | loading | success | error

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  async function submit(e) {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="glass-panel p-10 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-green-400" />
        <div className="text-6xl mb-6 scale-110">🛰️</div>
        <h3 className="font-display text-3xl text-white uppercase tracking-tighter font-black mb-4">
          Transmission <span className="text-brand-orange">Successful</span>
        </h3>
        <p className="text-slate text-sm leading-relaxed font-medium mb-8">
          Thank you, <strong className="text-white">{form.name}</strong>. Your procurement request has been logged in our command system. 
          A logistics specialist will verify your specifications and respond to <strong className="text-white">{form.email}</strong> within 24 hours.
        </p>
        <button onClick={() => setStatus('idle')} className="btn-outline text-[10px] font-bold uppercase tracking-widest">
          Send Another Request
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-6">
      {/* Product context */}
      {productName && (
        <div className="bg-brand-orange/10 border border-brand-orange/30 px-5 py-4 rounded-lg">
          <div className="text-[10px] font-bold uppercase tracking-widest text-slate mb-1">Inquiry Specification</div>
          <div className="text-white font-display text-lg font-bold uppercase tracking-tight">{productName}</div>
        </div>
      )}

      {!productName && (
        <div className="flex flex-col gap-2">
          <label className="text-slate text-[10px] uppercase tracking-[0.2em] font-bold opacity-60">Service / Asset Category</label>
          <div className="relative group">
            <select className="input-field appearance-none cursor-pointer pr-10" value={form.product_name}
              onChange={set('product_name')}>
              <option value="">Select Category...</option>
              <optgroup label="Logistics Services">
                <option value="LCL Shipping">LCL Shipping (Consolidated)</option>
                <option value="FCL Shipping">FCL Shipping (Full Container)</option>
                <option value="Air Freight">Air Freight (Priority)</option>
                <option value="3PL Management">3PL / Managed Logistics</option>
              </optgroup>
              <optgroup label="Industrial Assets">
                <option value="Chemicals">Industrial Chemicals</option>
                <option value="Heavy Machinery">Heavy Machinery / Earthmoving</option>
                <option value="Commercial Vehicles">Commercial Fleet Vehicles</option>
                <option value="Other">Custom Procurement Request</option>
              </optgroup>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate/40 group-focus-within:text-brand-orange transition-colors">
              ▼
            </div>
          </div>
        </div>
      )}

      {/* Row 1 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-slate text-[10px] uppercase tracking-[0.2em] font-bold opacity-60">Authorized Contact *</label>
          <input className="input-field" placeholder="Full Name" value={form.name}
            onChange={set('name')} required />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-slate text-[10px] uppercase tracking-[0.2em] font-bold opacity-60">Organization *</label>
          <input className="input-field" placeholder="Company Legal Name" value={form.company}
            onChange={set('company')} required />
        </div>
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-slate text-[10px] uppercase tracking-[0.2em] font-bold opacity-60">Digital Address *</label>
          <input className="input-field" type="email" placeholder="corporate@email.com" value={form.email}
            onChange={set('email')} required />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-slate text-[10px] uppercase tracking-[0.2em] font-bold opacity-60">Comm Link *</label>
          <input className="input-field" type="tel" placeholder="Phone / WhatsApp" value={form.phone}
            onChange={set('phone')} required />
        </div>
      </div>

      {/* Quantity */}
      <div className="flex flex-col gap-2">
        <label className="text-slate text-[10px] uppercase tracking-[0.2em] font-bold opacity-60">
          Required Capacity / Quantity
        </label>
        <input className="input-field" placeholder="e.g. 10 Metric Tons / 2 Container Units"
          value={form.quantity} onChange={set('quantity')} />
      </div>

      {/* Message */}
      <div className="flex flex-col gap-2">
        <label className="text-slate text-[10px] uppercase tracking-[0.2em] font-bold opacity-60">
          Technical Specifications / Timeline
        </label>
        <textarea className="input-field resize-none h-32"
          placeholder="Describe your requirements in detail..."
          value={form.message} onChange={set('message')} />
      </div>

      <button type="submit" disabled={status === 'loading'}
        className="btn-brand h-14 border-0 cursor-pointer disabled:opacity-60
          disabled:cursor-not-allowed w-full text-center font-display tracking-widest text-xs font-bold uppercase">
        {status === 'loading' ? 'TRANSMITTING...' : 'INITIATE REQUEST →'}
      </button>

      {status === 'error' && (
        <p className="text-red-400 text-[10px] font-bold uppercase tracking-widest text-center">
          Transmission Failure. Use Priority Line for support.
        </p>
      )}

      <p className="text-slate/40 text-[9px] font-bold uppercase tracking-[0.2em] text-center">
        Secure encrypted transmission &middot; Industrial response protocol active
      </p>
    </form>
  )
}
