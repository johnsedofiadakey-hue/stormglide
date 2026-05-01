import { getDbAdmin } from '@/lib/firebaseAdmin'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const dbAdmin = getDbAdmin()
  if (!dbAdmin) return res.status(500).json({ error: 'Firestore Admin not initialized' })

  try {
    const { name, company, email, phone, product_id, product_name, quantity, message, service_type } = req.body

    // Validate required fields
    if (!name || !company || !email || !phone || !product_name) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    // Save to Firestore
    const quoteRef = await dbAdmin.collection('quotes').add({
      name,
      company,
      email,
      phone,
      product_id: product_id || '',
      product_name,
      quantity: quantity || '',
      message: message || '',
      service_type: service_type || 'product',
      status: 'new',
      admin_notes: '',
      created_at: new Date().toISOString()
    })

    // Send email notification
    await resend.emails.send({
      from: 'STORMGLIDE Portal <portal@stormglide.com>',
      to:   process.env.NOTIFY_EMAIL,
      subject: `New Quote Request: ${product_name} — ${company}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
          <div style="background:#06090F;padding:24px;margin-bottom:0">
            <h2 style="color:#E8A020;margin:0;font-family:sans-serif;letter-spacing:.05em">STORMGLIDE</h2>
            <p style="color:#8A9BBB;margin:4px 0 0;font-size:13px">New Quote Request</p>
          </div>
          <div style="border:1px solid #1E2D48;border-top:none;padding:24px;background:#0C1220">
            <table style="width:100%;font-size:14px;border-collapse:collapse">
              <tr><td style="padding:6px 0;color:#8A9BBB;width:140px">Product</td><td style="color:#F4F6FB;font-weight:600">${product_name}</td></tr>
              <tr><td style="padding:6px 0;color:#8A9BBB">Quantity</td><td style="color:#F4F6FB">${quantity || '—'}</td></tr>
              <tr><td style="padding:6px 0;color:#8A9BBB">Client</td><td style="color:#F4F6FB">${name}</td></tr>
              <tr><td style="padding:6px 0;color:#8A9BBB">Company</td><td style="color:#F4F6FB">${company}</td></tr>
              <tr><td style="padding:6px 0;color:#8A9BBB">Email</td><td style="color:#F4F6FB">${email}</td></tr>
              <tr><td style="padding:6px 0;color:#8A9BBB">Phone</td><td style="color:#F4F6FB">${phone}</td></tr>
              ${message ? `<tr><td style="padding:6px 0;color:#8A9BBB;vertical-align:top">Message</td><td style="color:#F4F6FB">${message}</td></tr>` : ''}
            </table>
          </div>
        </div>
      `,
    })

    return res.status(200).json({ success: true, id: quoteRef.id })

  } catch (err) {
    console.error('Quote API error:', err)
    return res.status(500).json({ error: 'Failed to submit quote' })
  }
}
