export class ContactModel {
    constructor(
        public title: string,
        public lastName: string,
        public organisation: string,
        public twitterHandle: string,
        public rationale: string,
        public geography: string,
        public category: string,
        public contactType: string,
        public attitude: string,
        public influence: Number,
        public firstName?: string,
        public subjectOfInterest?: string,
        public changesInPosition?: string,
        public comments?: string,
        public _id?: string) {}
}
