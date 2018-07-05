import { Component, OnInit } from '@angular/core';
import { TournamentService } from '../../services/tournament.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';
@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  tournaments: Array<Object>;
  tournament: Object;
  showT: Object;
  player: Object;
  bill: Object;
  stuff: Object;
  money: Array<Object>;
  rcount: Array<Object>;
 _tid : Object;



  constructor(
    private tournamentService: TournamentService,
    private router: Router,
    private flashMessage: FlashMessagesService,
    private activatedRoute: ActivatedRoute
  ) {
    this.tournaments = [];
    this.tournament = {};
    this.player = {}
    this.bill = {}
    this.stuff={}
    this.money = []
    this.rcount = []
  }

  refreshTournaments() {
    this.tournamentService.getTournamentn().subscribe(data => {
      console.log(data)
      this.tournaments = data.tournaments;
      this.tournament = {};
      this.player = {}
      this.bill = {}
      this.stuff={}
      this.money = []
      this.showT = false;
      for (let i = 0; i < this.tournaments.length; i++) {
        this.rcount.push(i)
      }
      if (this._tid != "undefined") {
        this.openTournament(this._tid);
        //this._tid = "undefined";
      }
    },
      err => {
        console.log(err);
        return false;
      });
  }
  refreshTournament() {
    this.tournamentService.getTournament(this.tournament['_id']).subscribe(data => {
      console.log(data)
      //this.tournament['players']=data.tournament['players'];
      this.tournament = data.tournament;
      this.player = {};
      this.bill = {}
      this.stuff={}
      this.getmoney();
    },
      err => {
        console.log(err);
        return false;
      });
  }

  ngOnInit() {
    this.tournaments = [];
    this.tournament = {};
    this._tid = this.activatedRoute.snapshot.queryParams["t"];
        this.refreshTournaments();

  }



  //########## FILTER
  addTournament() {
    this.tournamentService.addTournament(this.tournament).subscribe(data => {
      if (data.success) {
        this.flashMessage.show('Neues Turnier wurde hinzugefügt.', { cssClass: 'alert-success', timeout: 3000 });
      } else {
        this.flashMessage.show('Something went wrong', { cssClass: 'alert-danger', timeout: 3000 });
      }
      this.refreshTournaments();
    });
  }
  delTournament(id) {
    console.log('delTournament: ' + id);
    this.tournamentService.delTournament(id).subscribe(data => {
      if (data.success) {
        this.flashMessage.show('Turnier wurde gelöscht.', { cssClass: 'alert-success', timeout: 3000 });
      } else {
        this.flashMessage.show('Something went wrong', { cssClass: 'alert-danger', timeout: 3000 });
      }
      this.refreshTournaments();
    });
  }
  useTournament(id) {
    console.log('useTournament: ' + id);
    this.tournamentService.getTournament(id).subscribe(tournament => {
      this.tournament = tournament.tournament;
      console.log(this.tournament);
    },
      err => {
        console.log(err);
        return false;
      });
  }

  openTournament(id) {
    console.log('openTournament: ' + id);
    this.tournamentService.getTournament(id).subscribe(tournament => {
      this.tournament = tournament.tournament;
      this.showT = true;
      this.getmoney();
      console.log(this.tournament['bills']);
      this._tid = "undefined";
    },
      err => {
        console.log(err);
        return false;
      });
  }

  editTournament() {
    console.log(this.tournament)
    this.tournamentService.editTournament(this.tournament).subscribe(data => {
      if (data.success) {
        this.flashMessage.show('Turnier wurde bearbeitet.', { cssClass: 'alert-success', timeout: 3000 });
      } else {
        this.flashMessage.show('Something went wrong', { cssClass: 'alert-danger', timeout: 3000 });
      }
      this.refreshTournaments();
    });
  }
  addPlayer() {
    this.tournamentService.addPlayer(this.tournament['_id'], this.player).subscribe(data => {
      if (data.success) {
        this.flashMessage.show('Spiele_*x wurde hinzugefügt.', { cssClass: 'alert-success', timeout: 3000 });
      } else {
        this.flashMessage.show('Something went wrong', { cssClass: 'alert-danger', timeout: 3000 });
      }
      this.refreshTournament();
    });
  }
  delPlayer(pid) {
    console.log('delPlayer: ' + pid);
    this.tournamentService.delPlayer(this.tournament['_id'], pid).subscribe(data => {
      if (data.success) {
        this.flashMessage.show('Spiele_*x wurde gelöscht.', { cssClass: 'alert-success', timeout: 3000 });
      } else {
        this.flashMessage.show('Something went wrong', { cssClass: 'alert-danger', timeout: 3000 });
      }
      this.refreshTournament();
    });
  }
  sendMoney() {
    this.tournamentService.sendMoney(this.tournament['_id'], this.player).subscribe(data => {
      if (data.success) {
        this.flashMessage.show('Geld geschickt wurde gelöscht.', { cssClass: 'alert-success', timeout: 3000 });
      } else {
        this.flashMessage.show('Something went wrong', { cssClass: 'alert-danger', timeout: 3000 });
      }
      this.refreshTournament();
    });
  }
  usePlayer(pid) {
    console.log('usePlayer: ' + pid);
    this.player = this.tournament['players'].find(function (element) {
      return element._id == pid;
    })
  }
  addBill() {
    console.log(this.bill)
    this.bill['payed'] = this.getPlayer(this.bill['payed'])
    for (var i in this.bill['topay']) {
      this.bill['topay'][i] = this.getPlayer(this.bill['topay'][i])
    }
    console.log(this.bill)
    this.tournamentService.addBill(this.tournament['_id'], this.bill).subscribe(data => {
      if (data.success) {
        this.flashMessage.show('Rechnung wurde hinzugefügt.', { cssClass: 'alert-success', timeout: 3000 });
      } else {
        this.flashMessage.show('Something went wrong', { cssClass: 'alert-danger', timeout: 3000 });
      }
      this.refreshTournament();
    });
  }
  delBill(bid) {
    console.log('delBillr: ' + bid);
    this.tournamentService.delBill(this.tournament['_id'], bid).subscribe(data => {
      if (data.success) {
        this.flashMessage.show('Rechnung wurde gelöscht.', { cssClass: 'alert-success', timeout: 3000 });
      } else {
        this.flashMessage.show('Something went wrong', { cssClass: 'alert-danger', timeout: 3000 });
      }
      this.refreshTournament();
    });
  }
  useBill(bid) {
    console.log('useBill: ' + bid);
    this.bill = this.tournament['bills'].find(function (element) {
      return element._id == bid;
    })
  }

  addStuff() {
    console.log(this.stuff)
    this.stuff['guy'] = this.getPlayer(this.stuff['guy'])

    this.tournamentService.addStuff(this.tournament['_id'], this.stuff).subscribe(data => {
      if (data.success) {
        this.flashMessage.show('Kram wurde hinzugefügt.', { cssClass: 'alert-success', timeout: 3000 });
      } else {
        this.flashMessage.show('Something went wrong', { cssClass: 'alert-danger', timeout: 3000 });
      }
      this.refreshTournament();
    });
  }
  delStuff(sid) {
    this.tournamentService.delStuff(this.tournament['_id'], sid).subscribe(data => {
      if (data.success) {
        this.flashMessage.show('Kram wurde gelöscht.', { cssClass: 'alert-success', timeout: 3000 });
      } else {
        this.flashMessage.show('Something went wrong', { cssClass: 'alert-danger', timeout: 3000 });
      }
      this.refreshTournament();
    });
  }
  useStuff(sid) {
    console.log('useStuff: ' + sid);
    this.stuff = this.tournament['stuff'].find(function (element) {
      return element._id == sid;
    })
  }

  getmoney() {
    this.money = []
    let tid = this.tournament['_id']
    this.tournamentService.getMoney(tid).subscribe(money => {
      let mtemp = money.money;
      for (var i in mtemp) {
        let p = this.getPlayer(i)
        let m = Math.floor(mtemp[i] * 100) / 100
        this.money.push({ name: p.name, money: m, deposit: p.deposit, open: Math.floor((p.deposit + m) * 100) / 100 })
      }
    },
      err => {
        console.log(err);
        return false;
      });
    console.log(this.money)
  }


  getPlayer(pid) {
    console.log(this.tournament)
    let ret = Object.assign({}, this.tournament['players'].find(function (element) {
      return element._id == pid;
    }))
    ret.pid = ret._id
    delete ret._id
    return ret
  }

}