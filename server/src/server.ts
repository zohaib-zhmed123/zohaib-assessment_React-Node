import express from 'express';
import bodyParser from 'body-parser';
import crypto from 'crypto';
import cors from "cors"

// Simulating a database with an in-memory object
interface UrlEntry {
  slug: string;
  originalUrl: string;
}

const database: Record<string, UrlEntry> = {};

const app = express();
const port = 3000; // or any port you 

function generateSlug(length: number): string {
    let slug = '';
    const possibleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    // continuously generate slugs until a unique one is found
    while (!slug || database[slug]) {
      slug = Array.from(crypto.randomFillSync(new Uint8Array(length)))
        .map((byte) => possibleChars[byte % possibleChars.length])
        .join('');
    }
  
    return slug;
  }
app.use(bodyParser.json());
app.use(cors())

app.post('/shorten', (req, res) => {
    const { originalUrl } = req.body;
    if (!originalUrl) {
      return res.status(400).send({ error: 'Original URL is required' });
    }
      const slug = generateSlug(6);
    database[slug] = { slug, originalUrl };
    res.send({ slug, shortUrl: `https://short.ly/${slug}` });
  });

app.get('/:slug', (req, res) => {
  const { slug } = req.params;
  const entry = database[slug];
  if (entry) {
    res.send(entry.originalUrl);
  } else {
    res.status(404).send('Not Found');
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
