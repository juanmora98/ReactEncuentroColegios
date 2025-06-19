// scripts/copy-module-html.js
const fs = require('fs');
const path = require('path');

const modules = [
  {
    source: 'src/pages/PagesDecanaturas/PagesIngSistemas/Activities/softwareDevAct/components/index.html',
    dest: 'build/diaIngeniero.html'
  }
];

modules.forEach(module => {
  if (fs.existsSync(module.source)) {
    fs.copyFileSync(module.source, module.dest);
    console.log(`✅ Copiado: ${module.source} → ${module.dest}`);
  }
});