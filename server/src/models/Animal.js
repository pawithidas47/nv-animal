module.exports = (sequelize, DataTypes) => {
    const Animal = sequelize.define('Animal', {
        name: DataTypes.STRING,
        habitat: DataTypes.STRING,
        food: DataTypes.STRING,
        status: DataTypes.STRING,
        picture: DataTypes.STRING
    }, {
        tableName: 'Animal' // ระบุชื่อตารางที่ต้องการใช้
    });
    return Animal;
};
