const cloudinary = require("cloudinary").v2;

require('dotenv').config()

const cloud_name = process.env.CLOUD_NAME;
const api_key = process.env.API_KEY;
const api_secret = process.env.API_SECRET;



cloudinary.config({
    cloud_name ,
    api_key ,
    api_secret
});


const opts = {
  overwrite: true,
  invalidate: true,
  resource_type: "auto",
};


module.exports = (image) => {
  //imgage = > base64
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(image, opts, (error, result) => {
      if (result && result.secure_url) {
        return resolve(result.secure_url);
      }
      console.log(error.message);
      return reject({ message: error.message });
    });
  });
};