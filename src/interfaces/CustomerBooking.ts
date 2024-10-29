export interface ICustomerBooking {
    id: number;
    statusId: string;
    stylistId: number;
    customerId: number;
    date: string;
    timeType: string;
    token: string;
    pointsAwarded: boolean;
    createdAt: string;
    updatedAt: string;
    customerData: ICustomerData;
    stylistDataBooking: IStylistDataBooking;
    timeTypeDataBooking: ITimeTypeDataBooking;
    services: IService[];
}
interface ICustomerData {
    email: string;
    firstName: string;
    address: string | null;
    gender: string | null;
    genderData: string | null;
}

interface IStylistDataBooking {
    email: string;
    firstName: string;
    lastName: string;
    address: string | null;
    gender: string | null;
    genderData: string | null;
}

interface ITimeTypeDataBooking {
    valueEn: string;
    valueVi: string;
}

interface IService {
    name: string;
}

