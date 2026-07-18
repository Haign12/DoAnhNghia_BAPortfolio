const fs = require('fs');
const path = require('path');

const files = ['index.html', 'app.js', 'data.js'];
const dir = '.';

files.forEach(file => {
  const filePath = path.join(dir, file);
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');

  // HTML head
  if (file === 'index.html' && !content.includes('@phosphor-icons/web')) {
    content = content.replace('</head>', '  <script src=\"https://unpkg.com/@phosphor-icons/web\"></script>\n</head>');
  }

  // Replace Emojis
  content = content.replace(/??/g, '<i class=\"ph ph-note-pencil\"></i>');
  content = content.replace(/?/g, '<i class=\"ph ph-lightning\"></i>');
  content = content.replace(/??/g, '<i class=\"ph ph-qr-code\"></i>');
  content = content.replace(/?/g, '<i class=\"ph ph-check-circle\"></i>');
  content = content.replace(/??/g, '<i class=\"ph ph-bell-ringing\"></i>');
  content = content.replace(/??/g, '<i class=\"ph ph-timer\"></i>');
  content = content.replace(/???/g, '<i class=\"ph ph-shield-check\"></i>');
  content = content.replace(/??/g, '<i class=\"ph ph-rocket-launch\"></i>');

  // Replace common SVGs in index.html
  if (file === 'index.html') {
    content = content.replace(/<svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\".*?<line x1=\"19\" y1=\"12\".*?<\/svg>/g, '<i class=\"ph ph-arrow-left\" style=\"font-size: 20px;\"></i>');
    content = content.replace(/<svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\".*?<circle cx=\"11\".*?<\/svg>/g, '<i class=\"ph ph-magnifying-glass\" style=\"font-size: 16px;\"></i>');
    content = content.replace(/<svg width=\"18\" height=\"18\" viewBox=\"0 0 24 24\".*?<path d=\"M18 8A6 6 0 0 0 6 8.*?<\/svg>/g, '<i class=\"ph ph-bell\" style=\"font-size: 18px;\"></i>');
  }

  fs.writeFileSync(filePath, content, 'utf8');
});
console.log('Project 3 replacement complete.');
