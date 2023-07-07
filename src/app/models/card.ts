export class Card {
    constructor(
        public id?: string,
        public name?: String,
        public accountNumber?: String,
        public expiryDate?: String,
        public cvv?: String,
        public createdDate?: Date,
        public color?: string,
    ){ }
}
