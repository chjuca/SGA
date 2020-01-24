import Titulation from '../models/Titulation'
import Sequelize from 'sequelize';
const { Op } = require("sequelize");

export async function getAreas(req, res){

    try {
        const areas = await Titulation.findAll({
            where:{
                areaid: null
            }
        });
        res.json({
            data: areas
        })        
    } catch (error) {
        res.status(500).json({
            message: "Something goes wrong",
            error  
        })
    }
}

export async function getAreasAndTitulation(req, res){

    try { 
        const area = await Titulation.findAll({
            // where:{
            //     areaid: null
                
            // },
            // include: [{
            //     model: Titulation,
            //     as: 'titulaciones',
            //     where:{
            //         areaid: Sequelize.col('titulation.id')
            //     }
            // }]
        });
        return res.json({
           area
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Something goes wrong",
            error  
        })
    }
}

export async function createAreaOrTitulation(req, res) {
    
    const {name, description, areaid} = req.body;
    let areaidAux = null; 

    try {

        if(areaid){
            areaidAux = areaid; 
        }
        
        let newTitulation = await Titulation.create({
            name,
            description,
            areaid: areaidAux
        },{
            fields: ['name', 'description', 'areaid']
        });

        if(newTitulation){
            return res.json({
                message: "Titulation or Area created successfully",
                data: { newTitulation}
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