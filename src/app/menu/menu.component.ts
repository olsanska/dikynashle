import {EventEmitter, Inject} from '@angular/core';
import {Component, OnInit, Output} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from "@angular/material/bottom-sheet";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @Output() public closeMenuEvent = new EventEmitter();

  public closeMenu() {
    this.closeMenuEvent.emit();
  }

  public downloadApp() {

  }

  ngOnInit(): void {
  }

}
