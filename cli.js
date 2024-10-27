#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const templateDir = path.join(__dirname, 'templates');

const copyDirectory = (src, dest) => {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
};

const initProject = (projectName) => {
  const projectPath = path.join(process.cwd(), projectName);

  if (fs.existsSync(projectPath)) {
    console.error(`Project folder "${projectName}" already exists.`);
    process.exit(1);
  }

  fs.mkdirSync(projectPath);
  copyDirectory(templateDir, projectPath);

  console.log(`Project "${projectName}" created successfully!`);
};

// Command line handling
const args = process.argv.slice(2);
if (args[0] === 'init' && args[1]) {
  initProject(args[1]);
} else {
  console.log('Usage: npx reflect-cli init <project-name>');
}
