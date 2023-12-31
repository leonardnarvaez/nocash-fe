import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Card } from 'src/app/models/card';
import { CardService } from 'src/app/services/card.service';
import { NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { CreditCardValidators, CreditCard } from 'angular-cc-library';
import { defer } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-add-card-form',
  templateUrl: './add-card-form.component.html',
  styleUrls: ['./add-card-form.component.css']
})
export class AddCardFormComponent {
  card: Card = new Card();
  @Output() cardCreated = new EventEmitter<Card>();
  cardForm: FormGroup;

  public type$ = defer(() => this.cardForm.get('accountNumber')?.valueChanges ?? [])
  .pipe(map((num: string) => CreditCard.cardType(num)));
  constructor(
    private cardService: CardService,
    private fb: FormBuilder,
    private ngZone: NgZone,
    private router: Router,
    private location: Location
    ) {
      this.cardForm = this.fb.group(
        {
          accountNumber: ['', [Validators.required, CreditCardValidators.validateCCNumber]],
          name: ['', Validators.required],
          expiryDate: ['', [CreditCardValidators.validateExpDate, Validators.pattern('^(0[1-9]|1[0-2])\/([0-9]{2})$'), this.expiryDateValidator]],
          cvv: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3), Validators.pattern('[0-9]{3}')]]
        }
      )
    }

  createCard() {
    if (this.cardForm.invalid) {
      return;
    }
    console.log(this.cardForm.value);
    this.cardService.save(this.cardForm.value).subscribe(
      (response: Card) => {
        console.log('Card added successfully:', response);
        this.cardCreated.emit(this.cardForm.value);
        this.ngZone.run(() => this.router.navigateByUrl("/app/cards"));
      },
      error => {
        console.error('Failed to add card:', error);
        alert(`Failed to add card: ${error['error']['message']}`)
      }
    );
  }

  goBack() {
    this.location.back();
  }

  public goToNextField(controlName: string, nextField: HTMLInputElement) {
    if (this.cardForm.get(controlName)?.valid) {
      nextField.focus();
    }
  }

  resetAccountNumber() {
    this.cardForm.get('accountNumber')?.setValue('');
    this.cardForm.get('accountNumber')?.setErrors(null);
  }

  expiryDateValidator(control: AbstractControl) {
    const stringDate: string[] = control.value.split("/")
    const date = new Date();
    const monthNow = date.getMonth();
    const yearNow = parseInt(date.getFullYear().toString().substring(2));
  
    //example is 06 or 11
    const monthInput = parseInt(stringDate[0]);

    const yearInput = parseInt(stringDate[1]);

    //0628 //0724
    if (!(yearInput > yearNow || (yearInput === yearNow && monthInput > monthNow))){
      return { notExpired: true}
    }
    return null;
  }
}
