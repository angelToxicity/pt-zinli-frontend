export type User = {
    avatar?: string;
    username: string;
    name: string;
    surname: string;
    role: string;
}

export interface UserInterface {
    avatar?: string;
    username: string;
    name: string;
    surname: string;
    role: string;
}

export type Post = {
    _id?: string;
    image?: string;
    message: string;
    likes?: Array<User>;
    author: User;
    create_at: Date;
    location: string;
    status: string;
}