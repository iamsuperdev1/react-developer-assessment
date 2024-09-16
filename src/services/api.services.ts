
interface IGetPostOption {
  category: string[],
  limit: number,
  offset: number
}

interface IGetPostResp {
  count: number,
  data: IPost[]
}

interface IGetCategoryResp {
  count: number,
  data: ICategory[]
}

async function getPosts(options: IGetPostOption): Promise<IGetPostResp> {
  const categoryStr = encodeURIComponent(options.category.join(","))
  const response = await fetch(
    `/api/posts?category=${categoryStr}&limit=${options.limit}&offset=${options.offset}`
  );
  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    console.log(message);
    console.log(response);
    return {
      count: 0,
      data: []
    }
  }
  const posts = await response.json();
  return posts;
}

async function getPostById(id: string): Promise<IPost|null> {
  const response = await fetch(`/api/posts/${id}`);
  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    console.log(message);
    console.log(response);
    return null;
  }
  const post = await response.json();
  return post;
}

async function getCategories(): Promise<IGetCategoryResp> {
  const response = await fetch('/api/categories');
  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    console.log(message);
    console.log(response);
    return {
      count: 0,
      data: []
    }
  }
  const categories = await response.json();
  return categories;
}

const APIService = {
  getPosts,
  getPostById,
  getCategories
};

export default APIService;
