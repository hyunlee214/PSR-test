module.exports = (sequelize, DataTypes) => {
  const location = sequelize.define('location', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    latitude: {     // 위도
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    longitude: {    // 경도
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    color: {
      type: DataTypes.STRING(9),
      allowNull: false
    }
  },{
    charset: 'utf8',
    timestamps: true,
    paranoid: true
  })
  location.associate = (models) => {
    location.hasMany(models.Room,    { foreignKey: 'locationId' })
  }
  return location
}