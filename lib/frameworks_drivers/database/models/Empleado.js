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


  
  const Empresa =sequelize.define('empresa', {

    
    nit: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    code: {
      type: DataTypes.STRING(2),
      allowNull: false
    },

    description: {
        type: DataTypes.STRING(100),
        allowNull: false,
        set(val) {
          this.setDataValue("description", val.toUpperCase());
        }
      },
      address: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      phone: {
        type: DataTypes.STRING(20),
        allowNull: false
      },
     active: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      
      enterpriseGroup: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      user: {
        type: DataTypes.STRING(30),
        allowNull: true
      }

  }, {
    
  });

 const Area = sequelize.define('area', {

    // attributes
    enterprise: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    code: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    unity: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
    description: {
        type: DataTypes.STRING(50),
        allowNull: false
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
const ClaseNomina = sequelize.define('clasenomina', {
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


sequelize.define('periodosclase', {
  // attributes

  enterprise: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  clase: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  period: {
    type: DataTypes.STRING(2),
    allowNull: false
  },
  year: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
    user: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
     month: {
        type: DataTypes.STRING(2),
        allowNull: false,
        isIn: [['01', '02','03','04','05', '06','07','08','09', '10','11','12']]
      },
      initDate: {
          type: DataTypes.DATE,
          allowNull: false
        },
      endDate: {
          type: DataTypes.DATE,
          allowNull: false
        }
}, {
  
});

const Empleado =sequelize.define('empleado', {

  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
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
     active: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
    ,
    user: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    transporteSubsidy: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
}, {
  classMethods: {
    associate: function(models) {
      // associations can be defined here
      Persona.belongsTo(Empleado, { through: Persona, as: 'persona' });
     
    }
  }
});







Empleado.associate = function (models) {
  // Leg.belongsTo(models.Cat)
  Empleado.hasOne(models.Persona, {
    foreignKey: 'idPerson',
    as: 'persona'
  })
}



  
  Empleado.belongsTo(Persona,{as: 'persona', foreignKey: 'idPerson'});  
  Empleado.belongsTo(Empresa,{as: 'empresa', foreignKey: 'enterprise'});  
  Empleado.belongsTo(Empleado,{as: 'areac', foreignKey: 'area'});  
  Empleado.belongsTo(ClaseNomina,{as: 'claseNominad', foreignKey: 'classPayRoll'});  
  Empresa.hasOne(Empleado,{as: 'empresa', foreignKey: 'enterprise'});  



  return Empleado;

};
