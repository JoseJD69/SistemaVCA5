var express = require('express');
var path = require("path");
var bodyParser = require('body-parser');
var mongo = require("mongoose");
var url = require('url');


var round = function (val, places) {
    var p = {};
    var divider = Math.pow(10, places);
    p["$divide"] = [];
    var newval = {$add: [{"$multiply": [val, divider]}, .5]}
    sub = {"$subtract": [newval, {"$mod": [newval, 1]}]};
    p["$divide"].push(sub);
    p["$divide"].push(divider);
    return p;
}


var db = mongo.connect("mongodb://localhost:27017/test", function (err, response) {
    if (err) {
        console.log(err);
    }
    else {
        console.log('Connected to ' + db, ' + ', response);
    }
});


var app = express()
app.use(bodyParser());
app.use(bodyParser.json({limit: '500mb'}));
app.use(bodyParser.urlencoded({extended: true}));


app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

var Schema = mongo.Schema;

var VariablesSchema = new Schema({
    _id: {type: Number},
    Date: {type: String},
    Time: {type: String},
    tempOut: {type: Number},
    hiTemp: {type: Number},
    lowTemp: {type: Number},
    outHum: {type: Number},
    windSpeed: {type: Number},
    windDir: {type: String},
    SolarRad: {type: Number},
    Rain: {type: Number}
}, {versionKey: false});


var model = mongo.model('variablesClimaticas', VariablesSchema, 'variablesClimaticas');
//entre fechas agregar

app.get("/api/getVariablesFechas", function (req, res) {

    model.find({Date: {$lte: '02/03/18'}}, function (err, data) {
        if (err) {
            res.send(err);
        }
        else {
            res.send(data);
        }
    });
});
//variables por dia
app.get("/api/getVariablesDia", function (req, res) {
    var parts = url.parse(req.url, true);
    var query = parts.query;

    model.aggregate([{$match: {Date: {$regex: '.*/03/18'}}}, {
        $group: {
            _id: '$Date',
            tempOutM: {$avg: '$tempOut'},
            hiTempM: {$avg: '$hiTemp'},
            lowTempM: {$avg: '$lowTemp'}
        }
    }, {
        $project: {

            tempOut: round('$tempOutM', 2),
            hiTemp: round('$hiTempM', 2),
            lowTemp: round('$lowTempM', 2)
        }
    }, {"$sort": {"_id": 1}}]).then(function (data) {

        res.send(data);
    });

});
//principal
app.get("/api/getVariablesTemperatura", function (req, res) {
    var parts = url.parse(req.url, true);
    var query = parts.query;
    var opcion = req.query.tipo;

    switch (opcion) {
        case 'Dia':
            model.find({Date: req.query.fecha}, function (err, data) {
                if (err) {
                    res.send(err);
                }
                else {
                    res.send(data);
                }
            });
            break;
        case 'Mensual':
            model.aggregate([{$match: {Date: {$regex: '.*/' + req.query.fecha}}}, {
                $group: {
                    _id: '$Date',
                    tempOutM: {$avg: '$tempOut'},
                    hiTempM: {$avg: '$hiTemp'},
                    lowTempM: {$avg: '$lowTemp'}
                }
            }, {
                $project: {

                    tempOut: round('$tempOutM', 2),
                    hiTemp: round('$hiTempM', 2),
                    lowTemp: round('$lowTempM', 2)
                }
            }, {"$sort": {"_id": 1}}]).then(function (data) {
                console.log(data);
                res.send(data);
            });
            break;
        case 'Anual':
            console.log(req.query.fecha);
            var Meses = ['01', '02', '03', '04', '05', '06', '07', '09', '10', '11', '12'];
            const promM = new Array();
            model.aggregate([{$match: {Date: {$regex: '.*/' + Meses[0] + '/' + req.query.fecha}}}, {
                $group: {
                    _id: '$Date',
                    tempOutM: {$avg: '$tempOut'},
                    hiTempM: {$avg: '$hiTemp'},
                    lowTempM: {$avg: '$lowTemp'}
                }
            }, {
                $project: {

                    tempOut: round('$tempOutM', 2),
                    hiTemp: round('$hiTempM', 2),
                    lowTemp: round('$lowTempM', 2)
                }
            }, {"$sort": {"_id": 1}}]).then(function (data) {
                promM.push(data);

            });

            break;
    }
});

