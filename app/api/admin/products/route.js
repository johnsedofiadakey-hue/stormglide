import { dbAdmin } from '@/lib/firebaseAdmin'

function isAdmin(req) {
  return req.headers.get('x-admin-key') === process.env.ADMIN_PASSWORD
}

// GET — fetch all visibility overrides
export async function GET(req) {
  if (!isAdmin(req)) return Response.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const snapshot = await dbAdmin.collection('products_override').get()
    const overrides = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    return Response.json({ overrides: overrides || [] })
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }
}

// POST — upsert a product override (toggle visible, update availability note)
export async function POST(req) {
  if (!isAdmin(req)) return Response.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const body = await req.json()
    const { id, ...rest } = body
    if (!id) return Response.json({ error: 'ID required' }, { status: 400 })

    await dbAdmin.collection('products_override').doc(id).set({
      ...rest,
      updated_at: new Date().toISOString()
    }, { merge: true })

    const updated = await dbAdmin.collection('products_override').doc(id).get()
    return Response.json({ override: { id: updated.id, ...updated.data() } })
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }
}
