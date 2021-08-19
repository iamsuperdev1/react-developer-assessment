
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
  const response = await fetch('/api/posts');
  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    console.log(message);
    return {
      count: 0,
      data: []
    }
  }
  const posts = await response.json();
  return posts;
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
  getCategories
};

export default APIService;
