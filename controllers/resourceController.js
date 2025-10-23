import ImageKit from "imagekit";
import fs from "fs";
import Resource from "../models/resourceModel.js";
import Folder from "../models/folderModel.js";

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

async function uploadResource(req, res) {
    try {
        const { title, type, link, parentFolderId } = req.body;
        if (!title) return res.status(400).send("Missing title");

        let fileUrl = null;
        let filePath = null;

        const file = req.file;

        if (file) {
            const folderCategory = file.mimetype.startsWith("image/")
                ? "images"
                : file.mimetype.startsWith("video/")
                    ? "videos"
                    : file.mimetype.includes("pdf")
                        ? "pdfs"
                        : "others";

            const folderName = `/${req.user.username}/${folderCategory}`;

            const fileBuffer = fs.readFileSync(file.path);

            const result = await imagekit.upload({
                file: fileBuffer,
                fileName: file.originalname,
                folder: folderName,
            });

            fileUrl = result.url;
            filePath = result.filePath;

            fs.unlinkSync(file.path);
        }
        else if (link) {
            fileUrl = link;
            filePath = link;
        }
        else {
            return res.status(400).send("No file or link provided");
        }

        const sourcetype = req.user.role === "student" ? "community" : "official";

        const resource = new Resource({
            title,
            type,
            owner: req.user._id,
            parentFolder: parentFolderId,
            source_type: sourcetype,
            filePath,
            fileUrl,
        });

        await resource.save();

        await Folder.findByIdAndUpdate(parentFolderId, {
            $push: {
                items: {
                    itemType: "Resource",
                    refId: resource._id,
                },
            },
        });

        res.json({ message: "Resource uploaded successfully", resource });
    } catch (err) {
        console.error("Upload error:", err);
        res.status(500).send("Upload failed");
    }
}

export { uploadResource };
