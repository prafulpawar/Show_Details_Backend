const multer = require('multer');
const path  = require('path');

//Storage Configuration

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./uploads')
    },
    filename:(req,file,cb)=>{
        const uniqueSuffix = Date.now()+'-' + Math.round(Math.random()*1E9);
        cb(null,file.fieldname+''+uniqueSuffix+path.extname(file.originalname))
    }
})

// const fileFilter = (req, file, cb) => {
//     const allowedTypes = /jpeg|jpg|png|gif/;
//     const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());
//     const mimeType = allowedTypes.test(file.mimetype);
  
//     if (extName && mimeType) {
//       cb(null, true);
//     } else {
//       cb(new Error('Only images are allowed!'));
//     }
//   };
  
  // Initialize multer
  const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    // fileFilter: fileFilter
  });
  
  module.exports = upload;