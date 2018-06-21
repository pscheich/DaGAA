const mongoose = require('mongoose');
const config = require('../config/database');

var ObjectId = mongoose.Schema.Types.ObjectId;
// TournamentSchema Schema
const TournamentSchema = mongoose.Schema({
    name: {
        type: String
    },
    city: {
        type: String
    },
    date: {
        type: String
    },
    players: [{
        name: { type: String },
        deposit: { type: Number }
    }],
    bills: [{
        name: { type: String },
        topay: { type: Array, "default": [] },
        payed: { type: Object },
        money: { type: Number },

    }],
}
);

const Tournament = module.exports = mongoose.model('tournament', TournamentSchema);


module.exports.getTournamentById = function (id, callback) { //Mit Passwort
    Tournament.findById(id, function (err, doc) {
        if (err) {
            console.error('error posting json: ', err)
            callback(err, null);
            //throw err
        }
        callback(null, doc);
    });
}
module.exports.getTournaments = function (callback) {

    Tournament.find({}).sort({date: "desc" }).exec( function (err, doc) {
        if (err) {
            console.error('error posting json: ', err)
            callback(err, null);
            //throw err
        }
        callback(null, doc);

    });

}

module.exports.addTournament = function (newTournament, callback) {
    newTournament.save(callback);
};
module.exports.updateTournament = function (tourn, callback) {
    Tournament.findById(tourn._id, function (err, t) {
        if (err) {
            console.error('error: ', err)
        }
        t.name = tourn.name
        t.city = tourn.city
        t.date = tourn.date
        //aktiv= true,
        t.save(function (err) {
            if (err) { console.error('error ', err) } else {
                callback(null, t);
            }

        })

    });
};
module.exports.deleteTournament = function (id, callback) {
    Tournament.findByIdAndRemove(id, callback);
};
module.exports.addPlayer = function (id, newPlayer, callback) {
    console.log(newPlayer)
    Tournament.findOneAndUpdate(
        { _id: id },
        { $push: { players: newPlayer } },
        function (error, success) {
            if (error) {
                console.log(error);
                callback(error, null);
            } else {
                console.log(success);
                callback(null, success);
            }
        });
}
module.exports.delPlayer = function (tid, pid, callback) {
    console.log(tid)
    console.log(pid)
    Tournament.update(
        { _id: tid },
        { $pull: { players: { _id: pid } } },
        function (error) {
            if (error) {
                console.log(error);
                callback(error);
            } else {
                console.log();
                callback(null);
            }
        });
}
module.exports.sendMoney = function (tid, pid, deposit, callback) {
    console.log(tid)
    console.log(pid)
    Tournament.update(
        { _id: tid, 'players._id': { _id: pid } },
        { $set: { 'players.$.deposit': deposit } },
        function (error) {
            if (error) {
                console.log(error);
                callback(error);
            } else {
                console.log(deposit);
                callback(null);
            }
        });
}

module.exports.getBillById = function (bid, callback) {
    Tournament.findById({ 'bills._id': bid }, function (err, doc) {
        if (err) {
            console.error('error posting json: ', err)
            callback(err, null);
            //throw err
        }
        console.log(doc.bills.id(bid))
        callback(null, doc.bills.id(bid));
    });
}
module.exports.getPlayerById = function (pid, callback) {
    Tournament.findById({ 'players._id': pid }, function (err, doc) {
        if (err) {
            console.error('error posting json: ', err)
            callback(err, null);
            //throw err
        }
        console.log(doc.players.id(pid))
        callback(null, doc.players.id(pid));
    });
}
module.exports.addBill = function (id, newBill, callback) {
    console.log(newBill)
    Tournament.findOneAndUpdate(
        { _id: id },
        { $push: { bills: newBill } },
        function (error, success) {
            if (error) {
                console.log(error);
                callback(error, null);
            } else {
                console.log(success);
                callback(null, success);
            }
        });
}
module.exports.delBill = function (tid, bid, callback) {
    Tournament.update(
        { _id: tid },
        { $pull: { bills: { _id: bid } } },
        function (error) {
            if (error) {
                console.log(error);
                callback(error);
            } else {
                console.log();
                callback(null);
            }
        });
}