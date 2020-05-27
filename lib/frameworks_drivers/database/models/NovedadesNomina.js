module.exports = (sequelize, DataTypes) => {

  sequelize.define('novedadessnomina', {
    // attributes
    payrollclass: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    number: {
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
    employee: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    concept: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
    value: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      hours: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      type: {
        type: DataTypes.STRING(1),
        allowNull: false,
        isIn: [['P', 'D']]
      },
      state: {
        type: DataTypes.STRING(1),
        allowNull: false,
        isIn: [['O', 'C']]
      },
      user: {
        type: DataTypes.STRING(50),
        allowNull: true
      }



  }, {
    
  });

};
