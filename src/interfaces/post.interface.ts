export interface IPost {
    id: string;
    title: string;
    content: string;
    userId: string;
    createdOn: string;
    updatedOn: string;
}

export interface INewPost {
    title: string;
    content: string;
}