module.exports = (sequelize, DataTypes) => {

  sequelize.define('empleado', {

    enterprise: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    // attributes
    idPerson: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  
     salary: {
        type: DataTypes.DECIMAL,
        allowNull: false
      }, 

      salaryType: {
        type: DataTypes.STRING(1),
        allowNull: false,
        isIn: [['A', 'J']]
      },
      initDateContract: {
        type:  DataTypes.DATE,
        allowNull: false
      },
      endDateContract: {
        type:  DataTypes.DATE,
        allowNull: true
      },
      costCenter: {
        type: DataTypes.INTEGER,
        allowNull: false
      },

      classPayRoll: {
        type: DataTypes.INTEGER,
        allowNull: false
      },

      departament: {
        type:  DataTypes.INTEGER,
        allowNull: true
      },

      branchOffice: {
        type:  DataTypes.INTEGER,
        allowNull: true
      },

      unity: {
        type:  DataTypes.INTEGER,
        allowNull: true
      },
      area: {
        type:  DataTypes.INTEGER,
        allowNull: true
      },

      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      }
      ,
      user: {
        type: DataTypes.STRING(50),
        allowNull: true
      }

     
  }, {
    
  });

};
