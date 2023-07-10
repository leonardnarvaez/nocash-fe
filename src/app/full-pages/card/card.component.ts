import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { CardService } from 'src/app/services/card.service';
import { Card } from 'src/app/models/card';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  
})
export class CardComponent implements OnInit{
  cards: Card[] = [];
  dialogRef!: MatDialogRef<ConfirmDialogComponent>;
  constructor(private cardService: CardService, 
              private router: Router,
              private dialog: MatDialog
              ){
  }

  @Input() card!: Card;
  @Output() cardDeleted: EventEmitter<Card> = new EventEmitter<Card>();

  ngOnInit(): void {
    this.cardService.findAll().subscribe((cards: Card[]) => {
      this.cards = cards;
      console.log(cards);
    })
  }

  deleteCard(card: Card) {
    try {
      this.dialogRef.close();
    } catch(e) {
      console.log(e);
      
    }
    this.dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: {
        message: 'Are you sure you want to delete this card?',
      },
    });

    this.dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (!card.id) {
          console.error('Card ID is undefined');
          return;
        }
        this.cardService.deleteCard(card.id).subscribe(
          () => {
            console.log('Card deleted successfully');
            this.cardDeleted.emit(card);
          },
          (error) => {
            console.error('Failed to delete card:', error);
          }
        );
      }
    });
  }
}

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: 'dialog-animations-example-dialog.html',
})
export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
}
