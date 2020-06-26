module.exports = (sequelize, DataTypes) => {

  sequelize.define('semanalaboral', {
    // attributes

    enterprise: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    description: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    workcalendar: {
        type:  DataTypes.INTEGER,
        allowNull: false

      },
     user: {
        type: DataTypes.STRING(50),
        allowNull: true
      }

  }, {
    
  });

};
