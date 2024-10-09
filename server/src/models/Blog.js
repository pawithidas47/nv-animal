module.exports = (sequelize, DataTypes) => {
    const Blog = sequelize.define('Blog', {
        name: DataTypes.STRING,
        habitat: DataTypes.STRING,
        food: DataTypes.STRING,
        status: DataTypes.STRING,
        picture: DataTypes.STRING
    })
    return Blog
}