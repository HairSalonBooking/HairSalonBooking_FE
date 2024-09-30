export interface IUser {
    id: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    address: string | null;
    phoneNumber: string | null;
    gender: string | null;
    image: string | null;
    refreshToken: string;
    roleId: string;
    positionId: string | null;
    resetPasswordToken: string | null;
    resetPasswordExpires: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface IEditUser {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    phone: string;
    birthday: string;

}
