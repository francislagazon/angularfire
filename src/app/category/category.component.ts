import { Component } from '@angular/core';
import { ActivatedRoute, Router, Params} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase';

import { UserData } from './../provider/AuthUser.service';
import { ForumData } from './../provider/Forum.service'

import { USERS_KEY_FORMAT, FORUM_KEY_FORMAT } from "./../provider/interface";


@Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
})

export class CategoryComponent {

    private userVar:USERS_KEY_FORMAT = <USERS_KEY_FORMAT>{};
    private forumVar : FORUM_KEY_FORMAT = <FORUM_KEY_FORMAT> {};

    category: FirebaseListObservable<any>;
    catListing: string;

    ob : Object = {};
    fid: string;
    constructor(private activatedRoute: ActivatedRoute, private router: Router, db: AngularFireDatabase, private uData: UserData, private fData: ForumData) {
        if(!uData.pageSession) {
            router.navigate(['/login']);
        }
        
        this.activatedRoute.params.subscribe((params: Params) => {
            this.forumVar.catId = params['forumId'];
            this.fid = params['forumId']
             db.database.ref().child('category')
            .orderByChild('forumID').equalTo(this.forumVar.catId)
            .once('value', u => {
                this.ob = u.val();
            });   
                
        });

                        
    }

    catDelete(id) {
        this.userVar.loading = true;
        this.fData.deleteCategory(id)
        .subscribe((success) => {
            this.userVar.loading = false;
            this.router.navigate(['/action/']);
        }, e =>console.log(e));
    }

    get ObjectKeys() {
        return Object.keys( this.ob );
    }

}

