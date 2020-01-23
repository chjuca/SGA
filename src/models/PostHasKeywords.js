import Sequelize from 'sequelize'
import {sequelize} from '../database/database';

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

export default PostHasKeywords;