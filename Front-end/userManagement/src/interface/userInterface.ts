export interface RegisterUser  {
    name : string,
    email : string,
    password : string,
    profilePicture ?: string,
    confirmPassword ?: string,
}   

export interface loginUser {
    email : string,
    password : string,
}