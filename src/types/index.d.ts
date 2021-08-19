interface IAuthor {
  name: string;
  avatar: string;
}

interface ICategory {
  id: string;
  name: string;
}

interface IPost {
  id: string;
  author: IAuthor;
  title: string;
  publishDate: Date;
  summary: string;
  categories: ICategory[];
}
