require('../config/config');
const jwt = require('jsonwebtoken');

//==============
//  Check Token
//==============

export let checkToken = (req, res, next) =>{

    let auth = req.get('authorization');

    jwt.verify(auth, process.env.SEED, (err, decoded)=>{
        if(err){
            return res.status(401).json({
                message : "Unauthorized",
                err: "Corrupted token"
            })
        }
        req.user = decoded.data;
        next();

    });

};


//==============
//  Check ROLE
//==============

export let checkRole = (req, res, next) =>{

    let user =  req.user;
    console.log(user);
    if(user.role == 4 ){              // Ahora solo es ADMIN
        next();
    }else{
        return res.status(400).json({
            ok: false,
            message: "The user is not an administrator"
        })
    }

};

//==============
//  Validate ROLE
//==============

// export let validateRole = (req, res, next)=>{

//     const {category} = req.body;
//     if(category === 'Role' || category === 'Keywords'){
//         next();
//     }else{
//         return res.status(400).json({
//             ok: false,
//             message: "That category does not exist"
//         })
//     }
// };