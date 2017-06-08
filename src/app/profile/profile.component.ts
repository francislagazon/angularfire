import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';

import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';

import { UserData } from "./../provider/AuthUser.service";
import { USERS_KEY_FORMAT } from "./../provider/interface";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['profile.component.css']
})

export class ProfileComponent {
    
    private userVar:USERS_KEY_FORMAT = <USERS_KEY_FORMAT>{};
    
    constructor(db: AngularFireDatabase, private uData: UserData, router: Router) {
        if(uData.loggedin != "Logged In") {
            router.navigate(['/login']);
        }
        
        this.userVar.userDetail = db.list('/users/'+ uData.profileID )
        .subscribe(req =>  {
            for(let uIndex of req) {
                if(uIndex.$key == "uid")        {   this.userVar.userKey    = uIndex.$value;    }
                if(uIndex.$key == "fullName")   {   this.userVar.fullName   = uIndex.$value;    }
                if(uIndex.$key == "email")      {   this.userVar.email      = uIndex.$value;    }
                if(uIndex.$key == "phoneNo")    {   this.userVar.phoneNo    = uIndex.$value;    }
                if(uIndex.$key == "role")       {   this.userVar.role       = uIndex.$value;    }
                if(uIndex.$key == "gravatar")   {   this.userVar.gravatar   = uIndex.$value;    }
            }
        }); 
    }

}