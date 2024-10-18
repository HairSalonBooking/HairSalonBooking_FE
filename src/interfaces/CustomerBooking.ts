export interface ICustomerBooking {
    id: number;
    statusId: string;
    stylistId: number;
    customerId: number;
    date: string; // date in milliseconds since UNIX epoch
    timeType: string;
    token: string;
    pointsAwarded: boolean;
    createdAt: string; // ISO 8601 date format
    updatedAt: string; // ISO 8601 date format
    customerData: ICustomerData;
    timeTypeDataBooking: {
        valueEn: string;
        valueVi: string;
    };
}

interface ICustomerData {
    email: string;
    firstName: string;
    address: string | null;
    gender: string | null;
    genderData: string | null;
}
