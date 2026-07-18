const fs = require('fs');
const path = require('path');

const files = ['index.html', 'dashboard.html', 'tenants.html', 'rooms.html'];
const dir = '.';

files.forEach(file => {
  const filePath = path.join(dir, file);
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Add script if not exists
  if (!content.includes('@phosphor-icons/web')) {
    content = content.replace('</head>', '  <script src=\"https://unpkg.com/@phosphor-icons/web\"></script>\n</head>');
  }

  // Replace Back to Portfolio SVG
  content = content.replace(/<svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\".*?<line x1=\"19\" y1=\"12\".*?<\/svg>/g, '<i class=\"ph ph-arrow-left\" style=\"font-size: 20px;\"></i>');

  // Replace Search SVG
  content = content.replace(/<svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\".*?<circle cx=\"11\".*?<\/svg>/g, '<i class=\"ph ph-magnifying-glass\" style=\"font-size: 16px;\"></i>');

  // Replace Mail SVG
  content = content.replace(/<svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\".*?<path d=\"M4 4h16.*?<\/svg>/g, '<i class=\"ph ph-envelope-simple\" style=\"font-size: 16px;\"></i>');

  // Replace Bell SVG
  content = content.replace(/<svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\".*?<path d=\"M18 8A6 6 0 0 0 6 8.*?<\/svg>/g, '<i class=\"ph ph-bell\" style=\"font-size: 16px;\"></i>');

  // Replace Sort SVG
  content = content.replace(/<svg class=\"sort-icon\" width=\"14\" height=\"14\".*?<path d=\"M7 15l5 5 5-5\"\/><path d=\"M7 9l5-5 5 5\"\/><\/svg>/g, '<i class=\"ph ph-caret-up-down sort-icon\" style=\"font-size: 14px;\"></i>');

  // Any other SVGs in dashboard?
  // We will run this and see.

  fs.writeFileSync(filePath, content, 'utf8');
});
