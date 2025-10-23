import mongoose, { model } from 'mongoose';
const { Schema } = mongoose;

const repositoryReviewSchema = new Schema({
    repositoryId: {
        type: Schema.Types.ObjectId,
        ref: 'Repository',
        required: true
    },
    authorId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment: String
}, { timestamps: true });

const RepositoryReview = model('RepositoryReview', repositoryReviewSchema);
export default RepositoryReview;