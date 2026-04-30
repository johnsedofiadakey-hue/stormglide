'use client'
import { useState, useEffect, useCallback } from 'react'
import { products } from '@/lib/data/products'
import Link from 'next/link'

const ADMIN_KEY_STORAGE = 'sg_admin_key'

// ── HELPERS ──────────────────────────────────────────────────────────────────
function useAdminKey() {
  const [key, setKey] = useState('')
  useEffect(() => {
    const stored = sessionStorage.getItem(ADMIN_KEY_STORAGE)
    if (stored) setKey(stored)
  }, [])
  const save = (k) => { sessionStorage.setItem(ADMIN_KEY_STORAGE, k); setKey(k) }
  const clear = () => { sessionStorage.removeItem(ADMIN_KEY_STORAGE); setKey('') }
  return [key, save, clear]
}

function StatusBadge({ status }) {
  const cls = status === 'new' ? 'status-new'
            : status === 'replied' ? 'status-replied'
            : 'status-closed'
  return <span className={cls}>{status}</span>
}

const CAT_ICONS = { chem: '🧪', mach: '⚙️', veh: '🚛' }

// ── LOGIN ─────────────────────────────────────────────────────────────────────
function Login({ onLogin }) {
  const [pw, setPw] = useState('')
  const [error, setError] = useState(false)

  async function attempt() {
    const res = await fetch('/api/admin/quotes?status=new', {
      headers: { 'x-admin-key': pw }
    })
    if (res.ok) { onLogin(pw) }
    else { setError(true) }
  }

  return (
    <div className="min-h-screen bg-navy flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-orange/5 blur-[150px] rounded-full" />
      <div className="w-full max-w-sm relative z-10">
        <div className="flex flex-col items-center gap-3 mb-12">
          <div className="w-12 h-12 bg-brand-orange"
            style={{ clipPath: 'polygon(10% 0, 100% 0, 90% 100%, 0% 100%)' }} />
          <div className="flex flex-col items-center">
            <span className="font-display text-2xl tracking-tighter font-black text-white leading-none">
              STORM<span className="text-brand-orange">GLIDE</span>
            </span>
            <span className="text-[10px] tracking-[0.4em] font-bold text-slate uppercase mt-1">
              Command Portal
            </span>
          </div>
        </div>
        <div className="glass-panel p-10 relative">
          <div className="absolute top-0 left-0 w-1 h-full bg-brand-orange" />
          <h1 className="font-display text-2xl uppercase tracking-tighter font-bold mb-2">
            Authentication
          </h1>
          <p className="text-slate text-[10px] font-bold uppercase tracking-widest mb-8 opacity-60">Secure gateway Access Required</p>

          <div className="flex flex-col gap-4">
            <input
              type="password"
              className="input-field h-12"
              placeholder="Authorization Key"
              value={pw}
              onChange={e => { setPw(e.target.value); setError(false) }}
              onKeyDown={e => e.key === 'Enter' && attempt()}
            />
            {error && (
              <p className="text-red-400 text-[10px] font-bold uppercase tracking-widest">Invalid Authorization</p>
            )}
            <button className="btn-brand h-12 border-0 cursor-pointer text-xs font-bold
              tracking-widest uppercase" onClick={attempt}>
              Initiate Session
            </button>
          </div>
        </div>
        <div className="text-center mt-6">
          <Link href="/" className="text-slate/60 text-[10px] font-bold uppercase tracking-[0.2em] hover:text-white transition-colors no-underline">
            ← Return to Fleet
          </Link>
        </div>
      </div>
    </div>
  )
}

