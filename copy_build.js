import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcDir = path.join(__dirname, 'dist');
const destDir = path.join(__dirname, 'public_html');

try {
  if (fs.existsSync(srcDir)) {
    fs.copySync(srcDir, destDir, { overwrite: true });
    console.log('Successfully mirrored dist build output into public_html!');
  }
} catch (err) {
  console.error('Copy build error:', err);
}
