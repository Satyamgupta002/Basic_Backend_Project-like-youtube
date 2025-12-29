import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req,file,cb){
        cb(null,"./public/temp")
    },
    filename: function (req,file,cb) {
        cb(null,file.originalname) // you can later modify because files with same name
    } //we will get that name in response
})

export const upload = multer({
    storage,
})