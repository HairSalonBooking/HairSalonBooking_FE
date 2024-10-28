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
    stylistData: IStylistData;
    createdAt: string;
    updatedAt: string;
    timeTypeData: ITimeTypeData;
    isPast?: boolean; // Add the isPast property

}
interface ITimeTypeData {
    valueEn: string;
    valueVi: string;
}

interface IStylistData {
    firstName: string;
    lastName: string;
}

export interface ICreateScheduleRequest {
    arrSchedule: Array<{
      stylistId: number;
      date: number;
      timeType: string;
    }>;
  }