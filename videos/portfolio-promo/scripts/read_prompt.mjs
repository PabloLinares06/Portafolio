import fs from 'fs';

const content = fs.readFileSync('C:/Users/juanp/.gemini/antigravity-cli/brain/32ac0262-ca8e-4e65-823b-8f052737eb2c/.system_generated/logs/transcript_full.jsonl', 'utf8');
const lines = content.split('\n');
for (const line of lines) {
  if (line.includes('"step_index":847')) {
    const data = JSON.parse(line);
    fs.writeFileSync('videos/portfolio-promo/prompt.txt', data.content, 'utf8');
    console.log('Successfully written prompt.txt');
    break;
  }
}
