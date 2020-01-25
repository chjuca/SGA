import Sequelize from 'sequelize';
import User from '../models/User';
import Category from '../models/Category';
import Titulation from '../models/Titulation';
import Credential from '../models/Credential';
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

export async function getUsers(req, res) {
    try {
        const users = await User.findAll({
            where:{
                status: true
            },
            attributes:['ci', 'name', 'lastname', 'dateofbirth', 'status']
            ,
            include: [{
                model: Category,
                as: 'rol',
                attributes:['id', 'name']
            },{
               model: Titulation,
               attributes:['id', 'name'] 
            }]
        });
        res.json({
            data: users
        });
    } catch (error) {
        res.status(500).json({
            message: "Something goes wrong",
            error
        })
    }
}

export async function createUser(req, res) {

    const { ci, name, lastname, dateofbirth, role, titulationid, email, password } = req.body;
    try {

       let emailFound = await Credential.findOne({
            where: {
                email
            }
        });
        if (emailFound) {
            return res.status(400).json({
                "message": "Something goes wrong",
                "data": "Ya existe la llave (email) = " + email
            })
        }

        let newUser = await User.create({
            ci,
            name,
            lastname,
            dateofbirth,
            role,
            titulationid
        }, {
                fields: ['ci', 'name', 'lastname', 'dateofbirth', 'role','titulationid']
            });

        let newCredential = await Credential.create({
            email,
            password: String(bcrypt.hashSync(password, 10)),                    // traer metodo desde controller o dejarlo aqui?
            userid: ci
        }, {
                fields: ['email', 'password', 'userid']
            });

            let contentHTML = `
            <h1>USER  INFROMATION</h1>
            <ul>
                <li>Cedula: ${ci}</li>
            </ul>
            <p>FUNCIONA :D</p>
        `;

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth:{
                user: process.env.USER,
                pass: process.env.PASS
            }
        });

        if (newUser) {

            const info = await transporter.sendMail({
                from: "'Ascendere' <ascenderetest@gmail.com>",
                to: email,
                subject: 'Reseteo de Contraseña',
                text: 'Holi Desde el backend'
            })

            console.log('Mensaje Enviado', info.messageId);

            return res.json({
                message: "User created successfully",
                data: newUser
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

export async function getOneUser(req, res) {

    const { ci } = req.params;

    try {
        const user = await User.findOne({
            where: {
                ci , 
                status: true
            }
        });
        if (!user) {
            return res.status(400).json({
                message: "User with ci: " + ci + " does not exist.",
            })
        }
        res.json({
            message: "User gotten successfully ",
            data: user
        })
    } catch (error) {
        res.status(500).json({
            message: "Something goes wrong",
            error
        })
    }
}

export async function deleteUser(req, res) {

    const { ci } = req.params;

    try {
        const deleteRowCount = await User.update({
            status : false
        },{
            where: {
                ci,
                status: true
            }
        });
        if (deleteRowCount === 0) {
            return res.status(400).json({
                message: "Can't be deleted because the CI: " + ci + " does not exist",
                data: "Deleted rows " + deleteRowCount
            })
        }
        res.json({
            message: "User deleted successfully",
            data: "Deleted rows" + deleteRowCount
        })
    } catch (error) {
        res.status(500).json({
            message: 'Something goes wrong',
            data: error
        })
    }
}

export async function updateUser(req, res) {

    const { ci } = req.params;
    const { name, lastname, dateofbirth, role, titulationid } = req.body                  //Que el usuario pueda modificar su email y su rol ?

    // const userFound = await User.findOne({
    //     atributes: ["name", "lastname", "dateofbirth", "role"],
    //     where:{
    //         ci
    //     }
    // });
    // if(!userFound){
    //     return res.status(400).json({
    //         message: "usuario con ci:"+ ci+"no existe"
    //     })
    // }

    try {
        const updateRowCount = await User.update({
            name,
            lastname,
            dateofbirth,
            role,
            titulationid
        }, {
                where: {
                    ci,
                    status: true
                }
            });
        if (updateRowCount == 0) {
            return res.status(400).json({
                message: "Can't be updated because the CI: " + ci + " does not exist",
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
            data: error
        })
    }
}

export async function countUsers(req, res){

    try{
        const userCount = await User.findAll({
            attributes: [[Sequelize.fn('COUNT', Sequelize.col('ci')), 'count']]
          });
          return res.json({
            userCount
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            message: 'Something goes wrong',
            data: error
        })
    }
}