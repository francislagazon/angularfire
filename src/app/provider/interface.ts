export interface USERS_KEY_FORMAT {
    userId: string;
    loading: boolean;
    folder: string;
    userDetail: any;
    userKey: string;
    fullName: string;
    email: string;
    phoneNo: number;
    role: string;
    gravatar: string;
};

export interface FORUM_KEY_FORMAT {
    catId: string;
    forumId: string;
    storageId: string;
    name: string;
    forumUID: string;
    noResult: boolean;
    categoryName: string;
    description: string;
    parent: string;
}