export interface ITime {
    id: number;
    keyMap: string;
    type: string;
    valueEn: string;
    valueVi: string;
    createdAt: string;
    updatedAt: string;
}

export interface ITimeBooking {
    id: number;
    currentNumber?: number | null;
    maxNumber?: number | null;
    date: string;
    timeType: string;
    stylistId: number;
    createdAt: string;
    updatedAt: string;
    timeTypeData: ITimeTypeData;
}
interface ITimeTypeData {
    valueEn: string;
    valueVi: string;
}
