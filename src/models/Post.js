import Sequelize from 'sequelize';
import {sequelize} from '../database/database';
import Category from '../models/Category';

const Post = sequelize.define('posts',{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    description:{
        type: Sequelize.STRING
    },
    autorid:{
        type: Sequelize.STRING(10)
    },
    content:{
        type: Sequelize.TEXT            
    },
    title:{
        type: Sequelize.STRING
    },
    categoryid:{
        type: Sequelize.INTEGER
    },
    ispublic:{
        type: Sequelize.BOOLEAN
    }
 }, {
        timestamps: true,
        createdAt: 'createdat',
        updatedAt: 'updatedat',
        underscored : true
});
Post.hasMany(Category,{as: 'category',foreignKey: 'id',sourcekey : 'categoryid'});
Category.belongsTo(Post,{foreignKey: 'id',sourcekey : 'categoryid'});


export default Post;