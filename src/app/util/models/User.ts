import { Schema, model, models } from 'mongoose';
import { iUser } from '../Interfaces'

//comment
const userSchema = new Schema<iUser>({
    createdDate: {
        type: Date,
        immutable: true,
        default: () => Date.now(),
        required: true
    },
    avatar: {
        type: String
    },
    email: {
        type: String,
        unique: true,
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String
    },
}, { strict: true })
export default models.User || model('User', userSchema);

// export default model('Review', reviewSchema)
