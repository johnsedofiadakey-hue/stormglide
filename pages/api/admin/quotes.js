import { getDbAdmin } from '@/lib/firebaseAdmin'

function isAdmin(req) {
  const auth = req.headers['x-admin-key']
  return auth === process.env.ADMIN_PASSWORD
}

export default async function handler(req, res) {
  if (!isAdmin(req)) return res.status(401).json({ error: 'Unauthorized' })

  const dbAdmin = getDbAdmin()
  if (!dbAdmin) return res.status(500).json({ error: 'Firestore Admin not initialized' })

  if (req.method === 'GET') {
    const { status } = req.query
    try {
      let query = dbAdmin.collection('quotes').orderBy('created_at', 'desc')
      if (status && status !== 'all') {
        query = query.where('status', '==', status)
      }
      const snapshot = await query.get()
      const quotes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      return res.status(200).json({ quotes })
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  if (req.method === 'PATCH') {
    try {
      const { id, status, admin_notes } = req.body
      if (!id) return res.status(400).json({ error: 'Quote ID required' })

      const update = {}
      if (status) update.status = status
      if (admin_notes !== undefined) update.admin_notes = admin_notes
      if (status === 'replied') update.replied_at = new Date().toISOString()

      await dbAdmin.collection('quotes').doc(id).update(update)
      const updated = await dbAdmin.collection('quotes').doc(id).get()
      return res.status(200).json({ quote: { id: updated.id, ...updated.data() } })
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
