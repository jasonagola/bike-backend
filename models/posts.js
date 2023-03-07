const Sequelize = require('sequelize')
import sequelize from "../config/database"

const Post = sequelize.define('Post', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
    post_content: {
        type: Sequelize.STRING,
        allowNull: false
      },
    post_created_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
    post_owner: {
        type: Sequelize.STRING,
        allowNull: false
      }
})

export default Post 