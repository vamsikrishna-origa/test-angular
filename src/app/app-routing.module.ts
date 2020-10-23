import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateUserComponent } from './create-user/create-user.component';
import { UserDetailsComponent } from './user-details/user-details.component';


const routes: Routes = [
  {path: '', redirectTo: 'create-user', pathMatch:'full'},
  {path: 'create-user', component: CreateUserComponent},
  {path: 'user-details', component: UserDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
