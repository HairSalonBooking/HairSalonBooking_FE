export interface IAccount {
    id: number,
    email: string,
    firstName: string,
    lastName: string,
    roleId: string,
    accessToken: string,
    errCode: number,
    success : boolean,
    status : string,
    
}

export interface IRegister {
    email : string,
    firstName : string,
    lastName : string,
    password : string, 
    confirmPassword: string 
    success : boolean,
}