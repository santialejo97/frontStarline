import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableModule } from 'primeng/table';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
  declarations: [],
  imports: [CommonModule, TableModule, SelectButtonModule, TooltipModule],
  exports: [TableModule, SelectButtonModule, TooltipModule],
})
export class PrimengModule {}
