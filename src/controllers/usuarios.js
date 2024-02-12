const s3 = require("../config/s3.config.js");
const User = require('../models/user');
const mongoose = require('mongoose');
const path = require('path');
const fs = require("fs");

 var controller = {
    guardarFotoPerfil : async(req,res)=>{

        const usuario = await User.findById(req.uid);
        const ext = path.extname(req.file.path);
        const s3Client = s3.s3Client;
        var paramsDelete= {  Bucket:process.env.Bucket , Key: usuario.profilePhotoKey};
        const params = s3.uploadParams;
        
        fs.readFile(req.file.path,async function( err, data)  {
            
            params.Bucket      = process.env.Bucket,
            params.Key         = `storage/${usuario._id}/`+`profile_image_${Date.now()}`+ext,
            params.Body        = data,
            params.ContentType = req.file.mimetype
    
            const complete = new Promise((resolve)=>{

                s3Client.upload(params,(err,data)=>{

                     resolve(data);
                
                });
            
            });
        
            complete.then( async (newData)=>{
    
                if(usuario.profilePhotoKey){
    
                    const deleteComplete = new Promise((resolve)=>{

                        s3Client.deleteObject(paramsDelete,(err,data)=>{
                            resolve(data);
                        });

                    });
    
                    deleteComplete.then(async(deleteObject)=>{
    
                        await User.findByIdAndUpdate(req.uid,{$set:{profile_photo_key:newData.Key}});
    
                        return res.json({ok:true,url:newData.Key});
    
                    });
                    
                }else{
                    
                    await User.findByIdAndUpdate(req.uid,{$set:{profile_photo_key:newData.Key}});
        
                    return res.json({ok:true,url:newData.Key});
                    
                }
    
            });
    
        });
    
    } 
}

module.exports = controller 