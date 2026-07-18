const fs = require('fs');
const path = require('path');

const files = ['app.js', 'data.js', 'index.html'];
const dir = '.';

files.forEach(file => {
  const filePath = path.join(dir, file);
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace Emojis with Phosphor HTML
  // Note: Since this is JS, replacing inside strings might be tricky, but in this case, we know they are used as HTML strings.
  content = content.replace(/??/g, '<i class=\"ph ph-note-pencil\"></i>');
  content = content.replace(/?/g, '<i class=\"ph ph-lightning\"></i>');
  content = content.replace(/??/g, '<i class=\"ph ph-qr-code\"></i>');
  content = content.replace(/?/g, '<i class=\"ph ph-check-circle\"></i>');
  content = content.replace(/??/g, '<i class=\"ph ph-bell-ringing\"></i>');
  content = content.replace(/??/g, '<i class=\"ph ph-timer\"></i>');
  content = content.replace(/???/g, '<i class=\"ph ph-shield-check\"></i>');
  content = content.replace(/??/g, '<i class=\"ph ph-rocket-launch\"></i>');

  fs.writeFileSync(filePath, content, 'utf8');
});
console.log('Done replacing emojis in app.js and data.js');
