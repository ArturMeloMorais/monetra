const fs = require('fs');
const path = require('path');

const resetProject = () => {
  const directoriesToDelete = ['backend/db', 'src/components', 'src/screens'];

  directoriesToDelete.forEach(dir => {
    const dirPath = path.join(__dirname, '..', dir);
    if (fs.existsSync(dirPath)) {
      fs.rmdirSync(dirPath, { recursive: true });
      console.log(`Deleted directory: ${dirPath}`);
    }
  });

  console.log('Project has been reset.');
};

resetProject();