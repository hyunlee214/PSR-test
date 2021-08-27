module.exports = (sequelize, DataTypes) => {
  const logType = sequelize.define('logType', {
    descriptor: { 
      type: DataTypes.STRING(32),
      allowNull: false,
    },
  },{
    charset: 'utf8',
    timestamps: true,
    paranoid: true
  })
  logType.associate = (models) => {
    logType.hasMany(models.Log)
  }
  return logType
}