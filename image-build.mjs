import sharp from 'sharp';
import path from 'path';
import fs from 'fs/promises';

const buildVersion = '0.0.3';
const appname = 'IMAGE-BUILD';
const assetsPath = './static/assets';
const generatedPath = './static/generated';
const atlasFilePath = './assets/js/images.js';
const tempPath = './static/temp';

const atlasHeader = '/* This file is auto-generated by image-build.mjs */\r\nmodule.exports=';

const atlas = {
  buildVersion,
  images: []
};

const configs = [
  {
    name: 'large',
    type: 'webp',
    width: 1350,
    format: {
      quality: 75,
      smartSubsample: true,
      effort: 6
    }
  },
  {
    name: 'medium',
    type: 'webp',
    width: 675,
    format: {
      quality: 50,
      smartSubsample: true,
      effort: 6
    }
  },
  {
    name: 'thumb',
    type: 'webp',
    width: 60,
    format: {
      quality: 50,
      smartSubsample: true,
      effort: 6
    }
  }
];

const settings = {
  configs
};

async function execute() {
  const args = process.argv;
  log('Starting');
  if (args.length > 2) {
    // parse commands
    if (args[2].toLowerCase() === '--strip-exif') {
      log('Strip EXIF from SRC files.');
      stripExif();
    }
    return;
  }

  try {
    try {
      await fs.access(generatedPath);
      log('Deleting generated folder');
      await fs.rm(generatedPath, { recursive: true });
    } catch {
      // ignore error
    }

    await fs.mkdir(generatedPath);

    try {
      await fs.access(atlasFilePath);
      log('Deleting atlas file');
      await fs.rm(atlasFilePath, { recursive: true });
    } catch {
      // ignore error
    }

    log('Fetching images');
    await processImages(assetsPath);

    await makeDirectories(generatedPath);

    log('Processing images');
    const promises = [];
    atlas.images.map((image) => {
      promises.push(convertImage(image));
    });

    await Promise.all(promises);

    log('Saving atlas file');
    await writeAtlas(atlas, atlasFilePath);
  } catch (ex) {
    console.error('ERROR OCCURRED');
    console.error(ex);
  }

  log('FINISHED');
}

// copy images from /static/temp/... to /static/assets/... with exif data removed
async function stripExif() {
  log('Fetching images');
  await processImages(tempPath);

  await makeDirectories(assetsPath);

  log('Create EXIF-Free Images');
  const promises = [];
  atlas.images.map((image) => {
    promises.push(createExifFreeImage(image));
  });

  await Promise.all(promises);

  log('FINISHED');
}

function log(str) {
  // eslint-disable-next-line no-comment
  console.log(`${appname}: ${str}`);
}

async function makeDirectories(directoryPath) {
  const uniquePaths = [];

  for (let image of atlas.images) {
    if (!uniquePaths.includes(image.relativePath)) {
      uniquePaths.push(image.relativePath);
    }
  }

  for (let path of uniquePaths) {
    // make folders
    const outputPath = `${directoryPath}/${path}`;
    try {
      await fs.access(outputPath);
    } catch {
      log('Make directory ' + outputPath);
      await fs.mkdir(outputPath, { recursive: true });
    }
  }
}

async function processImages(directoryPath, relativePath = '') {
  try {
    const fullDirPath = path.join(directoryPath, relativePath);
    const files = await fs.readdir(fullDirPath, { withFileTypes: true });
    for (const file of files) {
      const relativeFilePath = path.join(relativePath, file.name);
      if (file.isDirectory()) {
        await processImages(directoryPath, relativeFilePath);
      } else if (isImageFile(file.name)) {
        atlas.images.push({
          name: file.name.split('.')[0],
          relativePath: relativePath.replaceAll('\\', '/'),
          src: `${directoryPath}/${relativeFilePath.replaceAll('\\', '/')}`
        });
      }
    }
  } catch (error) {
    console.error('Error processing images:', error);
  }
}

function isImageFile(fileName) {
  return /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(fileName);
}

async function writeAtlas(atlas, filePath) {
  try {
    for (let image of atlas.images) {
      delete image.relativePath;
    }

    let jsonString = JSON.stringify(atlas, null, 2);
    // remove ./static/ from the beginning of image paths
    jsonString = jsonString.replace(/\.?\/static\//g, '');
    await fs.writeFile(filePath, atlasHeader + jsonString);
  } catch (error) {
    console.error('Error writing Atlas file:', error);
  }
}

async function convertImage(image) {
  try {
    const fileStats = await fs.stat(image.src);
    const originalSize = fileStats.size;
    image.size = originalSize;

    const metadata = await sharp(image.src).metadata();
    image.width = metadata.width;
    image.height = metadata.height;

    const outputPath = `${generatedPath}/${image.relativePath}`;

    image.generated = {};

    const promises = [];

    for (let configIdx = 0; configIdx < configs.length; configIdx++) {
      const currentConfig = { ...settings.configs[configIdx] };
      const currentFormat = { ...currentConfig.format };

      image.generated[currentConfig.name] = {};

      if (currentConfig.type === 'png') {
        currentFormat.compressionLevel = (100 - currentFormat.quality) / 10;
        delete currentFormat.quality;
      } else {
        currentFormat.quality = currentFormat.quality;
      }

      let width = currentConfig.width < image.width ? currentConfig.width : image.width;

      const sharpImage = sharp(image.src).resize(width).toFormat(currentConfig.type, currentFormat);

      image.generated[
        currentConfig.name
      ].url = `${outputPath}/${image.name}_${currentConfig.name}.${currentConfig.type}`;

      if (currentConfig.name === 'thumb') {
        let outputImage = await sharpImage.toBuffer();
        const outputMetadata = await sharp(outputImage).metadata();
        image.generated[currentConfig.name].width = outputMetadata.width;
        image.generated[currentConfig.name].height = outputMetadata.height;
        image.generated[currentConfig.name].size = outputImage.length;
        outputImage = `data:image/${currentConfig.type};base64,` + outputImage.toString('base64');
        image.generated[currentConfig.name].data = outputImage;
      } else {
        const outputFilePath = `${outputPath}/${image.name}_${currentConfig.name}.${currentConfig.type}`;
        await sharpImage.toFile(outputFilePath);

        const outputMetadata = await sharp(outputFilePath).metadata();
        const outputStats = await fs.stat(outputFilePath);
        image.generated[currentConfig.name].width = outputMetadata.width;
        image.generated[currentConfig.name].height = outputMetadata.height;
        image.generated[currentConfig.name].size = outputStats.size;
      }
    }

    await Promise.all(promises);
  } catch (ex) {
    console.error('FAILED TO CONVERT IMAGE');
    console.error(ex);
  }
}

async function createExifFreeImage(image) {
  try {
    const outputPath = `${assetsPath}/${image.relativePath}`;
    const fileName = `${image.name}.webp`;

    const format = {
      quality: 90,
      smartSubsample: true,
      effort: 6
    };

    await sharp(image.src).toFormat('webp', format).toFile(`${outputPath}/${fileName}`);
  } catch (ex) {
    console.error('FAILED TO CONVERT IMAGE');
    console.error(ex);
  }
}

/* run the program */
await execute();
