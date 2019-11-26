import Category from '../models/Category'

export async function getCategories(req, res){

    try {
        const categories = await Category.findAll({
            where:{
                categoryid: null
            }
        });
        res.json({
            data: categories
        })        
    } catch (error) {
        res.status(500).json({
            message: "Something goes wrong",
            error  
        })
    }
}

export async function createCategory(req, res) {
    
    const {name, description, categoryid} = req.body;

    try {
        
        let newCategory = await Category.create({
            name,
            description,
            categoryid
        },{
            fields: ['name', 'description', 'categoryid']
        });

        if(newCategory){
            return res.json({
                message: "Category created successfully",
                data: { newCategory}
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
