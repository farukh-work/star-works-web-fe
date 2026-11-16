export interface BlogPost {
  _id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: any[];
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  category: string;
  tags: string[];
  publishedAt: string;
  readTime: string;
  coverImage: string;
  featured: boolean;
}

export interface BlogCategory {
  name: string;
  slug: string;
  count: number;
}
