export interface Post {
    date: Date;
    title: string;
    slug: string;
    lang: string;
    tags?: string[];
    thumbnail?: string;
}