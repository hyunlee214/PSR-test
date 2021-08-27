module.exports = (sequelize, DataTypes) => {
  const pictures = sequelize.define('pictures', {
    file: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    src: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true
    }
  }, {
    charset: 'utf8',
    timestamps: true,
    paranoid: true
  })
  pictures.associate = (models) => { 
    pictures.belongsTo(models.Room, { foreignKey: 'roomId' })
  }
  return pictures
}