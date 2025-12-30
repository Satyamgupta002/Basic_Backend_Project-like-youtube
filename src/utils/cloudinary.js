import {v2 as cloudinary} from "cloudinary"
import fs from "fs"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => { //it will be used when we have file on our local server because then only we will get the localFilepath
    try {
        if(!localFilePath) return null
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type: "auto"
        })
        //file is uploaded
        // console.log("file is uploaded on cloudinary")
        // console.log(response.url)
        fs.unlinkSync(localFilePath) //remove the locally saved temporary files as the operation got failed
        return response //to give the response to user
    } catch (error){
        fs.unlinkSync(localFilePath) //remove the locally saved temporary files as the operation got failed
        return null
    }
}

export {uploadOnCloudinary}