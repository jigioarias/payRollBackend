module.exports = (sequelize, DataTypes) => {

  sequelize.define('clasenomina', {
    // attributes

    enterprise: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    clase: {
      type: DataTypes.STRING(1),
      allowNull: false,
      isIn: [['AD', 'OP','GE','TP']]
    },
    description: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    vacationdays: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
    vacationprima: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    primatype: {
      type: DataTypes.STRING(1),
      allowNull: false,
      isIn: [['D','A']]
    },
    provisionservicedays: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    provisionservicetype: {
        type: DataTypes.STRING(1),
        allowNull: false,
        isIn: [['B','P']]
      },
      payrolltype: {
        type: DataTypes.STRING(2),
        allowNull: false,
        isIn: [['QN','SE','ME','CA']]

      },
       monthhours: {
        type:  DataTypes.INTEGER,
        allowNull: false

      },
      dayshours: {
        type:  DataTypes.STRING(3),
        allowNull: false
      },
      bank: {
        type:  DataTypes.STRING(2),
        allowNull: false
      },
      bankbranch: {
        type:  DataTypes.STRING(2),
        allowNull: false
      },
      account: {
        type:  DataTypes.STRING(15),
        allowNull: false
      },
      user: {
        type: DataTypes.STRING(50),
        allowNull: true
      }

  }, {
    
  });

};
