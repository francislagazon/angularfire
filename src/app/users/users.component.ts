import { Component } from "@angular/core";
import { Router } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { UserData } from './../provider/AuthUser.service'
//import * as admin from "firebase-admin";
//import { firebaseadmin } from "./../provider/firebase";

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

        
        /*
        admin.initializeApp({
        credential: admin.credential.cert(firebaseadmin),
        databaseURL: "https://forum-29208.firebaseio.com"
        });

        // As an admin, the app has access to read and write all data, regardless of Security Rules
        var admindb = admin.database();
        var ref = admindb.ref("restricted_access/secret_document");
        ref.once("value", function(snapshot) {
        console.log(snapshot.val());
        });*/
    }
    
    userDelete(uid) {
        this.uData.userTrash(uid, 1)
        .subscribe((success) => {
            this.router.navigate(['/users']);
        }, e => alert("Failed to Delete User"));
    }
}