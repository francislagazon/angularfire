import { Component } from '@angular/core';
import { Router, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CategoryComponent } from './../category/category.component'

import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase';

import { UserData } from './../provider/AuthUser.service';

import { ForumData } from './../provider/Forum.service'

import { USERS_KEY_FORMAT, FORUM_KEY_FORMAT } from "./../provider/interface";

@Component({
    selector: 'app-forum',
    templateUrl: './forum.component.html'
})

export class ForumComponent {
    
    private forumVar : FORUM_KEY_FORMAT = <FORUM_KEY_FORMAT> {};
    private userVar:USERS_KEY_FORMAT = <USERS_KEY_FORMAT>{};
    ob : Object = {};

    constructor(private router: Router, db: AngularFireDatabase, private uData: UserData, private fData: ForumData) {
        if(!uData.pageSession) {
            router.navigate(['/login']);
        }

        db.database.ref().child('config')
            .once('value', u => {
                this.ob = u.val();
            });   
    }

    get ObjectKeys() {
        return Object.keys( this.ob );
    }
    
    catDelete(id) {
        this.userVar.loading = true;
        this.fData.deleteForumConfig(id)
        .subscribe((success) => {
            this.userVar.loading = false;
            this.router.navigate(['/action/']);
        }, e =>console.log(e));
    }

}