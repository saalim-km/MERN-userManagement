export interface RegisterUser  {
    name : string,
    email : string,
    password : string,
    profilePicture ?: string,
    confirmPassword ?: string,
}   

export interface UpdateUser {
    name : string,
    profileImage : string,
    email ?: string
}

export interface loginUser {
    email : string,
    password : string,
}

export interface IUser {
    _id ? : string
    name : string,
    email : string,
    password : string,
    isAdmin : boolean,
    profileImage ?: string,
}