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

    constructor(private activatedRoute: ActivatedRoute, fb: FormBuilder, private router: Router, db: AngularFireDatabase, private uData: UserData, private fData: ForumData) {
        if(!uData.pageSession) {
            router.navigate(['/login']);
        }
        

        this.form = fb.group({
            SubcategoryName:    ['', Validators.required],
            description:        ['', Validators.required],
            parent:             ['0', Validators.required]
        });      

        this.activatedRoute.params.subscribe((params: Params) => {
            this.forumVar.catId = params['catId'];
            db.list('/category'+ this.forumVar.catId )
                .subscribe(req =>  {    
                    for(let uIndex of req) {
                        if(uIndex.$key == "category")   { this.forumVar.name = uIndex.$value; }
                    }
                    this.form.patchValue({
                        parent:      this.forumVar.catId
                    })
                });
        });
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
}