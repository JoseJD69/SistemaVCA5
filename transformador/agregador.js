var filename = '2017sist.txt';
var fs = require('fs')
fs.readFile(filename, 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  var result = data.replace(/Date	Time	Out	Temp	Temp	Hum	Pt.	Speed	Dir	Run	Speed	Dir	Chill	Index	Index	Index	Bar  	Rain	Rate	Rad.	Energy	Rad. 	Index	Dose	UV 	D-D 	D-D 	Temp	Hum	Dew	Heat	EMC	Density	ET 	Samp	Tx 	Recept	Int./g,
  'Date	Time	tempOut	hiTemp	lowTemp	outHum	dewPt	windSpeed	windDir	windRun	hiSpeed	HiDir	WindChill	HeatIndex	THWIndex	THSWIndex	Bar  	Rain	RainRate	SolarRad	SolarhiEnergy	SolarRadN 	UVIndex	UVDose	HiUV 	HeatD-D 	CoolD-D 	InTemp	InHum	InDew	InHeat	EMC	Density	ET 	windSamp	windTx 	issRecept	arcInt');

  fs.writeFile(filename, result, 'utf8', function (err) {
     if (err) return console.log(err);
  });
});