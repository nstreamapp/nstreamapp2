import { VercelRequest, VercelResponse } from '@vercel/node';
import { main } from './rabbit';

// Vercel handler function
export default async function handler(req: VercelRequest, res: VercelResponse) {
  const mediaId = req.query.id as string;

  if (!mediaId) {
    return res.status(400).json({ error: 'Missing id parameter' });
  }

  try {
    const provider = 'rabbit';
    const result = await main(provider, mediaId);

    // Send back the result as a response
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

// Optional: Async decrypt function, though you might not need it if it's only used internally
async function decrypt(source: string) {
  return await main(source);
}
