const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: "onlineauction",
    api_key: "322784162348639",
    api_secret: "GXkgNyzRuP_ehnly_HGx8SQlXQg",
});

module.exports = { cloudinary };