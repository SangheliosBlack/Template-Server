const Usuario = require("../models/user")

const controller = {
    onlineUser : async (uid) => {
        await Usuario.findByIdAndUpdate(uid,{online:true});
    },
    offlineUser: async (uid) => {
        await Usuario.findByIdAndUpdate(uid,{online:false});
    },
}

module.exports = controller;