
export interface IBooking {
    id: number;
    statusId: string;
    stylistId: number;
    customerId: number;
    date: string;
    timeType: string;
    token: string;
    createdAt: string;
    updatedAt: string;
    stylistDataBooking: IStylistDataBooking;
    customerData: ICustomerData;
    timeTypeDataBooking: ITimeTypeDataBooking;
    errCode: number;
    errMsg: string;
}

interface ICustomerData {
    email: string;
    firstName: string;
    lastName: string;
    address: string;
}

interface ITimeTypeDataBooking {
    valueEn: string;
    valueVi: string;
}
interface IStylistDataBooking {
    email: string;
    firstName: string;
    lastName: string;
    address: string | null;
    gender: string | null;
    genderData: string | null;
}
export interface IBookingRequest {
    amount: number;
    date: number;
    email: string;
    fullName: string;
    note: string;
    phone: string;
    serviceIds: number[];
    stylistId: string;
    stylistName: string;
    timeString: string;
    timeType: string;
    pointsToUse: number;
    usePoints: boolean;
}