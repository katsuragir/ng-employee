import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-header',
  imports: [
    CommonModule, MatIconModule, MatButtonModule
  ],
  providers: [DatePipe],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  @Output() toggleSidebar = new EventEmitter<void>();
  currentDate = new Date();

  onToggle() {
    this.toggleSidebar.emit();
  }
}
