import Assets from '../models/Assets';
const cloudinary = require('cloudinary');
const fs = require('fs-extra');


cloudinary.config({
    cloud_name: 'sga-api',
    api_key: '521151622485177',
    api_secret: 'ebQ4wUgyTXsKc3Aqkbvt0Hz2hu8'
});

export async function createAsset(req, res) {

    const { categoryid, asseturl } = req.body;
    let url = asseturl.split("=");

    if (!asseturl) {
        try {
            const result = await cloudinary.v2.uploader.upload(req.file.path);      // Mostrar el tipo de error ?

            let uploadedAsset = await Assets.create({
                asseturl: result.url,
                publicid: result.public_id,
                categoryid

            }, {
                    fields: ['asseturl', 'publicid', 'categoryid']
                });
            await fs.unlink(req.file.path);             //Borrar el Archivo

            if (uploadedAsset) {
                return res.json({
                    message: "Asset uploaded successfully",
                    data: uploadedAsset
                })
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: 'Something goes wrong',
                error
            })
        }
    } else {
        if (url[1]) {
            try {
                let uploadedAsset = await Assets.create({
                    asseturl,
                    publicid: url[1],
                    categoryid
                }, {
                        fields: ['asseturl', 'publicid', 'categoryid']
                    });
                if (uploadedAsset) {
                    return res.json({
                        message: "Asset uploaded successfully",
                        data: uploadedAsset
                    })
                }
            } catch (error) {
                console.log(error);
                return res.status(500).json({
                    message: 'Something goes wrong',
                    error
                })
            }
        } else {
            return res.status(500).json({
                message: 'This is not a YouTube URL',
                error: {}
            })
        }




    }
}

export async function getAssets(req, res) {
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

export async function deleteAssets(req, res) {

    const { publicId } = req.params;
    let deleteRowCount = 0;

    try {
        const result = await cloudinary.v2.uploader.destroy(publicId);

        if (result.result === 'ok') {
            deleteRowCount = await Assets.destroy({
                where: {
                    publicid: publicId
                }
            });
        }
        if (deleteRowCount === 0) {
            return res.status(400).json({
                message: "Can't be deleted because this Asset does not exist",
                data: "Deleted rows " + deleteRowCount
            })
        }
        return res.json({
            message: "Asset deleted successfully",
            data: "Deleted rows " + deleteRowCount
        })

    } catch (error) {
        res.status(500).json({
            message: "Something goes wrong",
            error
        })
    }
}

export async function updateAsset(req, res) {

    const { publicId } = req.params;
    const { asseturl } = req.body;
    let url = asseturl.split("=");

    if (!asseturl) {
        try {
            const result = await cloudinary.v2.uploader.upload(req.file.path, { public_id: publicId, invalidate: true });

            await fs.unlink(req.file.path);
            console.log(result);
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
    } else {
        if (url[1]) {
            try {
                const updateRowCount = await Assets.update({
                    asseturl,
                    publicid: url[1],
                }, {
                        where: {
                            publicid: publicId
                        }
                    });
                if (updateRowCount == 0) {
                    return res.status(400).json({
                        message: "Can't be updated because the Asset does not exist",
                        data: "Updated rows " + updateRowCount
                    })
                }
                return res.json({
                    message: "Asset updated successfully",
                    data: "Updated rows " + updateRowCount
                })
            } catch (error) {
                console.log(error);
                res.status(500).json({
                    message: "Something goes wrong",
                    error
                })
            }
        } else {
            return res.status(500).json({
                message: 'This is not a YouTube URL',
                error: {}
            })
        }

    }
}

