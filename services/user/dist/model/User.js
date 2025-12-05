import mongoose, { Document, Schema } from 'mongoose';
const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true
    },
    instagram: {
        type: String,
        required: false
    },
    facebook: {
        type: String,
        required: false
    },
    linkedin: {
        type: String,
        required: false
    },
    bio: {
        type: String,
        required: false
    }
}, {
    timestamps: true,
});
const User = mongoose.model('User', schema);
export default User;
//# sourceMappingURL=User.js.map