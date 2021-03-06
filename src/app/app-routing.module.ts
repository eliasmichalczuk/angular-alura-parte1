import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PhotoListComponent } from './photos/photo-list/photo-list.component';
import { PhotoFormComponent } from './photos/photo-form/photo-form.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { PhotoListResover } from './photos/photo-list/photo-list.resolver';
import { AuthGuard } from './core/auth/auth.guard';
import { PhotoDetailsComponent } from './photos/photo-details/photo-details.component';
import { GlobalErrorComponent } from './errors/global-error/global-error.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  { path: 'home',
    loadChildren: './home/home.module#HomeModule'
  },
  { path: 'user/:userName', component:  PhotoListComponent,
    resolve: {
    photos: PhotoListResover
    },
    data: {
      title: 'Timeline'
    }
  },
  { path: 'p/add', component:  PhotoFormComponent, canActivate: [AuthGuard],
    data: { title : 'Photo upload'}
  },
  { path: 'p/:id', component:  PhotoDetailsComponent, canActivate: [AuthGuard],
    data: { title : 'Photo detail'}
  },
  { path: 'not-found', component:  NotFoundComponent,
    data: { title : 'Not found'}
  },
  { path: 'error', component:  GlobalErrorComponent,
    data: { title : 'Not found'}
  },
  { path: '**', redirectTo: 'not-found'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {/*useHash: true*/})],
  // use hash utilizado para que navegadores que nao suportam o historyAPI, nao acessem o backend direto
  exports: [RouterModule]
})
export class AppRoutingModule { }
