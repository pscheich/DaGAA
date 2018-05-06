const express = require('express');
const router = express.Router();
const config = require('../config/database');
const Kostenstelle = require('../models/kostenstelle');

//Kostenstelle
router.post('/', (req, res, next) => {
    let newKostenstelle = new Kostenstelle({
        name: req.body.name,
        nummer: req.body.nummer,
        kurz: req.body.kurz,
        projekte: [],
    });
    console.log(req.body)
    Kostenstelle.addKostenstelle(newKostenstelle, (err, kostenstelle) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to add kostenstelle' });
        } else {
            res.json({ success: true, msg: 'Added kostenstelle' });
        }
    });
});

router.get('/',  (req, res, next) => {
    var foo = Kostenstelle.getKostenstellen((err, kostenstelles) => {
        if (err) console.log(err); else
            if (!kostenstelles) {
                return res.json({ success: false, msg: 'No kostenstellen found' });
            }
        res.json({
            kostenstelles
        });
    });
});

router.delete('/:id',  (req, res, next) => {
    var foo = Kostenstelle.deleteKostenstelle(req.params.id, (err, kostenstelle) => {
        if (err) console.log(err); else
            if (!kostenstelle) {
                return res.json({ success: false, msg: 'No kostenstelle found' });
            }
            else {
                res.json({ success: true, msg: 'Kostenstelle removed' });
            }
    });
});

router.get('/:id',  (req, res, next) => {
    var foo = Kostenstelle.getKostenstelleById(req.params.id, (err, kostenstelle) => {
        if (err) console.log(err); else
            if (!kostenstelle) {
                return res.json({ success: false, msg: 'No Kostenstelle found' });
            }
        res.json({
            kostenstelle
        });
    });
});
router.patch('/',  (req, res, next) => {
    let editKostenstelle = new Kostenstelle({
        _id: req.body._id,
        name: req.body.name,
        nummer: req.body.nummer,
        kurz: req.body.kurz,
        aktiv: true
    });
    Kostenstelle.updateKostenstelle(editKostenstelle, (err, kostenstelle) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to edit kostenstelle' });
        } else {
            res.json({ success: true, msg: 'Edit kostenstelle' });
        }
    });
});
router.patch('/addprojekt',  (req, res, next) => {
    console.log(req.body)
    let projekt ={
        name: req.body.projekt.name,
        wimi: req.body.projekt.wimi,
    };
    Kostenstelle.addProjekt(req.body.kid, projekt, (err, p) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to add projekt' });
        } else {
            res.json({ success: true, msg: 'add projekt' });
        }
    });
});
router.get('/projekts/:id',  (req, res, next) => {
    console.log('')
    var foo = Kostenstelle.getProjekte(req.params.id, (err, projekts) => {
        if (err) console.log(err); else
            if (!projekts) {
                return res.json({ success: false, msg: 'No projects found' });
            }
        res.json({
            projekts
        });
    });
});
//router.get('/projekt/:kid&:pid',  (req, res, next) => {
//    console.log('')
//    var foo = Kostenstelle.getProjektById(req.params.kid,req.params.pid, (err, projekt) => {
//        if (err) console.log(err); else
//            if (!projekt) {
//                return res.json({ success: false, msg: 'No projects found' });
//            }
//        res.json({
//            projekt
//        });
//    });
//});
router.get('/projekt/:pid',  (req, res, next) => {
    console.log('')
    var foo = Kostenstelle.getProjektById(req.params.pid, (err, projekt) => {
        if (err) console.log(err); else
            if (!projekt) {
                return res.json({ success: false, msg: 'No projects found' });
            }
        res.json({
            projekt
        });
    });
});
router.patch('/addsubprojekt',  (req, res, next) => {
    let subprojekt = new Subprojekt({
        name: req.body.name,
        wimis: req.body.wimis,

    });
    Kostenstelle.addSubprojekt(kid, pid, subprojekt, (err, sp) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to add subprojekt' });
        } else {
            res.json({ success: true, msg: 'add subprojekt' });
        }
    });
});

module.exports = router;