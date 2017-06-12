import { Component, OnInit } from "@angular/core";
import {Router, ActivatedRoute, Params} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase';

import { UserData } from "./../../../provider/AuthUser.service";
import { USERS_KEY_FORMAT } from "./../../../provider/interface";

@Component({
    selector: 'app-edit',
    templateUrl: './profileEdit.component.html'
})

export class ProfileEditComponent {

    private userVar:USERS_KEY_FORMAT = <USERS_KEY_FORMAT>{};

    form: FormGroup;
    users: FirebaseListObservable<any>;

    constructor(private activatedRoute: ActivatedRoute, db: AngularFireDatabase, fb: FormBuilder, private router: Router, public uData: UserData) {
        if(uData.loggedin != "Logged In") {
            router.navigate(['/login']);
        }
        this.users = db.list('/users');
        this.userVar.folder = "images";
        
        this.form = fb.group({
            userUID:    ['', Validators.required], 
            fullName:   ['', Validators.required],
            email:      ['', Validators.required],
            phoneNo:    ['', Validators.required],
            role:       ['Guest', Validators.required],
            gravatar:   ['', Validators.required]
        });

        this.activatedRoute.params.subscribe((params: Params) => {

            this.userVar.userId = params['userId'];

            if(this.userVar.userId) {
                let getData = this.userVar.userId;
                this.userVar.userDetail = db.list('/users/'+ getData )
                    .subscribe(req =>  {
                        for(let uIndex of req) {
                            if(uIndex.$key == "fullName")   { this.userVar.fullName = uIndex.$value;    }
                            if(uIndex.$key == "email")      { this.userVar.email = uIndex.$value;       }
                            if(uIndex.$key == "phoneNo")    { this.userVar.phoneNo = uIndex.$value;     }
                            if(uIndex.$key == "role")       { this.userVar.role = uIndex.$value;        }
                            if(uIndex.$key == "gravatar")   { this.userVar.gravatar = uIndex.$value;        }
                        }
                        this.form.patchValue({
                            userUID:    this.userVar.userId,
                            fullName:   this.userVar.fullName, 
                            email:      this.userVar.email, 
                            phoneNo:    this.userVar.phoneNo,
                            role:       this.userVar.role,
                            gravatar:   this.userVar.gravatar
                        })
                    }); 
            }
        });
    }

    onSubmit() {
        this.userVar.loading = true;
        console.log(this.form.value.gravatar);
        let passData = {
                fullName:   this.form.value.fullName,
                email:      this.form.value.email,
                phoneNo:    this.form.value.phoneNo,
                role:       this.form.value.role,
                gravatar:   this.form.value.gravatar,
        }
        this.uData.userUpdate(this.form.value.userUID, passData)
        .subscribe((success) => {
            this.userVar.loading = false;
            this.router.navigate(['/action']);
        }, e =>console.log(e));
    }

    onChangeFileUpload( fileInput ) {
        this.userVar.loading = true;
        let file = fileInput.files[0];

        let storageRef = firebase.storage().ref();
        let path = `/${this.userVar.folder}/${this.form.value.userUID}/${file.name}`;
        let iRef = storageRef.child(path);

        iRef.put(file).then((snapshot) => {
            this.userVar.loading = false;
            this.form.patchValue({
                gravatar: snapshot.downloadURL
            })
        });
    }
}

