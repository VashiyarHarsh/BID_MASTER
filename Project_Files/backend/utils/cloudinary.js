// config/cloudinary.js
const cloudinary = require('cloudinary').v2;
require('dotenv').config(); // Ensure dotenv is loaded to access environment variables

        cloudinary.config({
            cloud_name: "dlvff7ud6",
            api_key: "538367743384172",
            api_secret: "mB6uRUOaV86aO3iFcaJMe-NG8S4",
        });

        exports.uploadOnCloudinary = (fileBuffer, resourceType) => {
            return new Promise((resolve, reject) => {
              const uploadStream = cloudinary.uploader.upload_stream(
                { resource_type: resourceType },
                (error, result) => {
                  if (error) reject(error);
                  else resolve(result);
                }
              );
              uploadStream.end(fileBuffer);
          });
        };