module.exports = (sequelize, DataTypes) => {

  sequelize.define('areaEmpleado', {

    enterprise: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    branchOffice: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    departament: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    unit: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
    area: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
    employeee: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      user: {
        type: DataTypes.STRING(50),
        allowNull: true
      }


  }, {
    
  });

};
