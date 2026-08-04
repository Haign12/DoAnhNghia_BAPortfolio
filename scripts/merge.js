const fs = require('fs');

// --- MERGE P1 DATA ---
let oldP1Data = fs.readFileSync('project1-expense-tracker/data.js', 'utf8');
let funcP1Data = fs.readFileSync('project1_functional_data.js', 'utf8');
// Remove the conflicting 'const subscriptions = [...]' from oldP1Data
oldP1Data = oldP1Data.replace(/const subscriptions = \[[\s\S]*?\];/m, '');
fs.writeFileSync('project1-expense-tracker/data.js', funcP1Data + '\n\n' + oldP1Data);

// --- MERGE P1 APP ---
let oldP1App = fs.readFileSync('project1-expense-tracker/app.js', 'utf8');
let funcP1App = fs.readFileSync('project1_functional_app.js', 'utf8');
fs.writeFileSync('project1-expense-tracker/app.js', oldP1App + '\n\n' + funcP1App);

// --- MERGE P3 DATA ---
let oldP3Data = fs.readFileSync('project3-office-order/data.js', 'utf8');
let funcP3Data = fs.readFileSync('project3_functional_data.js', 'utf8');
// Remove conflicting 'const foodMenu = [...]' and 'const staffMembers = [...]' from oldP3Data if they exist
oldP3Data = oldP3Data.replace(/const foodMenu = \[[\s\S]*?\];/m, '');
oldP3Data = oldP3Data.replace(/const staffMembers = \[[\s\S]*?\];/m, '');
oldP3Data = oldP3Data.replace(/const currentSession = \{[\s\S]*?\};/m, '');
fs.writeFileSync('project3-office-order/data.js', funcP3Data + '\n\n' + oldP3Data);

// --- MERGE P3 APP ---
let oldP3App = fs.readFileSync('project3-office-order/app.js', 'utf8');
let funcP3App = fs.readFileSync('project3_functional_app.js', 'utf8');
fs.writeFileSync('project3-office-order/app.js', oldP3App + '\n\n' + funcP3App);

console.log("Merge complete");
