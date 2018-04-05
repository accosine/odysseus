const gcs = require('@google-cloud/storage')();
const functions = require('firebase-functions');
const path = require('path');
const sharp = require('sharp');
const config = functions.config().application.images;

const addSizeSuffix = (name, suffix) => {
  const split = name.split('.');
  return (
    split.slice(0, split.length - 1).join('.') +
    suffix +
    '.' +
    split[split.length - 1]
  );
};

const streamAsPromise = stream =>
  new Promise((resolve, reject) =>
    stream.on('finish', resolve).on('error', reject)
  );

module.exports = ({
  metadata: fileMetadata,
  bucket: fileBucket,
  name: filePath,
  contentType,
}) => {
  // Exit if this is triggered on a file that is not an image.
  if (!contentType.startsWith('image/')) {
    console.log('This is not an image.');
    return null;
  }

  // Get the file name.
  const fileName = path.basename(filePath);

  // Exit if the image is already a thumbnail.
  if (fileMetadata.isResized) {
    console.log('Already resized.');
    return null;
  }

  // Download file from bucket.
  const bucket = gcs.bucket(fileBucket);

  const metadata = {
    metadata: {
      contentType,
      metadata: {
        isResized: true,
      },
    },
  };

  const pipeline = sharp();
  const promises = Promise.all(
    Object.keys(config).map(key => {
      const { width, suffix } = config[key];
      const thumbFilePath = path.join(
        path.dirname(filePath),
        addSizeSuffix(fileName, suffix)
      );
      const uploadStream = bucket
        .file(thumbFilePath)
        .createWriteStream(metadata);
      return streamAsPromise(
        pipeline
          .clone()
          .resize(Number(width))
          .pipe(uploadStream)
      );
    })
  );

  // pipe file through pipelines
  bucket
    .file(filePath)
    .createReadStream()
    .pipe(pipeline);

  return promises;
};
