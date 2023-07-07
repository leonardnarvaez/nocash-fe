import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Card } from 'src/app/models/card';
import { CardService } from 'src/app/services/card.service';
import { NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-card-form',
  templateUrl: './add-card-form.component.html',
  styleUrls: ['./add-card-form.component.css']
})
export class AddCardFormComponent {
  card: Card = new Card();
  @Output() cardCreated = new EventEmitter<Card>();
  cardForm: FormGroup;
  constructor(
    private cardService: CardService,
    private fb: FormBuilder,
    private ngZone: NgZone,
    private router: Router,
    private location: Location
    ) {
      this.cardForm = this.fb.group(
        {
          accountNumber: [""],
          name: [""],
          expiryDate: [""],
          cvv: [""]
        }
      )
    }

  createCard() {
    console.log(this.cardForm.value);
    this.cardService.save(this.cardForm.value).subscribe(
      (response: Card) => {
        console.log('Card added successfully:', response);
        this.cardCreated.emit(this.cardForm.value);
        this.ngZone.run(() => this.router.navigateByUrl("/app/cards"));
      },
      error => {
        console.error('Failed to add card:', error);
      }
    );
  }

  goBack() {
    this.location.back();
  }
}
