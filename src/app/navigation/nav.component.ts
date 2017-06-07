import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { UserData } from './../provider/AuthUser.service'

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html'
})

export class NavigationComponent {
    public login: any;
    public userEmail: any;
    public userUID: any;

    constructor(private afAuth: AngularFireAuth, private router: Router, private uData: UserData) {
        this.afAuth.auth.onAuthStateChanged(fireBaseUser => {
            if(fireBaseUser) {

                this.login = fireBaseUser.uid
                this.userEmail = fireBaseUser.email;
                this.userUID = fireBaseUser.uid;
               
            } else {
                this.login = "";
                console.log("No Info");
            }
        })
    }

    navigation = [
        { page: "Admin", url: '/admin' },
        { page: "Forum", url: '/forum' },
       // { page: "User Management", url: '/users' },
       // { page: "Category", url: '/category' }
    ];
    btnLogout() {
        this.uData.userLogout()
        .subscribe((success) => {
            this.router.navigate(['/login']);
        }, e =>console.log(e));
    
}
}