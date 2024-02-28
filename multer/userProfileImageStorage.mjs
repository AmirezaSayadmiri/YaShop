import multer from "multer";

const userProfileImageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/images/user-profiles");
    },
    filename: function (req, file, cb) {
        if (!["image/jpeg", "image/jpg", "image/png"].includes(file.mimetype)) {
            cb(new Error("invalid image format. Just jpeg or png"));
        }

        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + "-" + file.originalname);
    },
});

export default userProfileImageStorage;
