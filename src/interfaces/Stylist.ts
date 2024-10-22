export interface IStylist {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    address: string | null;
    phoneNumber: number;
    gender: string | null;
    image: string;
    refreshToken: string | null;
    roleId: string;
    positionId: string;
    resetPasswordToken: string | null;
    resetPasswordExpires: string | null;
    points: number;
    status: string;
    createdAt: string;
    updatedAt: string;
    salaryData: ISalaryData;
}
export interface ISalaryData {
    TotalSalary: string;
    BaseSalary: string;
    Bonuses: string;
    Month: number;
    Year: number;
    PaidOn: string | null;
}

