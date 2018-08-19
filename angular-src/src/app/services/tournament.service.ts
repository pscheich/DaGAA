import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map'
@Injectable()
export class TournamentService {
  user: any;
  isDev: boolean;


  constructor(private http: Http) {
    this.isDev = true; // Change to false before deployment
  }


  //-------------Tunier---------------------Tunier--------------------
  addTournament(tournament) {
    let headers = new Headers();
    
   
    headers.append('Content-Type', 'application/json');
    let ep = this.prepEndpoint('api/tournament');
    return this.http.post(ep, tournament, { headers: headers })
      .map(res => res.json());
  }
  getTournamentn() {
    let headers = new Headers();
    
   
    headers.append('Content-Type', 'application/json');
    let ep = this.prepEndpoint('api/tournament');
    return this.http.get(ep, { headers: headers })
      .map(res => res.json());
  }
  getTournament(id) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let ep = this.prepEndpoint('api/tournament/' + id);
    return this.http.get(ep, { headers: headers })
      .map(res => res.json());
  }
  delTournament(id) {
    console.log('delTunier: ' + id);
    let headers = new Headers();
    
   
    headers.append('Content-Type', 'application/json');
    let ep = this.prepEndpoint('api/tournament/' + id);
    return this.http.delete(ep, { headers: headers })
      .map(res => res.json());
  }
  editTournament(tournament) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let ep = this.prepEndpoint('api/tournament');
    return this.http.patch(ep, tournament, { headers: headers })
      .map(res => res.json());
  }
  addPlayer(tid,player) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let ep = this.prepEndpoint('api/tournament/addplayer');
    return this.http.patch(ep, {tid,player}, { headers: headers })
      .map(res => res.json());
  }
  delPlayer(tid,pid) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let ep = this.prepEndpoint('api/tournament/delplayer');
    return this.http.patch(ep, {tid,pid}, { headers: headers })
      .map(res => res.json());
  }
  sendMoney(tid,player) {
    let headers = new Headers();
    let pid = player['_id']
    let deposit = player['deposit']
    headers.append('Content-Type', 'application/json');
    let ep = this.prepEndpoint('api/tournament/sendMoney');
    return this.http.patch(ep, {tid,pid,deposit}, { headers: headers })
      .map(res => res.json());
  }
  addBill(tid,bill) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let ep = this.prepEndpoint('api/tournament/addbill');
    return this.http.patch(ep, {tid,bill}, { headers: headers })
      .map(res => res.json());
  }
  editBill(tid,bill) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let ep = this.prepEndpoint('api/tournament/editbill');
    return this.http.patch(ep, {tid,bill}, { headers: headers })
      .map(res => res.json());
  }
  delBill(tid,bid) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let ep = this.prepEndpoint('api/tournament/delbill');
    return this.http.patch(ep, {tid,bid}, { headers: headers })
      .map(res => res.json());
  }
  addStuff(tid,stuff) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let ep = this.prepEndpoint('api/tournament/addstuff');
    return this.http.patch(ep, {tid,stuff}, { headers: headers })
      .map(res => res.json());
  }
  delStuff(tid,sid) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let ep = this.prepEndpoint('api/tournament/delstuff');
    return this.http.patch(ep, {tid,sid}, { headers: headers })
      .map(res => res.json());
  }
  getMoney(tid) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let ep = this.prepEndpoint('api/tournament/getmoney/' + tid);
    return this.http.get(ep, { headers: headers })
      .map(res => res.json());
  }
  prepEndpoint(ep) {
    if (this.isDev) {
      return ep;
    } else {
      return 'http://localhost:8080/' + ep;
    }
  }


}