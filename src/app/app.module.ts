import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { AppComponent } from './app.component';
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AdminComponent } from "./admin/admin.component";
import { ForumComponent } from "./forum/forum.component";
import { NavigationComponent } from "./navigation/nav.component";
import { LoginComponent, RegisterComponent, ForgotPasswordComponent } from "./auth/auth.component";
import { ProfileComponent, ProfileEditComponent } from "./profile/profile.component";
import { UsersComponent, TrashComponent } from "./users/users.component";
import { CategoryComponent } from "./category/category.component";
import { NewCategoryComponent } from "./category/component/new.category/new.category.component";
import { SubCategoryComponent } from "./category/component/sub.category/sub.category.component";
import { NewSubCategoryComponent } from "./category/component/sub.category/new.sub.category/new.sub.category.component";



import { PageNotFoundComponent } from "./404/404.component";

import { environment } from "./../environments/environment";

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { UserData } from "./provider/AuthUser.service";
import { ForumData } from './provider/Forum.service'

import { USERS_KEY_FORMAT } from "./provider/interface";

const appRoutes:Routes = [
  { path: "",                     component: DashboardComponent },
  { path: "admin",                component: AdminComponent },
  { path: "login",                component: LoginComponent },
  { path: "register",             component: RegisterComponent },
  { path: "forgot",               component: ForgotPasswordComponent },
  { path: "users",                component: UsersComponent },
  { path: "trash",                component: TrashComponent }, 
  { path: "profile",              component: ProfileComponent },
  { path: "users/edit/:userId",   component: ProfileEditComponent },
  { path: "profile/edit/:userId", component: ProfileEditComponent },
  { path: "category",             component: CategoryComponent },
  { path: "category/new",         component: NewCategoryComponent },
  { path: "category/new/:catId",  component: NewSubCategoryComponent },
  { path: "forum",                component: ForumComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AdminComponent,
    NavigationComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    UsersComponent,
    TrashComponent,
    ProfileComponent,
    ProfileEditComponent,
    PageNotFoundComponent,
    CategoryComponent,
    NewCategoryComponent,
    SubCategoryComponent,
    NewSubCategoryComponent,
    ForumComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes, { useHash : false }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule
  ],
  providers: [AngularFireAuth, UserData, ForumData],
  bootstrap: [AppComponent]
})
export class AppModule { }
