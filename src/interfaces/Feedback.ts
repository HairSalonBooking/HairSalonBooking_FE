export interface ICreateFeedback {
    customerId: number;
    bookingId: number;
    comment: string;
    rating: number;
    serviceId: number;
}
export interface IFeedback {
    id: number;
    rating: number;
    comment: string;
    bookingId: number;
    userId: number;
    serviceId: number;
    createdAt: string;
    updatedAt: string;
    userFirstName: string;
    userLastName: string;
}