import { Component } from '@angular/core';
import { ActivatedRoute, Router, Params} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase';

import { UserData } from './../../../provider/AuthUser.service';
import { ForumData } from './../../../provider/Forum.service'

import { USERS_KEY_FORMAT, FORUM_KEY_FORMAT } from "./../../../provider/interface";

@Component({
    selector: 'app-new-category',
    templateUrl: './new.category.component.html'
})

export class NewCategoryComponent {

    private userVar:USERS_KEY_FORMAT = <USERS_KEY_FORMAT>{};
    private forumVar : FORUM_KEY_FORMAT = <FORUM_KEY_FORMAT> {};
    form: FormGroup;
    category: FirebaseListObservable<any>;



    constructor(db: AngularFireDatabase, private activatedRoute: ActivatedRoute, private router: Router, fb: FormBuilder, private uData: UserData, private fData: ForumData) {
        if(!uData.pageSession) {
            router.navigate(['/login']);
        }
        this.form = fb.group({
            forumId:            ['', Validators.required],
            categoryName:       ['', Validators.required], 
            description:        ['', Validators.required],
            parent:             ['0', Validators.required]
        });

        this.activatedRoute.params.subscribe((params: Params) => {
            this.forumVar.forumId = params['forumId'] ? params['forumId'] : null;
            this.forumVar.catId = params['catId'] ? params['catId'] : null;

                if(this.forumVar.forumId && this.forumVar.catId) {
                    db.database.ref().child('category/'+ this.forumVar.catId)
                    .once('value', u => {
                        console.log(u.val());
                        this.form.patchValue({
                            forumId:            [u.val().forumID],
                            categoryName:       [u.val().category],
                            description:        [u.val().description],
                            parent:             [u.val().parent]
                        })
                    });   
                }
                this.form.patchValue({
                    forumId:            params['forumId']
                })
            
            
        });
    }
    
    onSubmit() {
        this.userVar.loading = true;
        let passData = {
                forumID:        this.form.value.forumId,
                category:       this.form.value.categoryName,
                description:    this.form.value.description,
                parent:         this.form.value.parent
        }
        console.log(this.form.value.forumId);
        this.fData.categoryAdd(passData)
        .subscribe((success) => {
            this.userVar.loading = false;
            this.router.navigate(['/category/'+this.form.value.forumId]);
        }, e =>console.log(e));
    }

}