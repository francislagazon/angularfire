import { Component } from "@angular/core";
import { Router } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { UserData } from './../../../provider/AuthUser.service'

@Component({
    selector: 'app-users-trash',
    templateUrl: './trash.component.html',
})

export class TrashComponent {
    users: FirebaseListObservable<any>;
    constructor( db: AngularFireDatabase, private uData: UserData, private router: Router) {
        if(uData.loggedin != "Logged In") {
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