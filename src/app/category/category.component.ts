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

    category: FirebaseListObservable<any>;
    catListing: string;

    ob : Object = {};

    constructor(private router: Router, db: AngularFireDatabase, private uData: UserData) {
        if(!uData.pageSession) {
            router.navigate(['/login']);
        }

        this.category = db.list('/category');
        
        db.database.ref().child('category')
            .orderByChild('parent').equalTo('0')
            .once('value', u => {
                this.ob = u.val();
            });                    
    }

      get ObjectKeys() {
          return Object.keys( this.ob );
  }

}

