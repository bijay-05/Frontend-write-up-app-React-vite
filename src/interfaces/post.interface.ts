export interface IPost {
    id: string;
    title: string;
    content: string;
    userId: string;
    createdOn: string;
    updatedOn: string;
    tags: string[];
}

export interface INewPost {
    title: string;
    content: string;
    tags: string[];
}