export class AuthenticationHistory {
    constructor(
        public id: string,
        public userId: string,
        public authenticationType: string,
        public ipAddress: string,
        public userAgent: string,
        public isAuthenticationResultSuccess: boolean,
        public creationTime: Date
    ) {

    }
}
