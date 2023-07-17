import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CONTENT_ROUTES } from './content-pages/content-layout.routes';
import { AuthGuard } from './shared/auth-guard.service';
import { FULL_ROUTES } from './full-pages/full-layout.routes';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
const routes: Routes = [
  {
    path: "app",
    children: FULL_ROUTES,
    canActivate: [AuthGuard],
  },
  {
    path: '',
    children: CONTENT_ROUTES
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
