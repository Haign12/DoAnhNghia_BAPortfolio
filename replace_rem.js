const fs = require('fs');
const path = require('path');

// Fix Project 1 transactions.html
let p1Trans = 'project1-expense-tracker/transactions.html';
if (fs.existsSync(p1Trans)) {
  let content = fs.readFileSync(p1Trans, 'utf8');
  if (!content.includes('@phosphor-icons/web')) {
    content = content.replace('</head>', '  <script src=\"https://unpkg.com/@phosphor-icons/web\"></script>\n</head>');
  }
  content = content.replace(/<svg width=\"22\" height=\"22\" viewBox=\"0 0 24 24\".*?<path d=\"M12 2L2 7l10 5.*?<\/svg>/g, '<i class=\"ph ph-hexagon\" style=\"font-size: 22px;\"></i>');
  content = content.replace(/<svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\".*?<rect x=\"3\" y=\"3\".*?<\/svg>/g, '<i class=\"ph ph-squares-four\" style=\"font-size: 20px;\"></i>');
  content = content.replace(/<svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\".*?<polygon points=\"22 2 15 22 11 13 2 9 22 2\".*?<\/svg>/g, '<i class=\"ph ph-arrows-left-right\" style=\"font-size: 20px;\"></i>');
  content = content.replace(/<svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\".*?<line x1=\"18\" y1=\"20\".*?<\/svg>/g, '<i class=\"ph ph-chart-bar\" style=\"font-size: 20px;\"></i>');
  content = content.replace(/<svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\".*?<circle cx=\"12\" cy=\"12\" r=\"3\".*?<\/svg>/g, '<i class=\"ph ph-gear\" style=\"font-size: 20px;\"></i>');
  content = content.replace(/<svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\".*?<polyline points=\"22 12 18 12 15 21 9 3 6 12 2 12\".*?<\/svg>/g, '<i class=\"ph ph-trend-up\" style=\"font-size: 20px;\"></i>');
  content = content.replace(/<svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\".*?<line x1=\"19\" y1=\"12\".*?<\/svg>/g, '<i class=\"ph ph-arrow-left\" style=\"font-size: 20px;\"></i>');
  content = content.replace(/<svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\".*?<circle cx=\"11\" cy=\"11\" r=\"8\".*?<\/svg>/g, '<i class=\"ph ph-magnifying-glass\" style=\"font-size: 16px;\"></i>');
  content = content.replace(/<svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\".*?<path d=\"M11 4H4.*?<\/svg>/g, '<i class=\"ph ph-trash\" style=\"font-size: 14px;\"></i>');
  content = content.replace(/<svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\".*?<path d=\"M21 15v4a2 2 0 0 1-2 2H5.*?<\/svg>/g, '<i class=\"ph ph-download-simple\"></i>');
  content = content.replace(/<svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\".*?<line x1=\"12\" y1=\"5\" x2=\"12\" y2=\"19\".*?<\/svg>/g, '<i class=\"ph ph-plus\"></i>');
  content = content.replace(/<svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\".*?<path d=\"M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8\".*?<\/svg>/g, '<i class=\"ph ph-arrows-clockwise\" style=\"font-size: 20px;\"></i>');

  fs.writeFileSync(p1Trans, content, 'utf8');
}

// Fix Project 3 index.html
let p3Index = 'project3-office-order/index.html';
if (fs.existsSync(p3Index)) {
  let content = fs.readFileSync(p3Index, 'utf8');
  content = content.replace(/<svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\".*?<path d=\"M21 16V8a2 2 0 0 0-1-1.73l-7-4.*?<\/svg>/g, '<i class=\"ph ph-cube\" style=\"font-size: 20px;\"></i>');
  content = content.replace(/<svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\".*?<polyline points=\"6 9 12 15 18 9\".*?<\/svg>/g, '<i class=\"ph ph-caret-down\" style=\"font-size: 14px;\"></i>');
  fs.writeFileSync(p3Index, content, 'utf8');
}

