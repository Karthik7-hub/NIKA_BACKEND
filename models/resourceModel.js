import mongoose, { model } from 'mongoose';
const { Schema } = mongoose;

const resourceSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: String,
    type: {
        type: String,
        enum: ['file', 'link', 'image'],
        required: true
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
    visibility: {
        type: String,
        enum: ['private', 'public'],
        default: 'private'
    },
    source_type: {
        type: String,
        enum: ['community', 'official']
    },
    filePath: {
        type: String,
        required: true
    },
    fileUrl: {
        type: String,
        required: true
    },
    metadata: {
        institution: { type: Schema.Types.ObjectId, ref: 'Institution' },
        subjects: [String],
        courseCode: String,
        professor: String,
        tags: [String]
    },
    discussionCount: { type: Number, default: 0 },
    reportCount: { type: Number, default: 0 }
}, { timestamps: true });

const Resource = model('Resource', resourceSchema);
export default Resource;