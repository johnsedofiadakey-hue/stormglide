import { supabaseAdmin } from '@/lib/supabase'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request) {
  try {
    const body = await request.json()
    const { name, company, email, phone, product_id, product_name, quantity, message, service_type } = body

    // Validate required fields
    if (!name || !company || !email || !phone || !product_name) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Save to Supabase
    const db = supabaseAdmin()
    const { data, error } = await db
      .from('quotes')
      .insert([{ name, company, email, phone, product_id, product_name, quantity, message, service_type }])
      .select()
      .single()

    if (error) throw error

    // Send email notification to STORMGLIDE admin
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
            <div style="margin-top:20px;padding-top:16px;border-top:1px solid #1E2D48">
              <a href="${process.env.NEXT_PUBLIC_SITE_URL}/admin/quotes" 
                 style="background:#E8A020;color:#06090F;padding:10px 20px;text-decoration:none;font-weight:600;font-size:13px">
                View in Admin Portal →
              </a>
            </div>
          </div>
        </div>
      `,
    })

    // Auto-reply to client
    await resend.emails.send({
      from: 'STORMGLIDE <info@stormglide.com>',
      to:   email,
      subject: `Your enquiry has been received — STORMGLIDE`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
          <div style="background:#06090F;padding:24px">
            <h2 style="color:#E8A020;margin:0;font-family:sans-serif">STORMGLIDE</h2>
            <p style="color:#8A9BBB;margin:4px 0 0;font-size:13px">Enterprise Logistics & Supply Solutions</p>
          </div>
          <div style="padding:24px;background:#0C1220;border:1px solid #1E2D48;border-top:none">
            <p style="color:#F4F6FB;margin:0 0 16px">Dear ${name},</p>
            <p style="color:#8A9BBB;line-height:1.7;margin:0 0 16px">
              Thank you for your enquiry regarding <strong style="color:#F4F6FB">${product_name}</strong>. 
              We have received your request and our team will respond within <strong style="color:#E8A020">24 hours</strong> 
              with pricing, availability, and shipping details.
            </p>
            <p style="color:#8A9BBB;line-height:1.7;margin:0 0 16px">
              For urgent requirements, reach us directly on WhatsApp.
            </p>
            <p style="color:#C8D8F0;margin:0">Best regards,<br><strong>STORMGLIDE Supply Team</strong><br>
            <span style="color:#8A9BBB;font-size:13px">Accra, Ghana</span></p>
          </div>
        </div>
      `,
    })

    return Response.json({ success: true, id: data.id })

  } catch (err) {
    console.error('Quote API error:', err)
    return Response.json({ error: 'Failed to submit quote' }, { status: 500 })
  }
}
