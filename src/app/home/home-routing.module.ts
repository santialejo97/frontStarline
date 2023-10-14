import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { FeatureComponent } from './pages/feature/feature.component';
import { AboutUsComponent } from './pages/service/about-us.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AdminComponent } from './pages/admin/admin.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'feature',
    component: FeatureComponent,
  },
  {
    path: 'service/:id',
    component: AboutUsComponent,
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
