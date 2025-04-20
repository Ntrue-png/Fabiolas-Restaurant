const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

const sizes = [
    { width: 800, suffix: '-800' },
    { width: 1200, suffix: '-1200' },
    { width: 1920, suffix: '-1920' }
];

async function optimizeImages() {
    const sourceDir = 'assets/images/original';
    const targetDir = 'assets/images/compressed';

    try {
        const files = await fs.readdir(sourceDir);
        
        for (const file of files) {
            if (file.match(/\.(jpg|jpeg|png)$/i)) {
                const sourcePath = path.join(sourceDir, file);
                const filename = path.parse(file).name;

                for (const size of sizes) {
                    const targetPath = path.join(
                        targetDir, 
                        `${filename}${size.suffix}.webp`
                    );

                    await sharp(sourcePath)
                        .resize(size.width, null, {
                            withoutEnlargement: true,
                            fit: 'inside'
                        })
                        .webp({ 
                            quality: 75,
                            effort: 6,
                            reductionEffort: 6
                        })
                        .toFile(targetPath);

                    console.log(`Ottimizzata: ${targetPath}`);
                }
            }
        }
    } catch (error) {
        console.error('Errore durante l\'ottimizzazione:', error);
    }
}

optimizeImages(); 