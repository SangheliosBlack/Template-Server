import mongoose from "mongoose";
import { compare, genSalt, hash } from "bcrypt";

const { Schema, model } = mongoose;

const User_Schema = Schema({
    full_name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        unique: true,
        required: true
    },
    last_login_date:{
        type: Date,
        required:true,
        default: Date.now()
    },
    role:{
        type:String,
        required:true
    },
    online:{
        type:Boolean,
        required:true,
        default:false
    },
    fcmToken:{
      type:String,
      required: false,
      default: ""
    }
}, {
    timestamps: true
});

User_Schema.methods.toJSON = function () {
    const { __v, _id, password,createdAt,updatedAt,online,...object } = this.toObject();
    //object.uid = _id;
    object.id = _id;
    return object;
};

User_Schema.methods.validatePassword = async function (password) {
    return await compare(password, this.password);
};


User_Schema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) return next();

    try {
        const salt = await genSalt(8);
        const hashedPassword = await hash(user.password, salt);
        user.password = hashedPassword;
        next();
    } catch (error) {
        return next(error);
    }
});

User_Schema.statics.getFieldsInfo = function () {
    return Object.keys(this.schema.paths)
        .map(field => ({
            name: field,
            properties: this.schema.paths[field]
        }));
};

const User = model('users',User_Schema);

export default User;