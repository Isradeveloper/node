import { readFileSync } from 'fs';

const content = readFileSync('README.md', 'utf8');

const wordCount = content.split(' ').length;

const reactCount = content.match(/React/ig ?? []).length;

console.log(`The file has ${wordCount} words and ${reactCount} instances of the word 'React'`);
