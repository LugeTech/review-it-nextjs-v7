import { Schema, model, models } from 'mongoose';
import { iReview, iUser, iComment, iProduct } from '../util/Interfaces'

//comment
const reviewSchema = new Schema<iReview>({
    createdDate: {
        type: Date,
        immutable: true,
        default: () => Date.now(),
        required: true
    },
    product: {
        type: String
    },
    user: {
        type: String
    },
    comments: [],
    rating: {
        type: Number
    },
    title: {
        type: String
    },
    body: {
        type: String
    },
    helpfulVotes: {
        type: Number
    },
    unhelpfulVotes: {
        type: Number
    },
}, { strict: true })
export default models.Review || model('Review', reviewSchema);

// export default model('Review', reviewSchema)
