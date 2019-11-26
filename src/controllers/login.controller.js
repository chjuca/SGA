require('../config/config');
import Credential from '../models/Credential';
import User from '../models/User';
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


export async function login(req, res) {
    const { email, password } = req.body;

    const emailFound = await Credential.findOne({
        where: {
            email
        }
    })
    if (!emailFound) {
        return res.status(400).json({
            message: "The email or password is not correct",
            data: {}
        })
    }
    if (!(await bcrypt.compareSync(password, emailFound.password))) {
        return res.status(400).json({
            message: "The email or password is not correct",
            data: {}
        })
    }
    const userFound = await User.findOne({                      // devolver el usuario o las credenciales ?
        where: {
            ci: emailFound.userid,
            status: true
        }
    })

    if(!userFound){
        return res.status(400).json({
            message: "The User does not exist",
            data: {}
        })
    }

    let token = jwt.sign({
        data: userFound
    }, process.env.SEED, { expiresIn: process.env.TOKENEXPIRATION });

    res.json({
        message: "Welcome!",
        data: userFound,
        token
    })
};