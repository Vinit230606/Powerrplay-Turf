#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Remove conflicting lock files
const lockFiles = ['package-lock.json', 'yarn.lock'];
const rootDir = path.resolve(__dirname, '..');

lockFiles.forEach(file => {
  const filePath = path.join(rootDir, file);
  if (fs.existsSync(filePath)) {
    try {
      fs.unlinkSync(filePath);
      console.log(`✓ Removed ${file}`);
    } catch (err) {
      console.error(`Failed to remove ${file}:`, err.message);
    }
  }
});

console.log('✓ Preinstall checks passed');
