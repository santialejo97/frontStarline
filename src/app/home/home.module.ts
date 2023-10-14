import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { FeatureComponent } from './pages/feature/feature.component';
import { AboutUsComponent } from './pages/service/about-us.component';
import { AdminComponent } from './pages/admin/admin.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ComponentModule } from '../components/component.module';
import { PrimengModule } from '../primeng/primeng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipeModule } from '../pipe/pipe.module';

@NgModule({
  declarations: [
    HomeComponent,
    FeatureComponent,
    AboutUsComponent,
    AdminComponent,
    ContactComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    RouterModule,
    ComponentModule,
    PipeModule,
    PrimengModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class HomeModule {}
