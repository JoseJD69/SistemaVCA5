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

app.post("/api/SaveProducto", function (req, res) {
    var mod = new model(req.body);
    if (req.body.mode == "Save") {
        mod.save(function (err, data) {
            if (err) {
                res.send(err);
            }
            else {
                res.send({data: "Record has been Inserted..!!"});
            }
        });
    }
    else {
        model.findByIdAndUpdate(req.body.id, {nombre: req.body.nombre, precio: req.body.precio},
            function (err, data) {
                if (err) {
                    res.send(err);
                }
                else {
                    res.send({data: "Record has been Updated..!!"});
                }
            });
    }
})


app.post("/api/deleteProducto", function (req, res) {
    model.remove({_id: req.body.id}, function (err) {
        if (err) {
            res.send(err);
        }
        else {
            res.send({data: "Record has been Deleted..!!"});
        }
    });
})


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

app.get("/api/getVariablesDia", function (req, res) {
    var parts = url.parse(req.url, true);
    var query = parts.query;
    console.log(req.query.fecha);
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
        console.log(data);
        res.send(data);
    });

});


app.get("/api/getVariables", function (req, res) {

    model.find({}, function (err, data) {
        if (err) {
            res.send(err);
        }
        else {
            res.send(data);
        }
    }).limit(800);
})


app.listen(3000, function () {

    console.log('Example app listening on port 3000!')
})  