import mongoose, { model } from 'mongoose';
const { Schema } = mongoose;

const repoItemSchema = new Schema({
    repositoryId: {
        type: Schema.Types.ObjectId,
        ref: 'Repository',
        required: true
    },

    parent: {
        type: Schema.Types.ObjectId,
        ref: 'RepoItem',
        default: null
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    itemType: {
        type: String,
        enum: ['Folder', 'Resource'],
        required: true
    },

    originalId: {
        type: Schema.Types.ObjectId,
        required: true

    },

    // ---'Folder' ---
    name: String,

    //---'Resource'---
    title: String,
    description: String,
    resourceType: String,
    filePath: String,
    fileUrl: String,
    metadata: {
        institution: { type: Schema.Types.ObjectId, ref: 'Institution' },
        subjects: [String],
        courseCode: String,
        professor: String,
        tags: [String]
    }

}, { timestamps: true });


repoItemSchema.index({ repositoryId: 1, parent: 1 });

const RepoItem = model('RepoItem', repoItemSchema);
export default RepoItem;