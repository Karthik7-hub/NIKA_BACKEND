import mongoose, { model } from 'mongoose';
const { Schema } = mongoose;

const folderSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    parentFolder: {
        type: Schema.Types.ObjectId,
        ref: 'Folder',
        default: null
    },
    items: [{
        itemType: {
            type: String,
            required: true,
            enum: ['Resource', 'Folder']
        },
        refId: {
            type: Schema.Types.ObjectId,
            required: true,
            refPath: 'items.itemType'
        },
        status: {
            type: String,
            enum: ['not started', 'ongoing_active', 'ongoing_inactive', 'completed'],
            default: 'not started'
        },
        note: {
            type: String
        }
    }],
    repository: {
        type: Schema.Types.ObjectId,
        ref: 'Repository',
        default: null
    }
}, { timestamps: true });

const Folder = model('Folder', folderSchema);
export default Folder;