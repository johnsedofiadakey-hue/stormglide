import { dbAdmin } from '@/lib/firebaseAdmin'

function isAdmin(req) {
  const auth = req.headers.get('x-admin-key')
  return auth === process.env.ADMIN_PASSWORD
}

// GET /api/admin/quotes — list all quotes
export async function GET(request) {
  if (!isAdmin(request)) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(request.url)
  const status = searchParams.get('status')

  try {
    let query = dbAdmin.collection('quotes').orderBy('created_at', 'desc')
    if (status && status !== 'all') {
      query = query.where('status', '==', status)
    }

    const snapshot = await query.get()
    const quotes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))

    return Response.json({ quotes })
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }
}

// PATCH /api/admin/quotes — update a quote status or notes
export async function PATCH(request) {
  if (!isAdmin(request)) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { id, status, admin_notes } = await request.json()
    if (!id) return Response.json({ error: 'Quote ID required' }, { status: 400 })

    const update = {}
    if (status) update.status = status
    if (admin_notes !== undefined) update.admin_notes = admin_notes
    if (status === 'replied') update.replied_at = new Date().toISOString()

    await dbAdmin.collection('quotes').doc(id).update(update)
    
    // Fetch updated doc to return
    const updated = await dbAdmin.collection('quotes').doc(id).get()

    return Response.json({ quote: { id: updated.id, ...updated.data() } })
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }
}
