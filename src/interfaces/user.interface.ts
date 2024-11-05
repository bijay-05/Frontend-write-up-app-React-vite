export interface ISignUp {
    username: string;
    useremail: string;
    password: string;
    bio: string;
}

export interface IUser {
    id: string;
    username: string;
    useremail: string;
    bio: string;
    following: object;
}