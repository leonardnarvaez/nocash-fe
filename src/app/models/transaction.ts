export class Transaction {
    constructor(
        public id: string,
        public amount: number,
        public transactionType: string,
        public payee: string,
        public referenceNumber: string,
        public accountNumber: string,
        public creationTime: Date
    ){}
}