// ── DASHBOARD ─────────────────────────────────────────────────────────────────
function Dashboard({ quotes }) {
  const newCount     = quotes.filter(q => q.status === 'new').length
  const repliedCount = quotes.filter(q => q.status === 'replied').length
  const recent = quotes.slice(0, 5)

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end mb-10">
        <div>
          <p className="text-brand-orange text-[10px] font-bold uppercase tracking-[0.3em] mb-1">Operational Overview</p>
          <h2 className="font-display text-4xl uppercase font-black tracking-tighter">Command <span className="text-brand-orange">Center</span></h2>
        </div>
        <div className="text-right">
          <div className="text-white text-sm font-bold">{new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}</div>
          <div className="text-slate text-[10px] font-bold uppercase tracking-widest opacity-60">System Status: Optimal</div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        {[
          { label: 'Pending Requests', val: newCount, color: 'text-brand-orange', bg: 'bg-brand-orange/5' },
          { label: 'Total Enquiries', val: quotes.length, color: 'text-white', bg: 'bg-white/5' },
          { label: 'Active Catalog', val: products.length, color: 'text-white', bg: 'bg-white/5' },
          { label: 'Response Rate', val: quotes.length ? Math.round((repliedCount/quotes.length)*100)+'%' : '0%', color: 'text-green-400', bg: 'bg-green-400/5' },
        ].map(s => (
          <div key={s.label} className={`${s.bg} border border-white/5 p-6 rounded-xl group hover:border-brand-orange/30 transition-all`}>
            <div className="text-slate text-[10px] font-bold uppercase tracking-[0.2em] mb-2 opacity-60">{s.label}</div>
            <div className={`font-display text-4xl font-black ${s.color} group-hover:scale-105 transition-transform`}>{s.val}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        {/* Mock Chart Section */}
        <div className="lg:col-span-2 glass-panel p-8">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-display text-sm uppercase tracking-widest font-bold">Request Volume</h3>
            <div className="flex gap-2">
              <span className="w-2 h-2 bg-brand-orange rounded-full" />
              <span className="text-[10px] font-bold uppercase opacity-60">Last 7 Days</span>
            </div>
          </div>
          <div className="h-48 flex items-end justify-between gap-2 px-2">
            {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-3 group">
                <div 
                  className="w-full bg-brand-orange/20 border-t-2 border-brand-orange group-hover:bg-brand-orange/40 transition-all cursor-help"
                  style={{ height: `${h}%` }}
                  title={`${h} requests`}
                />
                <span className="text-[8px] font-bold text-slate uppercase">{['M','T','W','T','F','S','S'][i]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel p-8">
          <h3 className="font-display text-sm uppercase tracking-widest font-bold mb-8">Category Mix</h3>
          <div className="flex flex-col gap-6">
            {[
              { label: 'Chemicals', val: 45, color: 'bg-amber-400' },
              { label: 'Machinery', val: 35, color: 'bg-blue-400' },
              { label: 'Vehicles', val: 20, color: 'bg-green-400' },
            ].map(c => (
              <div key={c.label}>
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest mb-2">
                  <span className="text-slate">{c.label}</span>
                  <span className="text-white">{c.val}%</span>
                </div>
                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className={`h-full ${c.color}`} style={{ width: `${c.val}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent quotes */}
      <div className="glass-panel overflow-hidden">
        <div className="px-8 py-6 border-b border-white/5 flex items-center justify-between">
          <h3 className="font-display text-sm uppercase tracking-widest font-bold">Incoming Transmissions</h3>
          <Link href="#" className="text-brand-orange text-[10px] font-bold uppercase tracking-widest hover:underline">View All Requests</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-white/[0.02]">
                {['Client Entity','Organization','Product Spec','Timestamp','Status'].map(h => (
                  <th key={h} className="text-left px-8 py-4 text-slate text-[10px] tracking-[0.2em]
                    uppercase font-bold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recent.map(q => (
                <tr key={q.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                  <td className="px-8 py-5 text-white font-bold">{q.name}</td>
                  <td className="px-8 py-5 text-slate text-xs font-medium">{q.company}</td>
                  <td className="px-8 py-5 text-brand-orange text-[10px] font-bold uppercase tracking-wider">{q.product_name}</td>
                  <td className="px-8 py-5 text-slate text-[10px] font-bold uppercase">
                    {new Date(q.created_at).toLocaleDateString('en-GB',{day:'2-digit',month:'short'})}
                  </td>
                  <td className="px-8 py-5"><StatusBadge status={q.status} /></td>
                </tr>
              ))}
              {!recent.length && (
                <tr><td colSpan={5} className="px-8 py-16 text-slate text-center text-[10px] font-bold uppercase tracking-[0.2em]">
                  No active transmissions detected.
                </td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// ── QUOTES PANEL ──────────────────────────────────────────────────────────────
function QuotesPanel({ quotes, adminKey, onRefresh }) {
  const [filter, setFilter] = useState('all')
  const [selectedId, setSelectedId] = useState(null)
  const [notes, setNotes] = useState('')
  const [saving, setSaving] = useState(false)

  const filtered = filter === 'all' ? quotes
    : quotes.filter(q => q.status === filter)

  const selected = quotes.find(q => q.id === selectedId)

  async function updateStatus(id, status) {
    setSaving(true)
    await fetch('/api/admin/quotes', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'x-admin-key': adminKey },
      body: JSON.stringify({ id, status }),
    })
    await onRefresh()
    setSaving(false)
  }

  async function saveNotes() {
    setSaving(true)
    await fetch('/api/admin/quotes', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'x-admin-key': adminKey },
      body: JSON.stringify({ id: selectedId, admin_notes: notes }),
    })
    setSaving(false)
    await onRefresh()
  }

  useEffect(() => {
    if (selected) setNotes(selected.admin_notes || '')
  }, [selectedId, selected])

  return (
    <div>
      <h2 className="font-display text-2xl uppercase font-bold tracking-wide mb-6">Quote Requests</h2>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-5 flex-wrap">
        {['all','new','replied','closed'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-1.5 text-xs font-medium border rounded-sm transition-all cursor-pointer
              ${filter === f ? 'bg-gold/15 border-gold/50 text-gold' : 'bg-navy-3 border-border text-slate hover:text-white'}`}>
            {f.charAt(0).toUpperCase()+f.slice(1)}
            <span className="ml-1 opacity-60">
              ({f==='all' ? quotes.length : quotes.filter(q=>q.status===f).length})
            </span>
          </button>
        ))}
        <button onClick={onRefresh}
          className="ml-auto px-3 py-1.5 text-xs border border-border text-slate
            hover:text-white transition-colors cursor-pointer bg-transparent rounded-sm">
          ↻ Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr,380px] gap-6">
        {/* List */}
        <div className="bg-navy-3 border border-border rounded overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  {['Client','Company','Product','Qty','Date','Status',''].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-slate text-xs tracking-wider
                      uppercase font-semibold whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(q => (
                  <tr key={q.id}
                    onClick={() => setSelectedId(q.id)}
                    className={`border-b border-border/50 cursor-pointer transition-colors
                      ${selectedId === q.id ? 'bg-gold/5 border-l-2 border-l-gold' : 'hover:bg-navy/50'}`}>
                    <td className="px-4 py-3 text-white font-medium whitespace-nowrap">{q.name}</td>
                    <td className="px-4 py-3 text-slate text-xs whitespace-nowrap">{q.company}</td>
                    <td className="px-4 py-3 text-ice text-xs max-w-[160px] truncate">{q.product_name}</td>
                    <td className="px-4 py-3 text-slate text-xs whitespace-nowrap">{q.quantity || '—'}</td>
                    <td className="px-4 py-3 text-slate text-xs whitespace-nowrap">
                      {new Date(q.created_at).toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'2-digit'})}
                    </td>
                    <td className="px-4 py-3"><StatusBadge status={q.status} /></td>
                    <td className="px-4 py-3">
                      <button className="text-gold text-xs hover:underline cursor-pointer bg-transparent
                        border-0 p-0" onClick={e => { e.stopPropagation(); setSelectedId(q.id) }}>
                        Open →
                      </button>
                    </td>
                  </tr>
                ))}
                {!filtered.length && (
                  <tr><td colSpan={7} className="px-4 py-10 text-slate text-center text-sm">
                    No quotes with status: {filter}
                  </td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detail panel */}
        {selected ? (
          <div className="bg-navy-3 border border-border rounded p-5 flex flex-col gap-4">
            <div className="flex justify-between items-start">
              <div>
                <div className="font-display text-lg uppercase font-semibold">{selected.name}</div>
                <div className="text-slate text-xs">{selected.company}</div>
              </div>
              <StatusBadge status={selected.status} />
            </div>

            <table className="w-full text-xs">
              <tbody>
                {[
                  ['Product', selected.product_name],
                  ['Quantity', selected.quantity || '—'],
                  ['Email', selected.email],
                  ['Phone', selected.phone],
                  ['Date', new Date(selected.created_at).toLocaleString('en-GB')],
                ].map(([k,v]) => (
                  <tr key={k} className="border-b border-border/40">
                    <td className="py-2 text-slate w-24">{k}</td>
                    <td className="py-2 text-ice font-medium">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {selected.message && (
              <div>
                <div className="text-slate text-xs mb-1.5 uppercase tracking-wider">Message</div>
                <div className="bg-navy p-3 text-xs text-ice leading-relaxed">{selected.message}</div>
              </div>
            )}

            <div>
              <div className="text-slate text-xs mb-1.5 uppercase tracking-wider">Admin Notes</div>
              <textarea className="input-field text-xs resize-none h-20"
                placeholder="Internal notes, pricing, follow-up actions..."
                value={notes} onChange={e => setNotes(e.target.value)} />
            </div>

            <div className="flex gap-2 flex-wrap">
              <button className="btn-gold text-xs py-2 px-4 border-0 cursor-pointer"
                onClick={saveNotes} disabled={saving}>
                {saving ? 'Saving...' : 'Save Notes'}
              </button>
              {selected.status !== 'replied' && (
                <button className="text-xs py-2 px-4 bg-green-900/40 text-green-300
                  border border-green-700/40 cursor-pointer hover:bg-green-900/60 transition-colors"
                  onClick={() => updateStatus(selected.id, 'replied')}>
                  Mark Replied
                </button>
              )}
              {selected.status !== 'closed' && (
                <button className="text-xs py-2 px-4 bg-navy border border-border text-slate
                  cursor-pointer hover:text-white transition-colors"
                  onClick={() => updateStatus(selected.id, 'closed')}>
                  Close
                </button>
              )}
            </div>

            {/* Quick reply helper */}
            <div className="border-t border-border pt-3">
              <div className="text-slate text-xs mb-2 uppercase tracking-wider">Quick actions</div>
              <a href={`mailto:${selected.email}?subject=Re: Your enquiry for ${selected.product_name} — STORMGLIDE`}
                className="text-gold text-xs hover:underline no-underline block mb-1">
                ✉ Reply via email
              </a>
              <a href={`https://wa.me/${selected.phone.replace(/\D/g,'')}`}
                target="_blank" rel="noreferrer"
                className="text-gold text-xs hover:underline no-underline block">
                💬 Open WhatsApp
              </a>
            </div>
          </div>
        ) : (
          <div className="bg-navy-3 border border-border rounded p-8 flex items-center
            justify-center text-slate text-sm">
            ← Select a quote to view details
          </div>
        )}
      </div>
    </div>
  )
}

// ── PRODUCTS PANEL ────────────────────────────────────────────────────────────
function ProductsPanel({ adminKey }) {
  const [overrides, setOverrides] = useState({})
  const [saving, setSaving] = useState(null)
  const [toast, setToast] = useState('')

  useEffect(() => {
    fetch('/api/admin/products', { headers: { 'x-admin-key': adminKey } })
      .then(r => r.json())
      .then(d => {
        const map = {}
        ;(d.overrides || []).forEach(o => { map[o.id] = o })
        setOverrides(map)
      })
  }, [adminKey])

  async function toggleVisible(prod) {
    setSaving(prod.id)
    const current = overrides[prod.id]?.visible ?? true
    await fetch('/api/admin/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-admin-key': adminKey },
      body: JSON.stringify({ id: prod.id, visible: !current }),
    })
    setOverrides(prev => ({ ...prev, [prod.id]: { ...prev[prod.id], visible: !current } }))
    setToast(`${prod.name} ${!current ? 'shown' : 'hidden'} on catalog`)
    setSaving(null)
    setTimeout(() => setToast(''), 3000)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
        <h2 className="font-display text-2xl uppercase font-bold tracking-wide">Product Catalog</h2>
        <div className="text-slate text-xs border border-border px-3 py-1.5">
          {products.length} products · Edit lib/data/products.js to add new items
        </div>
      </div>

      {toast && (
        <div className="bg-green-900/30 border border-green-700/40 text-green-300 text-sm
          px-4 py-3 mb-4 rounded">
          ✓ {toast}
        </div>
      )}

      <div className="bg-navy-3 border border-border rounded overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              {['','Product','Category','Certifications','Availability','Visible on site',''].map(h => (
                <th key={h} className="text-left px-4 py-3 text-slate text-xs tracking-wider
                  uppercase font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products.map(p => {
              const visible = overrides[p.id]?.visible ?? true
              return (
                <tr key={p.id} className={`border-b border-border/50 transition-colors
                  ${!visible ? 'opacity-40' : 'hover:bg-navy/40'}`}>
                  <td className="px-4 py-3 text-xl">{CAT_ICONS[p.category]}</td>
                  <td className="px-4 py-3">
                    <div className="text-white font-medium text-xs">{p.name}</div>
                    <div className="text-slate text-xs mt-0.5">{p.subtitle}</div>
                  </td>
                  <td className="px-4 py-3 text-slate text-xs capitalize">{p.category}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {p.certifications.slice(0,2).map(c => (
                        <span key={c} className="text-xs border border-border text-slate px-1.5 py-0.5">
                          {c}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate text-xs">{p.availability}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggleVisible(p)}
                      disabled={saving === p.id}
                      className={`w-10 h-5 rounded-full border transition-all cursor-pointer
                        relative flex items-center
                        ${visible ? 'bg-gold border-gold/50' : 'bg-navy border-border'}`}>
                      <span className={`absolute w-3.5 h-3.5 bg-white rounded-full transition-all
                        ${visible ? 'left-[calc(100%-18px)]' : 'left-0.5'}`} />
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <Link href={`/catalog/${p.id}`} target="_blank"
                      className="text-gold text-xs hover:underline no-underline">
                      Preview →
                    </Link>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-4 bg-gold/5 border border-gold/20 px-5 py-4 text-xs text-slate leading-relaxed">
        <strong className="text-gold">To add a new product:</strong> Open{' '}
        <code className="bg-navy-3 px-1.5 py-0.5 text-ice">lib/data/products.js</code> in your editor
        and copy an existing product block, update the fields, and save. The new product will
        appear immediately on the catalog. No database changes needed — the file is the source of truth.
      </div>
    </div>
  )
}

// ── MAIN ADMIN PAGE ───────────────────────────────────────────────────────────
export default function AdminPage() {
  const [adminKey, saveKey, clearKey] = useAdminKey()
  const [page, setPage] = useState('dashboard')
  const [quotes, setQuotes] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchQuotes = useCallback(async (key = adminKey) => {
    if (!key) return
    setLoading(true)
    const res = await fetch('/api/admin/quotes', { headers: { 'x-admin-key': key } })
    if (res.ok) {
      const d = await res.json()
      setQuotes(d.quotes || [])
    }
    setLoading(false)
  }, [adminKey])

  useEffect(() => {
    if (adminKey) fetchQuotes(adminKey)
  }, [adminKey, fetchQuotes])

  if (!adminKey) return <Login onLogin={k => { saveKey(k); fetchQuotes(k) }} />

  const newCount = quotes.filter(q => q.status === 'new').length

  return (
    <div className="min-h-screen bg-navy flex">
      {/* Sidebar */}
      <aside className="w-64 bg-navy-2 border-r border-white/5 flex flex-col flex-shrink-0 relative z-30">
        <div className="px-8 py-10 border-b border-white/5">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-6 h-6 bg-brand-orange"
              style={{ clipPath: 'polygon(10% 0, 100% 0, 90% 100%, 0% 100%)' }} />
            <span className="font-display text-base tracking-tighter font-black">
              STORM<span className="text-brand-orange">GLIDE</span>
            </span>
          </div>
          <div className="text-slate text-[10px] font-bold uppercase tracking-[0.3em] opacity-40">Command Desk</div>
        </div>

        <nav className="flex-1 p-4 flex flex-col gap-2 mt-4">
          {[
            { id: 'dashboard', icon: '▣', label: 'Overview' },
            { id: 'quotes', icon: '✉', label: 'Transmissions', badge: newCount },
            { id: 'products', icon: '⊞', label: 'Fleet Inventory' },
          ].map(item => (
            <button key={item.id} onClick={() => setPage(item.id)}
              className={`flex items-center gap-3 px-4 py-3.5 text-[10px] font-bold uppercase tracking-[0.2em] text-left w-full
                rounded-xl transition-all cursor-pointer border-0
                ${page === item.id
                  ? 'bg-brand-orange text-white shadow-[0_0_20px_rgba(243,146,0,0.2)]'
                  : 'text-slate hover:bg-white/5 hover:text-white bg-transparent'
                }`}>
              <span className="text-sm opacity-50">{item.icon}</span>
              {item.label}
              {item.badge > 0 && (
                <span className="ml-auto bg-white/10 text-white text-[10px] font-bold
                  px-2 py-0.5 rounded-full min-w-[20px] text-center">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-white/5">
          <Link href="/" className="text-slate/60 text-[10px] font-bold uppercase tracking-widest hover:text-white transition-colors
            no-underline block mb-4">
            ← Operational Site
          </Link>
          <button onClick={clearKey}
            className="text-slate/40 text-[10px] font-bold uppercase tracking-widest hover:text-red-400 transition-colors cursor-pointer
              bg-transparent border-0 p-0">
            Terminate Session
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto p-8">
        {loading && page === 'dashboard' && (
          <div className="text-slate text-sm mb-4">Loading...</div>
        )}
        {page === 'dashboard' && <Dashboard quotes={quotes} />}
        {page === 'quotes'    && <QuotesPanel quotes={quotes} adminKey={adminKey} onRefresh={fetchQuotes} />}
        {page === 'products'  && <ProductsPanel adminKey={adminKey} />}
      </main>
    </div>
  )
}
