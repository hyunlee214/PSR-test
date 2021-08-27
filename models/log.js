module.exports = (sequelize, DataTypes) => {
  const log = sequelize.define('log', {
    contents: { //id 값 
      type: DataTypes.TEXT,
      allowNull: false,
    },
    ipAddress: {
      type: DataTypes.STRING(32),
      defaultValue: "",
    },
    userAgent: {
      type: DataTypes.TEXT,
      defaultValue: "",
    }
  },{
    charset: 'utf8',
    timestamps: true,
    paranoid: true
  })
  log.associate = (models) => {
    log.belongsTo(models.LogType)
  }
  return log
}