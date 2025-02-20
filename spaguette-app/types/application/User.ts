export type AuthUser = {
    token: string,
    user: User,
}

export type User = {
    id: string,
    name: string,
    email: string,
}

export type SignInInput = {
    email: string,
    password: string,
}

export type SignUpInput = {
    name: string,
    email: string,
    password: string,
}