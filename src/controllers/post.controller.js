import Sequelize from 'sequelize';
import Post from '../models/Post';
import Category from '../models/Category';

export async function createPost (req, res) {
    
    const {description, content, title, categoryid, ispublic } = req.body;
    let user =  req.user;


    try {
        let newPost = await Post.create({
            description,
            autorid : user.ci,
            content,
            title,
            categoryid,
            ispublic
        },{
            fields:['description','autorid','content','title','categoryid','ispublic']
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
        const posts = await Post.findAll({
            attributes:['id', 'description','autorid','content','title', 'ispublic', 'createdat','updatedat'],
            include: [{
                 model: Category,
                 as: 'keyword',
                 attributes:['id','name']
             }]
        });
        res.json({
            data: posts
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Something goes wrong",
            error
        })
    }
}

export async function getPostsbyKeyword(req, res){

    const {keywordid} = req.params;

    try {
        const posts = await Post.findAll({
            where:{
            categoryid: keywordid
            },
            include: [{
                model: Category,
                as: 'keyword'
            }]
        });
        res.json({
            data: posts
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Something goes wrong",
            error
        })
    }
}

export async function updatePost(req, res) {

    const {id} = req.params;
    const {description, content, title, categoryid, isPublic} = req.body;

    try {
        const updateRowCount = await Post.update({
            description,
            content,
            title,
            categoryid,
            isPublic
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

export async function countPost(req, res){

    try{
        const PostCount = await Post.findAll({
            attributes: [[Sequelize.fn('COUNT', Sequelize.col('id')), 'count']]
          });
          return res.json({
            PostCount
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            message: 'Something goes wrong',
            data: error
        })
    }
}