import Titulation from '../models/Titulation'

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

export async function getTitulationsbyArea(req, res){

    const {id} = req.params;

    try {
        const titulations = await Titulation.findAll({
            where:{
                areaid: id
            }
        });
        res.json({
            data: titulations
        })        
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