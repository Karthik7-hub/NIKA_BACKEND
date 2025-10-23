import mongoose, { model } from 'mongoose';
const { Schema } = mongoose;

const repositorySchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    description: String,
    visibility: {
        type: String,
        enum: ['private', 'public'],
        default: 'private'
    },
    source_type: {
        type: String,
        enum: ['community', 'official']
    },
    status: {
        type: String,
        enum: ['draft', 'pending', 'approved', 'rejected'],
        default: 'draft'
    },
    members: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        role: {
            type: String,
            enum: ['editor', 'viewer'],
            default: 'editor'
        }
    }],
    rating: {
        average: { type: Number, default: 0 },
        count: { type: Number, default: 0 }
    },
    forkInfo: {
        forkedFrom: { type: Schema.Types.ObjectId, ref: 'Repository' },
        forkCount: { type: Number, default: 0 }
    }
}, { timestamps: true });

const Repository = model('Repository', repositorySchema);
export default Repository;