module.exports = (sequelize, DataTypes) => {

  sequelize.define('vacacion', {
    // attributes
    enterprise: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
  
     document: {
        type: DataTypes.STRING(30),
        allowNull: false
      },
      enjoyInitDate: {
          type: DataTypes.DATE,
          allowNull: false
       },
       enjoyEndDate: {
        type: DataTypes.DATE,
        allowNull: false
      },
      moneyDays: {
          type: DataTypes.INTEGER(1),
          allowNull: false
        },
     remuneration:{
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
     
      user: {
          type: DataTypes.STRING(50),
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
         enjoyDays: {
            type: DataTypes.INTEGER,
            allowNull: false
         },
         salary: {
            type: DataTypes.INTEGER,
            allowNull: false
         }
        
  
  }, {
    
  });

};
