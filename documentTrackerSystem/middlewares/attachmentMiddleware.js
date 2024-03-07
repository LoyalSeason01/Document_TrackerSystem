const multer = require('multer');
const fs = require("fs");
const PATH = require('path');

const uploadsDirectory = PATH.join(__dirname, '../../uploads');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDirectory);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname;
        const filePath = PATH.join(uploadsDirectory, fileName);

        fs.access(filePath, fs.constants.F_OK, (err) => {
            if (err) {
                return cb(null, fileName);
            } else {

                let count = 1;
                let newFileName;
                const fileNameWithoutExt = PATH.parse(fileName).name;
                const fileExt = PATH.parse(fileName).ext;

                do {
                    newFileName = `${fileNameWithoutExt}(${count})${fileExt}`;
                    count++;
                } while (fs.existsSync(PATH.join(uploadsDirectory, newFileName)));

                return cb(null, newFileName);
            }
        });
    }
});



const fileFilter = (req, file, cb) => {
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

    if (!allowedTypes.includes(file.mimetype)) {
        const error = new Error("Invalid File Type");
        return cb(error, false);
    } else {
        cb(null, true); 
    }
};

const upload = multer({
    storage,
    limits: { fileSize: 1024 * 1024 * 3 }, 
    fileFilter: fileFilter,
}).single('file');

module.exports = upload;
