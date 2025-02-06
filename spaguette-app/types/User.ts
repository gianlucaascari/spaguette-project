type AuthUser = {
    token: string,
    user: User,
}

type User = {
    id: string,
    name: string,
    email: string,
}

type SignInInput = {
    email: string,
    password: string,
}

type SignUpInput = {
    name: string,
    email: string,
    password: string,
}