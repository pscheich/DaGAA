const express = require('express');
const router = express.Router();
const config = require('../config/database');
const Tournament = require('../models/tournament');

//Tournament
router.post('/', (req, res, next) => {
    let newTournament = new Tournament({
        name: req.body.name,
        city: req.body.city,
        date: req.body.date,
        player: [],
        bills: []
    });
    console.log(req.body)
    Tournament.addTournament(newTournament, (err, tournament) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to addtournament' });
        } else {
            res.json({ success: true, msg: 'Added tournament' });
        }
    });
});

router.get('/', (req, res, next) => {
    var foo = Tournament.getTournaments((err, tournaments) => {
        if (err) console.log(err); else
            if (!tournaments) {
                return res.json({ success: false, msg: 'No tournament found' });
            }
        res.json({
            tournaments
        });
    });
});

router.delete('/:id', (req, res, next) => {
    var foo = Tournament.deleteTournament(req.params.id, (err, tournament) => {
        if (err) console.log(err); else
            if (!tournament) {
                return res.json({ success: false, msg: 'No tournament found' });
            }
            else {
                res.json({ success: true, msg: 'Tournament removed' });
            }
    });
});

router.get('/:id', (req, res, next) => {
    var foo = Tournament.getTournamentById(req.params.id, (err, tournament) => {
        if (err) console.log(err); else
            if (!tournament) {
                return res.json({ success: false, msg: 'No Tournament found' });
            }
        res.json({
            tournament
        });
    });
});
router.patch('/', (req, res, next) => {
    let editTournament = new Tournament({
        _id: req.body._id,
        name: req.body.name,
        city: req.body.city,
        date: req.body.date,
    });
    Tournament.updateTournament(editTournament, (err, tournament) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to edittournament' });
        } else {
            res.json({ success: true, msg: 'Edittournament' });
        }
    });
});
router.patch('/addplayer', (req, res, next) => {
    let player = {
        name: req.body.player.name,
        deposit:0
    };

    Tournament.addPlayer(req.body.tid, player, (err, p) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to add player' });
        } else {
            res.json({ success: true, msg: 'add player' });
        }
    });
});
router.patch('/delplayer', (req, res, next) => {
    let pid = req.body.pid;
    let tid = req.body.tid;
    Tournament.delPlayer(tid, pid, (err) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to del player' });
        } else {
            res.json({ success: true, msg: 'del player' });
        }
    });
});
router.patch('/sendMoney', (req, res, next) => {
    let pid = req.body.pid;
    let tid = req.body.tid;
    let deposit = req.body.deposit;
    Tournament.sendMoney(tid, pid,deposit, (err) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to send money' });
        } else {
            res.json({ success: true, msg: 'send money' });
        }
    });
});
router.get('/player/:pid', (req, res, next) => {
    console.log('')
    var foo = Tournament.getPlayerById(req.params.pid, (err, player) => {
        if (err) console.log(err); else
            if (!player) {
                return res.json({ success: false, msg: 'No player found' });
            }
        res.json({
            player
        });
    });
});
router.patch('/addbill', (req, res, next) => {
    console.log(req.body.bill)
    let bill = {
        name: req.body.bill.name,
        topay: req.body.bill.topay,
        payed: req.body.bill.payed,
        money: req.body.bill.money,
    };
    Tournament.addBill(req.body.tid, bill, (err, b) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to add bill' });
        } else {
            res.json({ success: true, msg: 'add bill' });
        }
    });
});
router.patch('/delbill', (req, res, next) => {
    let bid = req.body.bid;
    let tid = req.body.tid;
    console.log('del')
    Tournament.delBill(tid, bid, (err) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to del bill' });
        } else {
            res.json({ success: true, msg: 'del player' });
        }
    });
});
router.patch('/addstuff', (req, res, next) => {
    console.log(req.body.stuff)
    let stuff = {
        name: req.body.stuff.name,
        guy: req.body.stuff.guy,
    };
    Tournament.addStuff(req.body.tid, stuff, (err, b) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to add stuff' });
        } else {
            res.json({ success: true, msg: 'add stuff' });
        }
    });
});
router.patch('/delstuff', (req, res, next) => {
    let sid = req.body.sid;
    let tid = req.body.tid;
    console.log('del')
    Tournament.delStuff(tid, sid, (err) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to del stuff' });
        } else {
            res.json({ success: true, msg: 'del player' });
        }
    });
});
router.get('/getmoney/:id', (req, res, next) => {
    var foo = Tournament.getTournamentById(req.params.id, (err, tournament) => {
        if (err) console.log(err); else
            if (!tournament) {
                return res.json({ success: false, msg: 'No Tournament found' });
            }
        var money = {}
        console.log(tournament)
        tournament['bills'].forEach(element => {
            if (money[element['payed']['pid']]) {
                money[element['payed']['pid']] += element['money']
            }
            else {
                money[element['payed']['pid']] = element['money']
            }
            element['topay'].forEach(pl => {
                if (money[pl['pid']]) {
                    money[pl['pid']] -= element['money'] / element['topay'].length
                }
                else {
                    money[pl['pid']] = -element['money'] / element['topay'].length
                }

            })

        });
        console.log(money)
        res.json({
            money
        });
    });
});
module.exports = router;
