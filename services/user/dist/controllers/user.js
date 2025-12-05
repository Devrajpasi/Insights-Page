import User from '../model/User.js';
import jwt from 'jsonwebtoken';
import TryCatch from '../utils/TryCatch.js';
import getBuffer from '../utils/dataUri.js';
import { v2 as cloudinary } from 'cloudinary';
export const loginUser = TryCatch(async (req, res) => {
    const { email, name, image } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
        user = await User.create({
            name,
            email,
            image
        });
    }
    const token = jwt.sign({ user }, process.env.JWT_SECRET, {
        expiresIn: '5d',
    });
    res.status(200).json({
        message: "User logged in successfully",
        token, user
    });
});
export const myProfile = TryCatch(async (req, res) => {
    const user = req.user;
    res.json(user);
});
export const getUserProfile = TryCatch(async (req, res) => {
    const user = await User.findById(req.params.id);
    ;
    if (!user) {
        res.status(404).json({ message: "User not found with this id" });
        return;
    }
    res.json(user);
});
export const updateUser = TryCatch(async (req, res) => {
    const { name, instagram, facebook, linkedin, bio } = req.body;
    const user = await User.findByIdAndUpdate(req.user?._id, {
        name,
        instagram,
        facebook,
        linkedin,
        bio
    }, { new: true });
    const token = jwt.sign({ user }, process.env.JWT_SECRET, {
        expiresIn: '5d',
    });
    res.json({
        message: "Profile updated successfully",
        token,
        user
    });
});
export const updateProfilePic = TryCatch(async (req, res) => {
    const file = req.file;
    if (!file) {
        res.status(400).json({ message: "Please upload a file" });
        return;
    }
    const fileBuffer = getBuffer(file);
    if (!fileBuffer || !fileBuffer.content) {
        res.status(400).json({ message: "failed to generate buffer" });
        return;
    }
    const cloud = await cloudinary.uploader.upload(fileBuffer.content, {
        folder: "blogs",
    });
    const user = await User.findByIdAndUpdate(req.user?._id, {
        image: cloud.secure_url
    }, { new: true });
    const token = jwt.sign({ user }, process.env.JWT_SECRET, {
        expiresIn: '5d',
    });
    res.json({
        message: "Profile Pic updated successfully",
        token,
        user
    });
});
//# sourceMappingURL=user.js.map