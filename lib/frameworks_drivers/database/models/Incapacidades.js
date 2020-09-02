module.exports = (sequelize, DataTypes) => {

  sequelize.define('inability', {
    // attributes
    enterprise: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
     document: {
        type: DataTypes.STRING(30),
        allowNull: false
      },
    employeeId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    registerPeriod: {
        type: DataTypes.STRING(10),
        allowNull: true
      },
    
    clase: {
        type: DataTypes.INTEGER,
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
      type: {
          type: DataTypes.STRING(1),
          allowNull: false
        },
      user: {
          type: DataTypes.STRING(50),
          allowNull: false
        },
       salary: {
            type: DataTypes.INTEGER,
            allowNull: false
         },
         active: {
          type: DataTypes.BOOLEAN,
          allowNull: false
        },
        percentage: {
            type: DataTypes.INTEGER,
            allowNull: false
         }
  
  }, {
    
  });

};
