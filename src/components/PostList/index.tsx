import React, { useEffect, useState } from "react";
import { createBrowserHistory } from "history";
import qs from "qs";
import APIService from '../../services/api.services';
import { Link } from "react-router-dom";

const PostList: React.FC = () => {
  const history = createBrowserHistory();
  const [categoryList, setCategoryList] = useState<ICategory[]>([]);
  const [postList, setPostList] = useState<IPost[]>([]);
  
  const [pageList, setPageList] = useState<number[]>([1]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const [categoryFilter, setCategoryFilter] = useState<string[]>([]);

  useEffect(() => {
    const initCategory = async () => {
      const categories = await APIService.getCategories();
      setCategoryList(categories.data);
    }

    const initURLParams = () => {
      const urlParams = history.location.search.substr(1);
      const { page, pageSize, category } = qs.parse(urlParams);
      
      if (page) setCurrentPage(Number(page));
      if (pageSize) setPageSize(Number(pageSize));
      if (category) {
        const categoryStr = category as string;
        if (categoryStr.indexOf(',') > 0)
          setCategoryFilter(categoryStr.split(','));
        else 
        setCategoryFilter([categoryStr]);
      }
    }

    initCategory();
    initURLParams();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchPosts = async () => {
    const posts = await APIService.getPosts({
      limit: pageSize,
      offset: (currentPage - 1) * pageSize,
      category: categoryFilter
    });
    // Calculate number of pages
    const numPage = Math.ceil(posts.count / pageSize);
    const pageList = new Array(numPage).fill(0).map((_, i) => i + 1);
    // Update states
    setPageList(pageList);
    setPostList(posts.data);
  };

  useEffect(() => {
    fetchPosts();
    history.push(`?page=${currentPage}&pageSize=${pageSize}&category=${categoryFilter}`);
  }, [pageSize, currentPage, categoryFilter]); // eslint-disable-line react-hooks/exhaustive-deps
  
  const setCategoryFilterOnClick = (category: string) => {
    if (!categoryFilter.includes(category))
      setCategoryFilter([...categoryFilter, category]);
  };

  const pageChangeOnClick = (page: number) => {
    setCurrentPage(page);
  }

  return (
    <>
      <p>Filter List:</p>
      <ul>
        {categoryFilter.map((category) => (
          <li>{category}</li>
        ))}
      </ul>
      <p>Post List:</p>
      <ul>
        {postList.map((post) => (
          <li key={post.id}><Link to={`/posts/${post.id}`}>{post.title}</Link></li>
        ))}
      </ul>
      <p>Category List:</p>
      <ul>
        {categoryList.map((category) => (
          <li onClick={() => setCategoryFilterOnClick(category.name)}>
            {category.name}
          </li>  
        ))}
      </ul>
      <p>Current Page: {currentPage}</p>
      <p>Page List</p>
      <ul>
        {pageList.map((page) => (
          <li onClick={() => pageChangeOnClick(page)}>
            {page === currentPage ? `[${page}]` : page}
          </li>
        ))}
      </ul>
    </>
  )
}

export default PostList;
