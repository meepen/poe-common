// Scrapes the URL https://www.pathofexile.com/developer/docs/reference#types
// and converts the types to TypeScript interfaces.

// import axios from 'axios';
import { createWriteStream } from 'fs';
import { readFile } from 'fs/promises';
import { ObjectTypeDetails } from './object-type-details.js';
import { htmlToData } from './html-to-data.js';
import { ScrapeTypesManager } from './types-manager.js';

const BASE_URL = 'https://www.pathofexile.com/developer/docs/reference#types';
const OUTPUT_FILE = './src/poe.ts';
const outStream = createWriteStream(OUTPUT_FILE);

// const response = (await axios.get(BASE_URL)).data;
const response = await readFile('./docs/docs.htm', 'utf-8');

const allObjects = htmlToData(response);

outStream.write(`// This file is auto-generated from ${BASE_URL}\n\n`);

const typesManager = new ScrapeTypesManager(allObjects);
for (const type of typesManager.generateTypeScriptTypes()) {
    outStream.write(type);
}