import Credential from '../models/Credential';
const bcrypt = require('bcryptjs');

export async function getCredentials(req, res){
    try {
        const credentials = await Credential.findAll();
        res.json({
            data: credentials
        });
    } catch (error) {
        res.status(500).json({
            message: "Something goes wrong",
            error
        })
    }
}

export async function createCredential(req, res){                   

    const {email, password, ci} = req.body;

    try {

        let emailFound = await Credential.findOne({                 //agregar que la userid validacion
            where:{
                email
            }
        });
        if(emailFound){
            return res.status(400).json({
                message: "Ya existe la llave (email) = " + email
            })
        }

        let newCredential = await Credential.create({
            email,
            password: String(bcrypt.hashSync(password, 10)),
            userid: ci
        },{
            fields : ['email', 'password', 'userid'] 
        });
    
        if(newCredential){
            return res.json({
                message: "credentials created successfully",
                data : newCredential
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Something goes wrong',
            data : error
        })
    }
}

export async function getOneCredetential(req, res){
    
    const {ci} = req.params;

    try {
        const credential = await Credential.findOne({
            where:{
                userid: ci
            }
        });
        if(!credential){
            return res.status(400).json({
                message: "Credential with ci: " + ci + " does not exist.",
            })
        }
        res.json({
            message: "Credential gotten successfully ",
            data: credential
        }) 
    } catch (error) {
        res.status(500).json({
            message: "Something goes wrong",
            error
        })
    }

}

export async function deleteCredential(req, res){
    
    const { ci } = req.params;

    try {
        const deleteRowCount = await Credential.destroy({
            where:{
                userid: ci
            }
        });
        if(deleteRowCount === 0 ){
            return res.status(400).json({
                message: "Can't be deleted because the CI: "+ci + " does not exist",
                data: "Deleted rows " + deleteRowCount
            }) 
        }
        return res.json({
            message: "Credential deleted successfully",
            data: "Deleted rows " + deleteRowCount
        })
    } catch (error) {
        res.status(500).json({
            message: 'Something goes wrong',
            data : error
        })
    }

}

export async function updateCredential(req, res){

    const {ci} = req.params;
    const {email, password} = req.body                  //Que el usuario pueda modificar su email ?

    try {
        
        const updateRowCount = await Credential.update({
            email,
            password: String(bcrypt.hashSync(password, 10))
        }, {
            where:{
                userid : ci
            }
        });

        if(updateRowCount == 0 ){
            return res.status(400).json({
                message: "Can't be updated because the CI: "+ci + " does not exist",
                data: "Updated rows " + updateRowCount
            }) 
        }
        return res.json({
            message: "User updated successfully",
            data: "Updated rows " + updateRowCount
        })
    } catch (error) {
        res.status(500).json({
            message: 'Something goes wrong',
            data : error
        })
    }


}
