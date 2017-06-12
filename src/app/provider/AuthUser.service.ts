import { Injectable } from '@angular/core'
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';

@Injectable()

export class UserData {
    profileID: any = "";
    pageSession: boolean = false;
    loggedin: string;

    users: FirebaseListObservable<any>;
    constructor(private db: AngularFireDatabase, private angularFireAuth: AngularFireAuth) {
        this.users = db.list('/users');
    }
    register(email, password):Observable<firebase.User> {
        let promise = firebase.auth().createUserWithEmailAndPassword( email, password );
        return Observable.fromPromise( promise );

    }
    userloginGoogle():Observable<firebase.User> {
        let provider = new firebase.auth.GoogleAuthProvider();
        let promise = firebase.auth().signInWithPopup(provider);

        return Observable.fromPromise( promise );
    }

    userloginFacebook():Observable<firebase.User> {
        let provider = new firebase.auth.FacebookAuthProvider();
        let promise = firebase.auth().signInWithPopup(provider);

        return Observable.fromPromise( promise );
    }

    userLogin(email, password):Observable<firebase.User> {
        let promise = firebase.auth().signInWithEmailAndPassword( email, password );
        return Observable.fromPromise( promise );

    }

    userTrash(userID, trash):Observable<any> {
        let promise = this.users.update(userID, { trash: trash })
        return Observable.fromPromise( promise );
    }
    
    userUpdate(userUID, info):Observable<any> {
        
        if(typeof info.gravatar == "undefined") {
            delete info.gravatar;
        }
        let promise = this.users.update( userUID, info )
        return Observable.fromPromise( promise );
    }

    userLogout():Observable<boolean> {
        this.profileID = "";
        this.pageSession = false;
        let promise = firebase.auth().signOut();
        return Observable.fromPromise(  promise  );
    }
    forgotPassword(email):Observable<any> {
        
        let promise = firebase.auth().sendPasswordResetEmail(email);
        return Observable.fromPromise ( promise )
    }
}