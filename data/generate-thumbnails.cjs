const fs = require('fs-extra');
const path = require('path');
const sharp = require('sharp');

// Function to generate thumbnails
async function generateThumbnails(inputDir, outputDir, width = 200, height = 200) {
  // Ensure the output directory exists
  await fs.ensureDir(outputDir);

  // Read all files in the input directory
  const files = await fs.readdir(inputDir);

  // Filter for JPG images
  const jpgFiles = files.filter(file => path.extname(file).toLowerCase() === '.jpeg');

  // Process each JPG file
  for (const file of jpgFiles) {
    const inputFilePath = path.join(inputDir, file);
    const outputFilePath = path.join(outputDir, file);

    try {
      await sharp(inputFilePath)
        .resize(width, height)
        .toFile(outputFilePath);
      console.log(`Thumbnail generated for ${file}`);
    } catch (error) {
      console.error(`Error processing ${file}:`, error);
    }
  }
}

// Main function
async function main() {
  const inputDir = process.argv[2];
  const outputDir = process.argv[3];

  if (!inputDir || !outputDir) {
    console.error('Please provide input and output directories as arguments');
    process.exit(1);
  }

  try {
    await generateThumbnails(inputDir, outputDir);
    console.log('Thumbnails generation completed.');
  } catch (error) {
    console.error('Error generating thumbnails:', error);
  }
}

// Execute the main function
main();
