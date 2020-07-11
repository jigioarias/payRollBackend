const PERIODOS = [ {
    periodType :'Q',
      periods :[{
            period:'01',
            periodNext:'02',
            periodBefore:'02',
            last :false,
            first:true
               },
          {
            period:'02',
            periodNext:'01',
            periodBefore:'01',
            last :true,
            first:false
          } ]            
  },
  {
  periodType :'M',
      periods :[{
            period:'01',
            periodNext:'01',
            periodBefore:'01',
            last :true,
             first:true
            } 
        ]            
  },
  {
  periodType :'S',
  periods :[{
        period:'01',
        periodNext:'02',
        periodBefore:'04',
        last :false,
        first:true
           },
      {
        period:'02',
        periodNext:'03',
        periodBefore:'01',
        last :false,
        first:false
      },
      {
        period:'03',
        periodNext:'04',
        periodBefore:'02',
        last :false,
        first:false
      },
      {
        period:'04',
        periodNext:'01',
        periodBefore:'03',
        last :true,
        first:false
      } 
    ]            
}
 
];

MES_MOVIEMBRE = 11;
MES_ENERO =1;
MES_DICIEMBRE =12;

module.exports = {
PERIODOS:PERIODOS,
MES_NOVIEMBRE:MES_MOVIEMBRE,
MES_ENERO :MES_ENERO,
MES_DICIEMBRE :MES_DICIEMBRE
}

