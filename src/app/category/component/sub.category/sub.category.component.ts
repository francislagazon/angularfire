import { Component } from '@angular/core';
import { ActivatedRoute, Router, Params} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase';

import { UserData } from './../../../provider/AuthUser.service';
import { ForumData } from './../../../provider/Forum.service'

import { USERS_KEY_FORMAT, FORUM_KEY_FORMAT } from "./../../../provider/interface";


@Component({
    selector: 'app-sub-category',
    templateUrl: './sub.category.component.html'
})

export class SubCategoryComponent {

    private forumVar : FORUM_KEY_FORMAT = <FORUM_KEY_FORMAT> {};
    private userVar:USERS_KEY_FORMAT = <USERS_KEY_FORMAT>{};

    form: FormGroup;
    ob : Object = {};
    

    constructor(private activatedRoute: ActivatedRoute, fb: FormBuilder, private router: Router, db: AngularFireDatabase, private uData: UserData, private fData: ForumData) {
        if(!uData.pageSession) {
            router.navigate(['/login']);
        }
            
        this.activatedRoute.params.subscribe((params: Params) => {
            this.forumVar.catId = params['catId'];

            db.database.ref().child('category')
            .orderByChild('parent').equalTo(params['catId'])
            .once('value', u => {
                this.ob = u.val();
            });
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
    
    onSubmit() {
        this.userVar.loading = true;
        let passData = {
                category:           this.form.value.SubcategoryName,
                description:        this.form.value.description,
                parent:             this.form.value.parent
        }
        this.fData.categorySubAdd(passData)
        .subscribe((success) => {
            this.userVar.loading = false;
            this.router.navigate(['/category']);
        }, e =>console.log(e));
    }

    catDelete(id) {
        this.userVar.loading = true;
        this.fData.deleteCategory(id)
        .subscribe((success) => {
            this.userVar.loading = false;
            this.router.navigate(['/action/']);
        }, e =>console.log(e));
    }
}