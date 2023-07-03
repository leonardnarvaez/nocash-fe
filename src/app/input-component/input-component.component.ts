import {Component} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-input-component',
  templateUrl: './input-component.component.html',
  styleUrls: ['./input-component.component.css'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, NgIf, MatButtonModule, MatIconModule],
})
export class InputComponentComponent {
  value = '';
}
