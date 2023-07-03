import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CONTENT_ROUTES } from './content-pages/content-layout.routes';
import { AuthGuard } from './shared/auth-guard.service';
import { FULL_ROUTES } from './full-pages/full-layout.routes';
import { NotFoundComponent } from './not-found.component';
const routes: Routes = [
  {
    path: "",
    children: FULL_ROUTES,
    canActivate: [AuthGuard],
  },
  {
    path: '',
    children: CONTENT_ROUTES
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
