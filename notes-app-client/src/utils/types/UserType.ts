export interface UserType {
    status: number
    message: string
    data: User
}

export interface User {
    id: string
    name: string
    email: string
}
