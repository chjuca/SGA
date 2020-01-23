import PostHasKeywords from '../models/PostHasKeywords';

export async function getPostsbyKeyword(req, res){

    const {keywordid} = req.params;

    try {
        const associations = await PostHasKeywords.findAll({
            where:{
            keywordid
            }
        });
        res.json({
            data: associations
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Something goes wrong",
            error
        })
    }
}

export async function getKeywordsbyPost(req, res){

    const {postid} = req.params;

    try {
        const associations = await PostHasKeywords.findAll({
            where:{
                postid
            }
        });
        res.json({
            data: associations
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Something goes wrong",
            error
        })
    }
}

export async function createAssociations(req, res){

    const {postid, keywordid}= req.body;

    try {
        let newAssociation = await PostHasKeywords.create({
            postid,
            keywordid
        },{
            fields:['postid', 'keywordid']
      })
        if(newAssociation){
            return res.json({
                message: "Association created successfully",
                data: newAssociation
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

export async function updateAssociations(req, res) {

    const {id} = req.params;
    const {postid, keywordid} = req.body;

    try {
        const updateRowCount = await PostHasKeywords.update({
            postid,
            keywordid
        },{
            where:{
                id
            }
        })
        if(updateRowCount == 0){
            return res.status(400).json({
                message: "Can't be updated because this association does not exist",
                data: "Updated rows " + updateRowCount
            }) 
        }
        return res.json({
            message: "Association updated successfully",
            data: "Updated rows " + updateRowCount
        })
        
    } catch (error) {
        res.status(500).json({
            message: 'Something goes wrong',
            data : error
        })  
    }

}

export async function deleteAssociations(req, res){
    
    const {id} = req.params;

    try {
        const deleteRowCount = await PostHasKeywords.destroy({
            where:{
                id
            }
        });
        if(deleteRowCount === 0){
            return res.status(400).json({
                message: "Can't be deleted because this Association does not exist",
                data: "Deleted rows " + deleteRowCount
            }) 
        }
        return res.json({
            message: "Association deleted successfully",
            data: "Deleted rows " + deleteRowCount 
        })
        
    } catch (error) {
        res.status(500).json({
            message: "Something goes wrong",
            error
        })
    }

}
