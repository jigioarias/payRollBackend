module.exports = (sequelize, DataTypes) => {

  const Persona =sequelize.define('persona', {
    // attributes
    firstName: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    phone: {
        type: DataTypes.STRING(15),
        allowNull: true
      },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    address: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    document: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    typeDocument: {
        type: DataTypes.STRING(10),
        allowNull: false
      },
     country: {
        type:  DataTypes.STRING(3),
        allowNull: false
      },
      department: {
        type:  DataTypes.STRING(3),
        allowNull: false
      },
      municipality: {
        type:  DataTypes.STRING(3),
        allowNull: false
      },
      user: {
        type: DataTypes.STRING(50),
        allowNull: true
      },
      civilState: {
        type: DataTypes.INTEGER,
        allowNull: true
      }    

  }, {
    
  });
  
  return Persona;
};
