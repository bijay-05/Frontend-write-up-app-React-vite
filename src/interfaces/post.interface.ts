export interface IPost {
    id: string;
    title: string;
    content: string;
    userId: string;
    createdOn: string;
    updatedOn: string;
    tags: { "tags": []};
}

export interface INewPost {
    title: string;
    content: string;
    tags: { "tags": []};
}