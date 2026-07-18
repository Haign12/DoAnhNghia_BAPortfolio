const fs = require('fs');
const path = require('path');

const files = ['index.html', 'dashboard.html', 'tenants.html', 'rooms.html'];
const dir = '.';

files.forEach(file => {
  const filePath = path.join(dir, file);
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace three dots SVG
  content = content.replace(/<svg.*?circle cx=\"12\" cy=\"12\".*?circle cx=\"12\" cy=\"5\".*?circle cx=\"12\" cy=\"19\".*?<\/svg>/g, '<i class=\"ph ph-dots-three-vertical\" style=\"font-size: 16px;\"></i>');

  // Replace building SVG
  content = content.replace(/<svg.*?rect x=\"3\" y=\"4\" width=\"18\" height=\"18\".*?<\/svg>/g, '<i class=\"ph ph-buildings\" style=\"font-size: 16px;\"></i>');

  // Replace group SVG
  content = content.replace(/<svg.*?circle cx=\"8.5\" cy=\"7\" r=\"4\".*?<\/svg>/g, '<i class=\"ph ph-users\" style=\"font-size: 24px; color: #fff;\"></i>');

  fs.writeFileSync(filePath, content, 'utf8');
});
