import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ShellComponent } from './shell.component';
import {NavbarComponent} from './navbar/navbar.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [NavbarComponent, ShellComponent]
})
export class ShellModule {}
