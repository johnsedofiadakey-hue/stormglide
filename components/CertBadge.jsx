export default function CertBadge({ cert }) {
  const cls = cert.includes('ISO')  ? 'cert-iso'
            : cert.includes('ASTM') ? 'cert-astm'
            : cert.includes('CE')   ? 'cert-ce'
            : 'cert-other'
  return <span className={`cert-badge ${cls}`}>{cert}</span>
}
