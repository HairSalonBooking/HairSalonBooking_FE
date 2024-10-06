export interface IStylist {
    id: number;
    email: string;
    firstName: string;
    lastName: string | null;
    address: string;
    phoneNumber: string | null;
    gender: string;
    image: string;
    roleId: string;
    positionId: string | null;
    createdAt: string;
    updatedAt: string;
}
