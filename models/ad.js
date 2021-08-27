module.exports = (sequelize, DataTypes) => {
  const ad = sequelize.define('ad', {
    endDate: {
      type: DataTypes.DATE
    }
  },{
    charset: 'utf8',
    timestamps: true,
    paranoid: true
  })
  ad.associate = (models) => {
    ad.belongsTo(models.Room)
  }
  return ad
}