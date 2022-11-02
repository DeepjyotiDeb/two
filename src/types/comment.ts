export type User = {
    name?: string,
    email?: string,
    id?: string
}

export type Comments = {
    body?: string,
    createdAt?: object,
    id?: string,
    postId?: string,
    userId?: string,
    user?: {
        [key: string]: User
    }
}
export type CommentThread = {
    body?: string,
    createdAt?: object,
    id?: string,
    parentCommentId?: string,
    postId?: string,
    userId?: string,
    user?: {
        [key: string]: User
    }
}