import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';

import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';

import { UserData } from "./../provider/AuthUser.service";
import { USERS_KEY_FORMAT, FORUM_KEY_FORMAT } from "./../provider/interface";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['profile.component.css']
})

export class ProfileComponent {
    
    private userVar:USERS_KEY_FORMAT = <USERS_KEY_FORMAT>{};
    private forumVar : FORUM_KEY_FORMAT = <FORUM_KEY_FORMAT> {};

    ob : Object = {};
    snapshot: any;
    constructor(db: AngularFireDatabase, private uData: UserData, router: Router) {
        if(uData.loggedin != "Logged In") {
            router.navigate(['/login']);
        }
        
        //this.userVar.userDetail = db.list('/users/'+ uData.profileID )  

        db.database.ref().child("users")
            .orderByChild('uid').equalTo(uData.profileID)
            .once('value', u => {
                if(u.val()) {
                this.ob = u.val();
                let x = Object.keys(this.ob);                
                this.userVar.userKey    = x[0] ? x[0] : ""; 
                this.userVar.fullName   = this.ob[x[0]].fullName ?this.ob[x[0]].fullName : ""; 
                this.userVar.email      = this.ob[x[0]].email ? this.ob[x[0]].email : "";   
                this.userVar.phoneNo    = this.ob[x[0]].phoneNo ? this.ob[x[0]].phoneNo : "";    
                this.userVar.role       = this.ob[x[0]].role ? this.ob[x[0]].role : "";    
                this.userVar.gravatar   = this.ob[x[0]].gravatar ? this.ob[x[0]].gravatar : ""; 
                }
            });
    }

    get ObjectKeys() {
        if(this.ob) {
            this.forumVar.noResult = false;
            return Object.keys( this.ob );
        } else {
            this.forumVar.noResult = true
        }
        
    }


}