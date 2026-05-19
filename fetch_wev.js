const https = require('https');
const fs = require('fs');

https.get('https://www.wevitation.com/katalog/9265C19JCT', (res) => {
  let data = '';
  res.on('data', c => data += c);
  res.on('end', () => {
    fs.writeFileSync('wevitation.html', data);
    console.log('Saved to wevitation.html, size: ' + data.length);
  });
}).on('error', console.error);
