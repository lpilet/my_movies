export interface CategoryElem {
    name: string;
    selected: boolean;
}

export interface MovieElem {
    id: number;
    title: string;
    category: string;
    likes: number;
    dislikes: number;
    liked: boolean;
    disliked: boolean;
}