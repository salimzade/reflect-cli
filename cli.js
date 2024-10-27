#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const templateDir = path.join(__dirname, 'templates');

const initProject = (projectName) => {
  const projectPath = path.join(process.cwd(), projectName);
  
  if (fs.existsSync(projectPath)) {
    console.error(`Project folder "${projectName}" already exists.`);
    process.exit(1);
  }

  fs.mkdirSync(projectPath);
  fs.readdirSync(templateDir).forEach(file => {
    const srcFile = path.join(templateDir, file);
    const destFile = path.join(projectPath, file);
    fs.copyFileSync(srcFile, destFile);
  });

  console.log(`Project "${projectName}" created successfully!`);
};

const args = process.argv.slice(2);
if (args[0] === 'init' && args[1]) {
  initProject(args[1]);
} else {
  console.log('Usage: npx reflect-api init <project-name>');
}
