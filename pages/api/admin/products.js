import { getDbAdmin } from '@/lib/firebaseAdmin'

function isAdmin(req) {
  return req.headers['x-admin-key'] === process.env.ADMIN_PASSWORD
}

export default async function handler(req, res) {
  if (!isAdmin(req)) return res.status(401).json({ error: 'Unauthorized' })

  const dbAdmin = getDbAdmin()
  if (!dbAdmin) return res.status(500).json({ error: 'Firestore Admin not initialized' })

  if (req.method === 'GET') {
    try {
      const snapshot = await dbAdmin.collection('products_override').get()
      const overrides = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      return res.status(200).json({ overrides: overrides || [] })
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  if (req.method === 'POST') {
    try {
      const { id, ...rest } = req.body
      if (!id) return res.status(400).json({ error: 'ID required' })

      await dbAdmin.collection('products_override').doc(id).set({
        ...rest,
        updated_at: new Date().toISOString()
      }, { merge: true })

      const updated = await dbAdmin.collection('products_override').doc(id).get()
      return res.status(200).json({ override: { id: updated.id, ...updated.data() } })
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
