module.exports = (sequelize, DataTypes) => {

  const Calendario =sequelize.define('calendariolaboral', {
    // attributes

    enterprise: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    description: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
     user: {
        type: DataTypes.STRING(50),
        allowNull: true
      },
     

  }, {
   
      
    
  });
  
  
  const Fechas=sequelize.define('fechascalendariolaboral', {
    // attributes

    enterprise: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    
    year: {
        type:  DataTypes.INTEGER,
        allowNull: false

      },
     user: {
        type: DataTypes.STRING(50),
        allowNull: true
      },
      type: {
        type: DataTypes.STRING(1),
        allowNull: false
      }   
  },  {
  
 }

 );
  Calendario.hasMany(Fechas);
  Fechas.belongsTo(Calendario);


};
