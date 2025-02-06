 
import connectToDatabase from '../../../lib/mongodb';
import Whitelist from '../../../models/Whitelist';

export async function GET(req, res) {
  const { id } = req.query;
  await connectToDatabase();

  switch (req.method) {
    case 'PUT':
      try {
        const updatedEntry = await Whitelist.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedEntry) return res.status(404).json({ error: 'Entry not found' });
        res.status(200).json(updatedEntry);
      } catch (error) {
        res.status(500).json({ error: 'Failed to update entry' });
      }
      break;

    case 'DELETE':
      try {
        const deletedEntry = await Whitelist.findByIdAndDelete(id);
        if (!deletedEntry) return res.status(404).json({ error: 'Entry not found' });
        res.status(200).json({ message: 'Entry deleted' });
      } catch (error) {
        res.status(500).json({ error: 'Failed to delete entry' });
      }
      break;

    default:
      res.setHeader('Allow', ['PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
