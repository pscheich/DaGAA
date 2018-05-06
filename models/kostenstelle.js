const mongoose = require('mongoose');
const config = require('../config/database');

var ObjectId = mongoose.Schema.Types.ObjectId;
// KostenstelleSchema Schema
const KostenstelleSchema = mongoose.Schema({
    name: {
        type: String
    },
    nummer: {
        type: String
    },
    kurz: {
        type: String
    },
    projekte: [{
        name: { type: String },
        wimi: ObjectId,
        subprojekte: [{
            name: { type: String },
            wimis: [{ type: ObjectId }]
        }]

    }],
    aktiv: {
        type: Boolean
    },
}
);

const Kostenstelle = module.exports = mongoose.model('kostenstelle', KostenstelleSchema);


module.exports.getKostenstelleById = function (id, callback) { //Mit Passwort
    Kostenstelle.findById(id, function (err, doc) {
        if (err) {
            console.error('error posting json: ', err)
            callback(err, null);
            //throw err
        }
        callback(null, doc);
    });
}
module.exports.getKostenstellen = function (callback) {

    Kostenstelle.find({}, function (err, doc) {
        if (err) {
            console.error('error posting json: ', err)
            callback(err, null);
            //throw err
        }
        callback(null, doc);

    });

}

module.exports.addKostenstelle = function (newKostenstelle, callback) {
    newKostenstelle.save(callback);
};
module.exports.updateKostenstelle = function (ks, callback) {
    Kostenstelle.findById(ks._id, function (err, k) {
        if (err) {
            console.error('error: ', err)
        }
        k.name = ks.name,
            k.nummer = ks.nummer,
            k.kurz = ks.kurz,
            //aktiv= true,
            k.save(function (err) {
                if (err) { console.error('error ', err) } else {
                    callback(null, k);
                }

            })

    });
};
module.exports.deleteKostenstelle = function (id, callback) {
    Kostenstelle.findByIdAndRemove(id, callback);
};
module.exports.addProjekt = function (id, newProjekt, callback) {
    console.log(newProjekt)
    Kostenstelle.findOneAndUpdate(
        { _id: id }, 
        { $push: { projekte: newProjekt  } },
       function (error, success) {
             if (error) {
                 console.log(error);
                 callback(error, null);
             } else {
                 console.log(success);
                 callback(null, success);
             }
         });
  /*  var ks = Kostenstelle.findById(id, function (err, k) {
        if (err) {
            console.error('error: ', err)
        }
        k.projekte.push(newProjekt);
        k.save(function (err) {
            if (err) { console.error('error ', err) } else {
                callback(null, k);
            }

        })
    })*/
    /* Kostenstelle.updateOne(
         { _id: id },
         { $push: { projects: newProjekt } }
         , function (err, doc) {
             if (err) {
                 console.error('error posting json: ', err)
                 callback(err, null);
                 //throw err
             }
             callback(null, doc.projekte);
 
         });*/



}

module.exports.addSubprojekt = function (kid, pid, newSubprojekt, callback) {
    Kostenstelle.update(
        { _id: id, "projekte.projekt._id": pid },
        { $push: { subprojecte: newSubprojekt } },
        function (err, doc) {
            if (err) {
                console.error('error posting json: ', err)
                callback(err, null);
                //throw err
            }
            callback(null, doc.projekte);

        });


}
module.exports.getProjektById = function (pid, callback) {

    Kostenstelle.findById({'projekte._id':pid}, function (err, doc) {
        if (err) {
            console.error('error posting json: ', err)
            callback(err, null);
            //throw err
        }
        console.log(doc.projekte.id(pid))
        callback(null, doc.projekte.id(pid));
    });

}
module.exports.getProjekte = function (kid, callback) {

    Kostenstelle.findById(kid, function (err, doc) {
        if (err) {
            console.error('error posting json: ', err)
            callback(err, null);
            //throw err
        }
        callback(null, doc.projekte);
    });

}