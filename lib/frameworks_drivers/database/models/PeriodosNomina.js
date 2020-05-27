module.exports = (sequelize, DataTypes) => {

  sequelize.define('periodosnomina', {
    // attributes
    payrollltype: {
      type: DataTypes.STRING(1),
      allowNull: false,
      isIn: [['QN', 'ME','SE','DE']]
    },
    classpayroll: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    year: {
        type: DataTypes.STRING,
        allowNull: false
      },
    month: {
      type: DataTypes.STRING(2),
      allowNull: false,
      isIn: [['01', '02','03','04','05', '06','07','08','09', '10','11','12']]
    },
    period: {
      type: DataTypes.STRING(2),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    initDate: {
        type: DataTypes.DATE,
        allowNull: false
      },
    endDate: {
        type: DataTypes.DATE,
        allowNull: false
      },
      user: {
        type: DataTypes.STRING(50),
        allowNull: true
      }

  }, {
    
  });

};
