const DATABASE_NAME='nomina';
const USERNAME='root';
const PASSWORD='admin';
const HOST='localhost';
const  DIALECT='mysql';

const PERIODOS = [ {
    periodType :'Q',
      periods :[{
            period:'01',
            periodNext:'02',
            last :false
               },
          {
            period:'02',
            periodNext:'01',
            last :true
          } ]            
  },
  {
  periodType :'M',
      periods :[{
            period:'01',
            periodNext:'01',
            last :true
            } 
        ]            
  },
  {
  periodType :'S',
  periods :[{
        period:'01',
        periodNext:'02',
        last :false
           },
      {
        period:'02',
        periodNext:'03',
        last :false
      },
      {
        period:'03',
        periodNext:'04',
        last :false
      },
      {
        period:'04',
        periodNext:'01',
        last :true
      } 
    ]            
}
 
];




module.exports = {
DATABASE_NAME: DATABASE_NAME,
USERNAME:USERNAME,
PASSWORD:PASSWORD,
HOST:HOST,
DIALECT:DIALECT,
PERIODOS:PERIODOS
}

