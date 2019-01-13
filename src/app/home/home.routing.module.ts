import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from '../core/auth/auth.guard';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  { path: '',
  component:  HomeComponent,
  canActivate: [AuthGuard],
  children: [
      { path: '',
      component:  SigninComponent,
      },
      { path: 'signup',
      component:  SignupComponent,
      },
    ]
  }
];

@NgModule({
    // usa-se for child em rota de lazy loading
  imports: [RouterModule.forChild(routes)],
  // use hash utilizado para que navegadores que nao suportam o historyAPI, nao acessem o backend direto
  exports: [RouterModule]
})
export class HomeRoutingModule { }
