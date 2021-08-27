module.exports = (sequelize, DataTypes) => {
  const room = sequelize.define('room', {
    name: {            // 방이름
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    phone: {           // 사장님번호
      type: DataTypes.STRING(13),
      allowNull: false,
    },
    latitude: {        // 위도
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    longitude: {       // 경도
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    yearPrice: {       // 년세
      type: DataTypes.INTEGER(4),
      defaultValue: 0
    },
    halfPrice: {       // 반년세
      type: DataTypes.INTEGER(4),
      defaultValue: 0
    },
    monthPrice: {      // 월세
      type: DataTypes.INTEGER(4),
      defaultValue: 0
    },
    fee: {             // 보증금
      type: DataTypes.INTEGER(4),
      defaultValue: 0
    },
    charterPrice: {    // 전세
      type: DataTypes.INTEGER(4),
      defaultValue: 0
    },
    maintenaceCost: {  // 전세 관리비
      type: DataTypes.INTEGER(4),
      defaultValue: 0
    },
    isMany: {          // 거주인원 최대 1명(0) 최대 2명(1) 최대 3명(2)
      type: DataTypes.INTEGER(1),
      defaultValue: 0
    },
    isWatertax: {      // 수도세
      type: DataTypes.BOOLEAN,
      defaultValue: 0
    },
    isElectax: {       // 전기세
      type: DataTypes.BOOLEAN,
      defaultValue: 0
    },
    isGastax: {        // 가스비
      type: DataTypes.BOOLEAN,
      defaultValue: 0
    },
    gasType: {         // 난방시설 도시가스(0) 심야전기(1) LPG가스(2)
      type: DataTypes.INTEGER(1),
      defaultValue: 0
    },
    gasrangeType: {    // 가스레인지 없음(0) 전기레인지(1) 가스레인지(2)
      type: DataTypes.INTEGER(1),
      defaultValue: 0
    },
    address: {         // 도로명주소
      type: DataTypes.TEXT,
      defaultValue: ""
    },
    comment: {         // 사장님의 한마디
      type: DataTypes.TEXT,
      defaultValue: ""
    },
    isBed: {           // 침대 여부
      type: DataTypes.BOOLEAN,
      defaultValue: 0
    },
    isFrige: {         // 냉장고 여부
      type: DataTypes.BOOLEAN,
      defaultValue: 0
    },
    isAircon: {        // 에어컨 여부
      type: DataTypes.BOOLEAN,
      defaultValue: 0
    },
    isWasher: {        // 세탁기 여부
      type: DataTypes.BOOLEAN,
      defaultValue: 0
    },
    isVeranda: {       // 베란다 여부 
      type: DataTypes.BOOLEAN,
      defaultValue: 0
    },
    isTV: {            // TV 여부
      type: DataTypes.BOOLEAN,
      defaultValue: 0
    },
    isDesk: {          // 책상 여부
      type: DataTypes.BOOLEAN,
      defaultValue: 0
    },
    isMicrowave: {     // 전자레인지 여부
      type: DataTypes.BOOLEAN,
      defaultValue: 0
    },
    isRouter: {        // 공유기 여부
      type: DataTypes.BOOLEAN,
      defaultValue: 0
    },
    isElevator: {      // 엘리베이터 여부 
      type: DataTypes.BOOLEAN,
      defaultValue: 0
    },
    isCctv: {          // cctv 여부 
      type: DataTypes.BOOLEAN,
      defaultValue: 0
    },
    isPostbox: {       // 무인택배함 여부 
      type: DataTypes.BOOLEAN,
      defaultValue: 0
    },
    isParking: {       // 주차장 여부 
      type: DataTypes.BOOLEAN,
      defaultValue: 0
    },
    isFireFacility: {  // 소방시설 여부
      type: DataTypes.BOOLEAN,
      defaultValue: 0
    },
    isLH: {            // LH 전세 여부
      type: DataTypes.BOOLEAN,
      defaultValue: 0
    },
    isPet: {           // 반려동물 여부
      type: DataTypes.BOOLEAN,
      defaultValue: 0
    },
    isVisible: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1
    },
  }, {
    charset: 'utf8',
    timestamps: true,
    paranoid: true
})
  room.associate = (models) => {
    room.belongsTo(models.Location, { foreignKey: 'locationId' })
    room.hasMany(models.Pictures,   { foreignKey: 'roomId' })
    room.hasMany(models.Ad,         { foreignKey: 'roomId' })
  }
  return room
}