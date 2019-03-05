const path = require('path');
const fs = require('fs');

const buildingPackage = process.cwd();
const rootPackage = path.resolve(buildingPackage, '..', '..');

const filesToCopy = ['LICENSE'];

function copyFiles() {
    filesToCopy.forEach((file) => {
        const srcPath = path.join(rootPackage, file);
        const destPath = path.join(buildingPackage, file);
        if (fs.existsSync(srcPath)) {
            if (!fs.existsSync(destPath)) {
                fs.copyFileSync(srcPath, destPath);
            } else {
                console.log(`${file} already present in destination folder, skipping`);
            }
        } else {
            console.warn(`${file} not found, skipping copy`);
        }
    });
}

copyFiles();
