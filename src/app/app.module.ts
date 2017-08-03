import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { CardComponent } from './card/card.component';
import { PadComponent } from './pad/pad.component';
import { SearchComponent } from './search/search.component';

import { DataService } from './service/data.service';


@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    CardComponent,
    PadComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
