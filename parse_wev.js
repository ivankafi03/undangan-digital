const fs = require('fs');

const data = fs.readFileSync('wevitation.html', 'utf8');

// The catalog themes usually have a specific structure. Let's look for demo links or image sources.
const demoRegex = /href="\/demo\/([^"]+)"/g;
let match;
const demos = new Set();
while ((match = demoRegex.exec(data)) !== null) {
  demos.add(match[1]);
}

const imgRegex = /src="(https:\/\/app\.wevitation\.com\/storage\/themes\/thumbnail\/[^"]+)"/g;
const imgs = new Set();
while ((match = imgRegex.exec(data)) !== null) {
  imgs.add(match[1]);
}

console.log('Demos found:', Array.from(demos));
console.log('Images found:', Array.from(imgs));

// Maybe the theme titles are near the demo links.
// Let's print out the first few image URLs and demo slugs.
