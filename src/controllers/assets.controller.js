import Assents from '../models/Assets';
const cloudinary = require('cloudinary');
const fs = require('fs-extra');

cloudinary.config({
    cloud_name: 'sga-api',
    api_key: '521151622485177',
    api_secret: 'ebQ4wUgyTXsKc3Aqkbvt0Hz2hu8'
});

export async function createAssent(req, res) {

    const {categoryid} = req.body;

    try {
        const result = await cloudinary.v2.uploader.upload(req.file.path);      // Mostrar el tipo de error ?

        let uploadedImage = await Assents.create({
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

export async function getAssents(req, res){
    try {
        const assents = await Assents.findAll();
        res.json({
            data: assents
        })
    } catch (error) {
        res.status(500).json({
            message: "Something goes wrong",
            error  
        })
    }
}
