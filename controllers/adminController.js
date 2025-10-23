import Resource from "../models/resourceModel.js";

async function getResources(req, res) {
    try {
        if (req.user.role !== 'platform_admin') { return res.status(400).json({ message: "Access Denied" }) };
        const resources = await Resource.find({});
        console.log(resources);
        res.status(200).json(resources);
    } catch (err) {
        console.error(err);
        res.status(500).send("Failed to fetch files");
    }
}


async function statusDecision(req, res) {
    try {

        if (req.user.role !== "platform_admin") {
            return res.status(403).json({ message: "Access Denied" });
        }

        const resource_id = req.params.id;
        const { decision } = req.body;

        if (!resource_id || !decision) {
            return res.status(400).json({ message: "Resource ID and decision are required" });
        }

        const resource = await Resource.findById(resource_id);
        if (!resource) {
            return res.status(404).json({ message: "No resource found" });
        }

        resource.status = decision;
        await resource.save();

        res.status(200).json({ message: "Status updated successfully", resource });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to update resource status", error: err.message });
    }
}

export default statusDecision;


export { getResources, statusDecision };