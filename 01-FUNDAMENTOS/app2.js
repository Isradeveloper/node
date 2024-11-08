const fs = require('fs');

const data = fs.readFileSync('README.md', 'utf8');

const newContent = data.replace(/React/ig, 'Vue');

fs.writeFileSync('README-Vue.md', newContent);

console.log(data);
