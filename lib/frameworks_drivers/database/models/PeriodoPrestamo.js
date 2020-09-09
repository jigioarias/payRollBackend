module.exports = (sequelize, DataTypes) => {

    sequelize.define('periodPrestamo', {
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
        idLoan: {
            type: DataTypes.INTEGER,
            allowNull: false
         },
       
        fee: {
            type: DataTypes.INTEGER,
            allowNull: false
          },
        interests: {
            type: DataTypes.INTEGER,
            allowNull: false
         },
         
        period: {
              type: DataTypes.STRING(10),
              allowNull: true
        },
        type: {
            type: DataTypes.STRING(1),
            allowNull: false
          },

          state: {
            type: DataTypes.STRING(1),
            allowNull: false
          },
          user: {
            type: DataTypes.STRING(50),
            allowNull: false
          },
             
    }, {
      
    });
  
  };
  