import fs from 'fs';
import path from 'path';
import sizeOf from 'image-size';
import exifReader from 'exifreader';
import sharp from 'sharp';

const repoFullName = process.env.GITHUB_REPOSITORY; // "username/repository"
if (repoFullName) {
  const repoName = repoFullName.split('/')[1]; // Extract the "repository" part
  const name = repoFullName.split('/')[1];
  console.log(`name:${name}`);

  const getFileStats = (filePath) => {
    const { size } = fs.statSync(filePath);
    const dimensions = sizeOf(filePath);
    return {
      width: dimensions.width,
      height: dimensions.height,
      fileSize: size
    };
  };

  const getFileExif = async (filePath) => {
    const tags = exifReader.load(filePath);
    if (tags['thumbnail']) {
      delete tags['thumbnail'];
    }
    if (tags['MakerNote']) {
      delete tags['MakerNote'];
    }
    return tags;
  }

  const ensureDirExists = (dirPath) => {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  };

  const raw2Dir = './public/photos/raw2/';
  const optimizedDir = './public/photos/optimized';
  const optimizedWidth = 1920;
  const thumbnailsDir = './public/photos/thumbnails';
  const thumbnailWidth = 250;

  const images = [];

  const processImages = async () => {
    ensureDirExists(optimizedDir);
    ensureDirExists(thumbnailsDir);

    const files = fs.readdirSync(raw2Dir).filter(file => /\.(png|jpg|jpeg)$/i.test(file));

    await Promise.all(files.map(async (file, index) => {
      const raw2Path = path.join(raw2Dir, file);
      const optimizedPath = path.join(optimizedDir, file);
      const thumbnailPath = path.join(thumbnailsDir, file);

      try {
        await sharp(raw2Path).resize(optimizedWidth).toFile(optimizedPath)
          .then(() => { console.log(`Optimized ${file} with quality: ${optimizedWidth} and saved to ${optimizedPath}`) })
          .catch(err => { console.error(`Error optimizing ${file}:`, err) });
        await sharp(raw2Path).resize(thumbnailWidth).toFile(thumbnailPath)
          .then(() => { console.log(`Thumbnailed ${file} with quality: ${thumbnailWidth} and saved to ${thumbnailPath}`) })
          .catch(err => { console.error(`Error thumbnailing ${file}:`, err) });

        const original = getFileStats(raw2Path);
        const thumbnail = getFileStats(thumbnailPath);
        const optimized = getFileStats(optimizedPath);
        const tags = getFileExif(raw2Path);

        const id = index + 1;
        images.push({
          id,
          name: file,
          title: file,
          description: file,
          isCover: id === 1,
          thumbnail,
          optimized,
          original,
          tags
        });
      } catch (err) {
        console.error(`Error processing ${file}:`, err);
      }
    }));

    images.sort((a, b) => a.id - b.id);
    fs.writeFileSync(path.join('public', 'photos', 'metadata.json'), JSON.stringify({
      name,
      offset: 0,
      images
    }), 'utf-8');

    console.log(`metadata.json generated successfully for ${images.length} images`);
  };

  processImages();
} else {
  console.error(`Missing GITHUB_REPOSITORY info in ${process.env.GITHUB_REPOSITORY} environment variable`);
}