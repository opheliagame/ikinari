const fs = require('fs');
const path = require('path');
const ExifImage = require('exif').ExifImage;

// Function to recursively list all files in a directory
function listAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function (file) {
    if (fs.statSync(path.join(dirPath, file)).isDirectory()) {
      arrayOfFiles = listAllFiles(path.join(dirPath, file), arrayOfFiles);
    } else {
      arrayOfFiles.push(path.join(dirPath, file));
    }
  });

  return arrayOfFiles;
}

// Function to get EXIF data from an image file
function getExifData(filePath) {
  return new Promise((resolve, reject) => {
    try {
      new ExifImage({ image: filePath }, (error, exifData) => {
        if (error) {
          resolve({}); // Resolve with an empty object on error
        } else {
          // Get the image description (if available)
          const description = exifData.image.ImageDescription || "null";
          if(description != null) {
            const descriptions = description.split(/\r?\n/)
            resolve(descriptions)
          }
          else {
            resolve(description)
          }
        }
      });
    } catch (error) {
      resolve({}); // Resolve with an empty object on error
    }
  });
}

// Main function
async function main() {
  const directoryPath = process.argv[2];
  if (!directoryPath) {
    console.error('Please provide a directory path as an argument');
    process.exit(1);
  }

  const allFiles = listAllFiles(directoryPath);
  const allItems = [];

  for (const file of allFiles) {
    const descriptions = await getExifData(file);
    allItems.push({
      filePath: path.join('asset', 'original', path.basename(file)),
      thumbnailFilePath: path.join('asset', 'thumbnail', path.basename(file)),
      descriptions: descriptions,
    });
  }

  // Write the list of files and their descriptions to a JSON file
  const jsonFilePath = path.join(__dirname, 'files.json');
  fs.writeFileSync(jsonFilePath, JSON.stringify(allItems, null, 2));

  console.log(`List of files with EXIF data has been written to ${jsonFilePath}`);
}

// Execute the main function
main();