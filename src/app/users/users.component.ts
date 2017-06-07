import { Component } from "@angular/core";
import { Router } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { UserData } from './../provider/AuthUser.service'

//------------------------------ USER COMPONENT ------------------------------//

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
})

export class UsersComponent {

    users: FirebaseListObservable<any>;
    constructor( db: AngularFireDatabase, private router: Router, private uData: UserData) {
        if(!uData.pageSession) {
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

//------------------------------ TRASH COMPONENT ------------------------------//

@Component({
    selector: 'app-users-trash',
    templateUrl: './trash.component.html',
})

export class TrashComponent {
    users: FirebaseListObservable<any>;
    constructor( db: AngularFireDatabase, private uData: UserData, private router: Router) {
        if(!uData.pageSession) {
            router.navigate(['/login']);
        }    
        this.users = db.list('/users');
    }

    userRestore(uid) {
        this.uData.userTrash(uid, 0)
        .subscribe((success) => {
            this.router.navigate(['/trash']);
        }, e =>console.log(e));
    }

}