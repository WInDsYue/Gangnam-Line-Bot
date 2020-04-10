import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

const paths = ['.env', '.env.local'];

for (const file of paths) {
  try {
    const content = fs.readFileSync(path.join(__dirname, '..', file));
    process.env = {
      ...process.env,
      ...dotenv.parse(content)
    };
  } catch {}
}
