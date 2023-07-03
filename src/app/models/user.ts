export class User {
    constructor(
        public mobileNumber: string,
        public emailAddress: string,
        public firstName: string,
        public lastName: string,
        public jwt: string,
        public userId: string,
    ){}
}