//modificada
app.get("/api/getVariablesComponentes", function (req, res) {
    var parts = url.parse(req.url, true);
    var query = parts.query;
    var opcion = req.query.tipo;
    var variableC = req.query.variableC;
    console.log(variableC);
    console.log(opcion);
    console.log(req.query.fecha);
    switch (opcion) {
        case 'Dia':
            model.find({Date: req.query.fecha}, function (err, data) {
                if (err) {
                    res.send(err);
                }
                else {
                    res.send(data);
                }
            });
            break;
        case 'Mensual':
            if (variableC == 'Rain') {
                model.aggregate([{$match: {Date: {$regex: '.*/' + req.query.fecha}}}, {
                    $group: {
                        _id: '$Date',
                        RainM: {$avg: '$Rain'},
                    }
                }, {
                    $project: {

                        Rain: round('$RainM', 2),
                    }
                }, {"$sort": {"_id": 1}}]).then(function (data) {
                    console.log(data);
                    res.send(data);
                });
            }
            if (variableC == "SolarRad") {
                model.aggregate([{$match: {Date: {$regex: '.*/' + req.query.fecha}}}, {
                    $group: {
                        _id: '$Date',
                        solarRM: {$avg: '$SolarRad'},

                    }
                }, {
                    $project: {

                        SolarRad: round('$solarRM', 2)

                    }
                }, {"$sort": {"_id": 1}}]).then(function (data) {
                    console.log(data);
                    res.send(data);
                });
            }
            if (variableC == "outHum") {
                model.aggregate([{$match: {Date: {$regex: '.*/' + req.query.fecha}}}, {
                    $group: {
                        _id: '$Date',
                        outHumM: {$avg: 'outHum'}

                    }
                }, {
                    $project: {

                        outHum: round('outHumM', 2),
                    }
                }, {"$sort": {"_id": 1}}]).then(function (data) {
                    console.log(data);
                    res.send(data);
                });
            }
            break;
        case 'Intervalo':
            if (variableC == 'Rain') {
                model.aggregate([{$match: {Date: {$regex: '.*/' + req.query.fecha}}}, {
                    $group: {
                        _id: '$Date',
                        RainM: {$avg: '$Rain'},
                    }
                }, {
                    $project: {

                        Rain: round('$RainM', 2),
                    }
                }, {"$sort": {"_id": 1}}]).then(function (data) {
                    console.log(data);
                    res.send(data);
                });
            }
            if (variableC == "SolarRad") {
                model.aggregate([{$match: {Date: {$regex: '.*/' + req.query.fecha}}}, {
                    $group: {
                        _id: '$Date',
                        solarRM: {$avg: '$SolarRad'},

                    }
                }, {
                    $project: {

                        SolarRad: round('$solarRM', 2)

                    }
                }, {"$sort": {"_id": 1}}]).then(function (data) {
                    console.log(data);
                    res.send(data);
                });
            }
            if (variableC == "outHum") {
                model.aggregate([{$match: {Date: {$regex: '.*/' + req.query.fecha}}}, {
                    $group: {
                        _id: '$Date',
                        outHumM: {$avg: 'outHum'}

                    }
                }, {
                    $project: {

                        outHum: round('outHumM', 2),
                    }
                }, {"$sort": {"_id": 1}}]).then(function (data) {
                    console.log(data);
                    res.send(data);
                });
            }
            break;
    }
});


app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})  