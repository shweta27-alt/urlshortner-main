const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose')
const { geturlShortnerDb } = require('../../mongoose.init');
let urlShortnerDb = geturlShortnerDb();


const phoneNumber = new Schema({
    phoneNumber: {
        type: String,
        required: true,
    },
    countryCode: {
        type: Number,
        required: true,
    }
},
    { _id: false }
)

phoneNumber.index({countryCode:1,phoneNumber:1})
phoneNumber.index({phoneNumber:1},{unique:true})

const User = new Schema(
    {
        fullName: {
            type: String,
            required: true,
        },

        userName:{
            type: String,
            lowercase:true,
            trim:true
        },
        profilePic: {
            type: String,
            default: "https://res.cloudinary.com/dkidih85l/image/upload/v1675432668/effetpmpaazmw74g81pl.png"
        },

        profileBio: {
            type: String,
            default: "Hey there, I am using Chatify"
        },
        email: {
            type: String,
            lowercase:true,
            trim:true,
            required: true,

        },
        salt: {
            type: String,
            required: true,
        },
        hash: {
            type: String,
            required: true,
        },
        mobile: {
            type: [phoneNumber],
        },
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'modified_at' },
    }
);

User.index({fullName:1})
User.index({username:1})
User.index({email:1},{unique:true})


//passport local mongoose to add salt and hash password
User.plugin(passportLocalMongoose, {
    iterations: 1000,
    keylen: 256,
    usernameUnique: false,
    errorMessages: {
        NoSaltValueStoredError: 'No password is set for this account',
    },
});

User.statics.getUserByPhoneNumber = async function getUserByPhoneNumber(phoneNumber, countryCode) {
    const User = this.model("user")
    return User.findOne({ mobile: { $elemMatch: { phoneNumber: `${phoneNumber}`, countryCode: countryCode } } })

};

User.statics.getUserByEmail = async function getUserByEmail(emailAddress) {
    const User = this.model("user")
    return User.findOne({ email: `${emailAddress}` })
}

User.statics.getUserByQuery = async function getUserByQuery(query,userid) {
    const User = this.model("user")
    return User.find(query).find({_id:{$ne:userid}})
}

User.statics.resetPassword = async function resetPassword(username, password){
    const User = this.model("user")
    let query = {
        $or: [
          { mobile: { $elemMatch: { phoneNumber: `${username}` } } },
          { email: `${username}` },
        ],
      };

    return User.findOne(query).then((user)=>{
        if(user){
            return user.setPassword(password).then(()=>{
                return user.save()
            })
        }

        return Promise.reject("user not found")
    })
    
}


module.exports = urlShortnerDb.model('user', User);
