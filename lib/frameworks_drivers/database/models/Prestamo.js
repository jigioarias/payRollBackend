module.exports = (sequelize, DataTypes) => {

    sequelize.define('prestamo', {
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
        initDate: {
            type: DataTypes.DATE,
            allowNull: false
         },
       
        valor: {
            type: DataTypes.INTEGER,
            allowNull: false
          },
        balance: {
            type: DataTypes.INTEGER,
            allowNull: false
         },
       aproveDate:{
          type: DataTypes.DATE,
          allowNull: false
        },
       

          year: {
              type: DataTypes.INTEGER,
              allowNull: false
          },
          aprovePeriod: {
              type: DataTypes.STRING(10),
              allowNull: true
          },
          
          clase: {
              type: DataTypes.INTEGER,
              allowNull: false
           },
          
           interests:{
            type: DataTypes.BOOLEAN,
            allowNull: false
          },
          state: {
            type: DataTypes.STRING(1),
            allowNull: false
          },
          observation: {
            type: DataTypes.STRING(500),
            allowNull: false
          },
          user: {
            type: DataTypes.STRING(50),
            allowNull: false
          },
          concept: {
            type: DataTypes.INTEGER,
            allowNull: false
          },
             
    }, {
      
    });
  
  };
  