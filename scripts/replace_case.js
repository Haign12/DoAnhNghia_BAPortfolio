const fs = require('fs');
const path = require('path');

const files = ['case-study-p1.html', 'case-study-p2.html', 'case-study-p3.html', 'case-study-ux.html'];
const dir = '.';

files.forEach(file => {
  const filePath = path.join(dir, file);
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');

  // Add script if not exists
  if (!content.includes('@phosphor-icons/web')) {
    content = content.replace('</head>', '  <script src=\"https://unpkg.com/@phosphor-icons/web\"></script>\n</head>');
  }

  // Back button SVG in case studies: <svg width="20" height="20" ... <line x1="19" y1="12" ...
  content = content.replace(/<svg.*?<line x1=\"19\" y1=\"12\".*?<\/svg>/g, '<i class=\"ph ph-arrow-left\" style=\"font-size: 20px;\"></i>');

  fs.writeFileSync(filePath, content, 'utf8');
});
