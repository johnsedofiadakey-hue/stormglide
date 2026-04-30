import { supabaseAdmin } from '@/lib/supabase'

function isAdmin(req) {
  return req.headers.get('x-admin-key') === process.env.ADMIN_PASSWORD
}

// GET — fetch all visibility overrides
export async function GET(req) {
  if (!isAdmin(req)) return Response.json({ error: 'Unauthorized' }, { status: 401 })
  const db = supabaseAdmin()
  const { data } = await db.from('products_override').select('*')
  return Response.json({ overrides: data || [] })
}

// POST — upsert a product override (toggle visible, update availability note)
export async function POST(req) {
  if (!isAdmin(req)) return Response.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()
  const db = supabaseAdmin()
  const { data, error } = await db
    .from('products_override')
    .upsert({ ...body, updated_at: new Date().toISOString() })
    .select().single()
  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json({ override: data })
}
