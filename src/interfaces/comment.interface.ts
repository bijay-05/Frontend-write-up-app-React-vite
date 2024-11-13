export interface IComment {
    id: string;
    blogId: string;
    userId: string;
    comment: string;
}

export interface INewComment {
    blogId: string;
    userId: string;
    comment: string;
}