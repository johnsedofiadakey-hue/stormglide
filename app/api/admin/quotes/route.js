import { supabaseAdmin } from '@/lib/supabase'

function isAdmin(req) {
  const auth = req.headers.get('x-admin-key')
  return auth === process.env.ADMIN_PASSWORD
}

// GET /api/admin/quotes — list all quotes
export async function GET(request) {
  if (!isAdmin(request)) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(request.url)
  const status = searchParams.get('status')

  const db = supabaseAdmin()
  let query = db.from('quotes').select('*').order('created_at', { ascending: false })
  if (status && status !== 'all') query = query.eq('status', status)

  const { data, error } = await query
  if (error) return Response.json({ error: error.message }, { status: 500 })

  return Response.json({ quotes: data })
}

// PATCH /api/admin/quotes — update a quote status or notes
export async function PATCH(request) {
  if (!isAdmin(request)) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const { id, status, admin_notes } = await request.json()
  if (!id) return Response.json({ error: 'Quote ID required' }, { status: 400 })

  const update = {}
  if (status) update.status = status
  if (admin_notes !== undefined) update.admin_notes = admin_notes
  if (status === 'replied') update.replied_at = new Date().toISOString()

  const db = supabaseAdmin()
  const { data, error } = await db.from('quotes').update(update).eq('id', id).select().single()
  if (error) return Response.json({ error: error.message }, { status: 500 })

  return Response.json({ quote: data })
}
