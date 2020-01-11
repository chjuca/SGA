import Assets from '../models/Assets';
const cloudinary = require('cloudinary');
const fs = require('fs-extra');

cloudinary.config({
    cloud_name: 'sga-api',
    api_key: '521151622485177',
    api_secret: 'ebQ4wUgyTXsKc3Aqkbvt0Hz2hu8'
});

export async function createAsset(req, res) {

    const {categoryid} = req.body;

    try {
        const result = await cloudinary.v2.uploader.upload(req.file.path);      // Mostrar el tipo de error ?

        let uploadedImage = await Assets.create({
            imageurl: result.url,
            publicid: result.public_id,
            categoryid

        }, {
            fields: ['imageurl', 'publicid', 'categoryid']
            });
        await fs.unlink(req.file.path);             //Borrar el Archivo
        if (uploadedImage) {
            return res.json({
                message: "Image uploaded successfully",
                data: uploadedImage
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Something goes wrong',
            error
        })
    }

}

export async function getAssets(req, res){
    try {
        const assets = await Assets.findAll();
        res.json({
            data: assets
        })
    } catch (error) {
        res.status(500).json({
            message: "Something goes wrong",
            error  
        })
    }
}

export async function deleteAssets(req, res){
    
    const {publicId} = req.params;
    let deleteRowCount = 0;

    try{
        const result = await cloudinary.v2.uploader.destroy(publicId);

        if(result.result === 'ok'){
            deleteRowCount = await Assets.destroy({
                where:{
                    publicid: publicId
                }
            });
        }
        if(deleteRowCount === 0 ){
            return res.status(400).json({
                message: "Can't be deleted because this Asset does not exist",
                data: "Deleted rows " + deleteRowCount
            }) 
        }
        return res.json({
            message: "Asset deleted successfully",
            data: "Deleted rows " + deleteRowCount
        })

    }catch(error){
        res.status(500).json({
            message: "Something goes wrong",
            error  
        })
    }
}

export async function updateAsset(req, res){
    
    const {publicId} = req.params;

    try {
        const result = await cloudinary.v2.uploader.upload(req.file.path,{public_id: publicId, invalidate:true});

        await fs.unlink(req.file.path); 

        return res.json({
            message: "Asset updated successfully",
            data: "Updated Assets 1"
        }) 
    } catch (error) {
        res.status(500).json({
            message: "Something goes wrong",
            error  
        })
    }
}