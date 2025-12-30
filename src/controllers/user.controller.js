import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req,res) => {
    console.log('------req.body started-----')
    console.log(req.body)
    console.log('------req.body ended-----')
    //step:1
    const {fullname,email, username,password} = req.body
    // console.log("email:",email);

    //step:2
    //validating any field is not empty
    if([fullname,email,username,password].some((field) => field?.trim() === "")){ // if after trimming as well any field is empty then return true the condition

        throw new ApiError(400,"All Fields are Required")

    //status code is must here to give , others if you wanna ow we set default in its class
    }

    //step-3
    //check duplicate user
    const existedUser = await User.findOne({
        $or: [{username},{email}]
    })

    if(existedUser) {
        throw new ApiError(409,"User with email or username already exists")
    }

    console.log('------req.files started-----')
    console.log(req.files)
    console.log('------req.files ended-----')

    //step-4 
    //check for images(avatar etc)
    const avatarLocalPath = req.files?.avatar[0]?.path;
    let coverImageLocalPath

    if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length>0){
        coverImageLocalPath = req.files.coverImage[0].path
    }

    if(!avatarLocalPath){
        throw new ApiError(400,"Avatar file is required")
    }

    //step-5
    // upload images to cloudinary
    //if we have not already prepared code to upload files on cloudinary.js we will have to write the code here itself that will be very bad.
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if(!avatar) {
        throw new ApiError(400,"Avatar file is required")
    }

    //step-6
    //user creation (entry in db),check created or not
    const user = await User.create({ //entry in db
        fullname,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",//we will store the url given by cloudinary to the database as strig
        email,
        password,
        username: username.toLowerCase()
    })

    //step-7
    //remove password and refresh token

    const createdUser = await User.findById(user._id).select("-password -refreshToken") //to remove the password and refreshtoken from return response
    
    //step-8
    // check whether user is created
    if(!createdUser){
        throw new ApiError(500,"Something went wrong while registering the user")
    }
    
    //step-9
    // sending response to user

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully")
    )





















    //dummy code
    // res.status(200).json({
    //     message:"ok"
    // })//we are sending this to user
})


export {registerUser}