const fs = require('fs');
const data = fs.readFileSync('wevitation.html', 'utf8');
const livewireRegex = /wire:initial-data="([^"]+)"/g;
let match;
const payloads = [];
while ((match = livewireRegex.exec(data)) !== null) {
  try {
    const jsonStr = match[1].replace(/&quot;/g, '"');
    payloads.push(JSON.parse(jsonStr));
  } catch (e) {
    console.error("Error parsing a payload", e);
  }
}
console.log('Found', payloads.length, 'Livewire components');
payloads.forEach((p, i) => {
  fs.writeFileSync('livewire_'+i+'.json', JSON.stringify(p, null, 2));
});
