import mongoose, { model } from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        enum: ['student', 'college_admin', 'platform_admin'],
        default: 'student'
    },
    institutionId: {
        type: Schema.Types.ObjectId,
        ref: 'Institution'
    },
    gamification: {
        points: {
            contributionPoints: { type: Number, default: 0 },
            reputationPoints: { type: Number, default: 0 }
        },
        earnedBadges: [{
            type: Schema.Types.ObjectId,
            ref: 'Badge'
        }]
    },
    statistics: {
        resourceCount: { type: Number, default: 0 },
        folderCount: { type: Number, default: 0 },
        repositoryCount: { type: Number, default: 0 },
        storageUsedMb: { type: Number, default: 0 }
    },
    rootFolder: {
        type: Schema.Types.ObjectId,
        ref: 'Folder',
        required: true
    }
}, { timestamps: true });

const User = model('User', userSchema);

export default User;