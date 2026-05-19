const https = require('https');

https.get('https://wevitation.com', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    // Find all image tags
    const imgRegex = /<img[^>]+src="([^">]+)"/g;
    let match;
    const images = new Set();
    while ((match = imgRegex.exec(data)) !== null) {
      if (match[1].includes('themes') || match[1].includes('thumbnail')) {
        images.add(match[1]);
      }
    }
    console.log("Found Theme Images:");
    console.log(Array.from(images));
  });
}).on('error', (err) => {
  console.log("Error: " + err.message);
});
