export interface ISalary {
    id: number;
    stylistId: number;
    BaseSalary: string;
    Bonuses: string;
    Month: number;
    Year: number;
    TotalSalary: string;
    PaidOn: string | null;
    createdAt: string;
    updatedAt: string;
}