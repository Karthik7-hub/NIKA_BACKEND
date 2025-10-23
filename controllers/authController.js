import User from "../models/userModel.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Folder from "../models/folderModel.js";
import mongoose from "mongoose";

async function createUserWithTransaction(username, email, passwordHash, fullName, role) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const newUserId = new mongoose.Types.ObjectId();
        const newFolderId = new mongoose.Types.ObjectId();

        const newUser = new User({
            _id: newUserId,
            username: username,
            email: email,
            passwordHash: passwordHash,
            fullName: fullName,
            role: role,
            rootFolder: newFolderId
        });

        const rootFolder = new Folder({
            _id: newFolderId,
            name: `${username}-Root`,
            owner: newUserId,
            parentFolder: null
        });

        await newUser.save({ session });
        await rootFolder.save({ session });

        await session.commitTransaction();
        return newUser;

    } catch (error) {

        await session.abortTransaction();
        console.error('Error in transaction, rolling back:', error);
        throw error;
    } finally {
        session.endSession();
    }
}

async function register(req, res) {
    try {
        const body = req.body;
        if (!body || !body.username || !body.email || !body.password || !body.fullName || !body.role) {
            return res.status(400).json({ message: "details are misssing" });
        }
        const { username, email, password, fullName, role } = req.body;

        const passwordHash = await bcrypt.hash(password, 10);

        await createUserWithTransaction(username, email, passwordHash, fullName, role)

        res.status(201).json({ message: `User registered with username ${username}` });
    }

    catch (err) {
        console.log(err);
        res.status(501).json({ message: "server error" });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: `User with username ${username} not found` });
        }

        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) {
            return res.status(400).json({ message: `Invalid Credentails` });
        }
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.status(200).json({ message: "Successful login", token })
    }
    catch (err) {
        console.log(err);
        res
            .status(500)
            .json({ message: "something went wrong" });
    }
};


export { register, login };