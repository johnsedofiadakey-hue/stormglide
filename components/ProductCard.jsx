import Link from 'next/link';import CertBadge from './CertBadge'

const ICONS = {
  chem: '🧪',
  mach: '⚙️',
  veh:  '🚛',
}
const CAT_LABELS = { chem: 'Chemical', mach: 'Machinery', veh: 'Vehicle' }
const CAT_COLORS = {
  chem: 'bg-amber-900/30 text-amber-300',
  mach: 'bg-blue-900/30 text-blue-300',
  veh:  'bg-green-900/30 text-green-300',
}
const AVAIL_COLOR = (a) =>
  a.toLowerCase().includes('stock') ? 'text-green-400' :
  a.toLowerCase().includes('order') ? 'text-amber-400' : 'text-slate'

export default function ProductCard({ product }) {
  const { id, name, category, subtitle, certifications, availability } = product
  return (
    <Link href={`/catalog/${id}`} className="no-underline block h-full">
      <div className="card card-hover p-6 flex flex-col gap-4 h-full group cursor-pointer
        relative overflow-hidden transition-all duration-300">
        
        {/* Decorative corner */}
        <div className="absolute -top-10 -right-10 w-20 h-20 bg-brand-orange/10 rounded-full blur-2xl group-hover:bg-brand-orange/20 transition-all" />

        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 h-1 w-0 bg-brand-orange group-hover:w-full transition-all duration-500" />

        {/* Icon + category */}
        <div className="flex items-start justify-between relative">
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl shadow-lg
            ${CAT_COLORS[category] || 'bg-slate/20 text-white'}`}>
            {ICONS[category]}
          </div>
          <span className={`text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-widest ${CAT_COLORS[category]}`}>
            {CAT_LABELS[category]}
          </span>
        </div>

        {/* Name + subtitle */}
        <div>
          <h3 className="font-display text-lg font-bold uppercase tracking-tight
            leading-tight mb-2 text-white group-hover:text-brand-orange transition-colors duration-300">
            {name}
          </h3>
          <p className="text-slate text-xs leading-relaxed font-medium line-clamp-2">{subtitle}</p>
        </div>

        {/* Certs */}
        <div className="flex flex-wrap gap-1.5 mt-auto">
          {certifications.slice(0, 2).map(c => <CertBadge key={c} cert={c} />)}
          {certifications.length > 2 && (
            <span className="cert-badge cert-other">+{certifications.length - 2}</span>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-border/50">
          <div className="flex items-center gap-2">
            <div className={`w-1.5 h-1.5 rounded-full ${AVAIL_COLOR(availability).replace('text', 'bg')}`} />
            <span className={`text-[10px] font-bold uppercase tracking-wider ${AVAIL_COLOR(availability)}`}>
              {availability}
            </span>
          </div>
          <span className="text-brand-orange text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100
            group-hover:translate-x-1 transition-all">
            Inquire Now →
          </span>
        </div>
      </div>
    </Link>
  )
}
