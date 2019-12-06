import Post from '../models/Post';

export async function createPost (req, res) {
    
    const {description, html, title, categoryid} = req.body;
    let user =  req.user;


    try {
        let newPost = await Post.create({
            description,
            autorid : user.ci,
            html,
            title,
            categoryid
        },{
            fields:['description','autorid','html','title','categoryid']
        })
        if(newPost){
            return res.json({
                message: "Post created successfully",
                data: newPost   
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

export async function getPosts (req, res){
    try {
        const posts = await Post.findAll();
        res.json({
            data: posts
        })
    } catch (error) {
        res.status(500).json({
            message: "Something goes wrong",
            error
        })
    }
}

export async function updatePost(req, res) {

    const {id} = req.params;
    const {description, html, title, categoryid} = req.body;

    try {
        const updateRowCount = await Post.update({
            description,
            html,
            title,
            categoryid
        },{
            where:{
                id
            }
        })
        if(updateRowCount == 0){
            return res.status(400).json({
                message: "Can't be updated because this post does not exist",
                data: "Updated rows " + updateRowCount
            }) 
        }
        return res.json({
            message: "Post updated successfully",
            data: "Updated rows " + updateRowCount
        })
        
    } catch (error) {
        res.status(500).json({
            message: 'Something goes wrong',
            data : error
        })  
    }

}

export async function deletePost(req, res){
    
    const {id} = req.params;

    try {
        const deleteRowCount = await Post.destroy({
            where:{
                id
            }
        });
        if(deleteRowCount === 0){
            return res.status(400).json({
                message: "Can't be deleted because this post does not exist",
                data: "Deleted rows " + deleteRowCount
            }) 
        }
        return res.json({
            message: "Post deleted successfully",
            data: "Deleted rows " + deleteRowCount 
        })
        
    } catch (error) {
        res.status(500).json({
            message: "Something goes wrong",
            error
        })
    }

}