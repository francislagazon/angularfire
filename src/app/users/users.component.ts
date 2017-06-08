import { Component } from "@angular/core";
import { Router } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { UserData } from './../provider/AuthUser.service'

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
})

export class UsersComponent {

    users: FirebaseListObservable<any>;
    constructor( db: AngularFireDatabase, private router: Router, private uData: UserData) {
        if(uData.loggedin != "Logged In") {
            router.navigate(['/login']);
        }      
        this.users = db.list('/users');
    }
    
    userDelete(uid) {
        this.uData.userTrash(uid, 1)
        .subscribe((success) => {
            this.router.navigate(['/users']);
        }, e =>console.log(e));
    }
}