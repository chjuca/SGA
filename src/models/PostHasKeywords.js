import Sequelize from 'sequelize'
import {sequelize} from '../database/database';
import Post from '../models/Post'
import Category from '../models/Category';

const PostHasKeywords = sequelize.define('posts_has_keywords', {
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    postid: {
        type: Sequelize.INTEGER
    },
    keywordid: {
        type: Sequelize.INTEGER
    }
}, { 
    timestamps: false, 
});

Post.hasMany(PostHasKeywords,{foreignKey: 'id',sourcekey : 'postid'});
PostHasKeywords.belongsTo(Post,{foreignKey: 'id',sourcekey : 'postid'});


Category.hasMany(PostHasKeywords,{foreignKey: 'id',sourcekey : 'keywordid'});
PostHasKeywords.belongsTo(Category,{foreignKey: 'id',sourcekey : 'keywordid'});

export default PostHasKeywords;