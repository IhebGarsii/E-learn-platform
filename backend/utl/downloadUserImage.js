const { https } = require("follow-redirects"); // <-- use this instead of native https
const fs = require("fs");
const path = require("path");

const downloadGoogleImage = (url, filename) => {
  console.log(`Downloading image from URL: `);

  const folder = path.join(__dirname, "../uploads/users");
  const filepath = path.join(folder, filename);
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true });
  }

  return new Promise((resolve, reject) => {
    https
      .get(url, (response) => {
        if (response.statusCode !== 200) {
          return reject(
            new Error(`Failed to get image. Status: ${response.statusCode}`)
          );
        }

        const fileStream = fs.createWriteStream(filepath);
        response.pipe(fileStream);

        fileStream.on("finish", () => {
          fileStream.close();
          resolve(`users/${filename}`); // return relative path
        });

        fileStream.on("error", (err) => {
          fs.unlink(filepath, () => {}); // Delete file on error
          reject(err);
        });
      })
      .on("error", (err) => {
        reject(err);
        console.log(err);
      });
  });
};

module.exports = { downloadGoogleImage };
