import Folder from "../models/folderModel.js";
import Resource from "../models/resourceModel.js";

async function createFolder(req, res) {
    try {
        const { parentFolderId, folderName } = req.body;

        const folder = new Folder({
            name: folderName || `${req.user.username}-${parentFolderId}-subfolder`,
            owner: req.user._id,
            parentFolder: parentFolderId,
        });

        await folder.save();
        await Folder.findByIdAndUpdate(parentFolderId, {
            $push: {
                items: {
                    itemType: "Folder",
                    refId: folder._id
                }
            }
        });

        res.status(200).json({ message: "folder is created" });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "server error" });
    }
}


async function openFolder(req, res) {
    try {
        const { folder_id } = req.body;
        if (!folder_id) {
            return res.status(400).json({ message: "Missing folder ID" });
        }

        const folder = await Folder.findById(folder_id);
        if (!folder) {
            return res.status(404).json({ message: "Folder not found" });
        }

        const populatedItems = await Promise.all(
            folder.items.map(async (item) => {
                let data = null;

                if (item.itemType === "Folder") {
                    data = await Folder.findById(item.refId).select("name createdAt updatedAt");
                } else if (item.itemType === "Resource") {
                    data = await Resource.findById(item.refId).select("title type fileUrl source_type");
                }

                return {
                    itemType: item.itemType,
                    refId: item.refId,
                    status: item.status,
                    data,
                };
            })
        );

        res.json({
            folderId: folder._id,
            folderName: folder.name,
            items: populatedItems,
        });
    } catch (err) {
        console.error("Error opening folder:", err);
        res.status(500).json({ message: "Failed to open folder" });
    }
}

export { createFolder, openFolder };