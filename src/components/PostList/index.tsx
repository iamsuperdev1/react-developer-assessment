import React, { useEffect, useState } from "react";
import { createBrowserHistory } from "history";
import qs from "qs";
import APIService from '../../services/api.services';

interface PostsQueryParam {
  page: number;
  pageSize: number;
  category: string[];
}

const PostList: React.FC = () => {
  const history = createBrowserHistory();
  const [categoryList, setCategoryList] = useState<ICategory[]>([]);
  const [postList, setPostList] = useState<IPost[]>([]);
  const [pageList, setPageList] = useState<number[]>([1]);
  const [listQuery, setListQuery] = useState<PostsQueryParam>({
    page: 1, pageSize: 5, category: []
  });

  useEffect(() => {
    const initCategory = async () => {
      const categories = await APIService.getCategories();
      setCategoryList(categories.data);
    }

    const initURLParams = () => {
      const urlParams = history.location.search.substr(1);
      const { page, pageSize, category } = qs.parse(urlParams);
      
      const query: PostsQueryParam = listQuery;
      if (page) query.page = Number(page);
      if (pageSize) query.pageSize = Number(pageSize);
      if (category) {
        const categoryStr = category as string;
        if (categoryStr.indexOf(',') > 0)
          query.category = categoryStr.split(',');
        else 
          query.category = [categoryStr];
      }
      // Update State
      setListQuery(query);
    }

    initCategory();
    initURLParams();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchPosts = async () => {
    const posts = await APIService.getPosts({
      limit: listQuery.pageSize,
      offset: listQuery.page * listQuery.pageSize,
      category: listQuery.category
    });
    // Calculate number of pages
    const numPage = Math.ceil(posts.count / listQuery.pageSize);
    const pageList = new Array(numPage).fill(0).map((_, i) => i + 1);
    // Update states
    setPageList(pageList);
    setPostList(posts.data);
  }

  useEffect(() => {
    fetchPosts();
  }, [listQuery]); // eslint-disable-line react-hooks/exhaustive-deps
  
  return (
    <>
      <p>Post List:</p>
      <ul>
        {postList.map((post) => (
          <li>{post.title}</li>  
        ))}
      </ul>
      <p>Category List:</p>
      <ul>
        {categoryList.map((category) => (
          <li>{category.name}</li>  
        ))}
      </ul>
      <p>Current Page: {listQuery.page}</p>
      <p>Page List</p>
      <ul>
        {pageList.map((page) => (
          <li>{page}</li>
        ))}
      </ul>
    </>
  )
}

export default PostList;
