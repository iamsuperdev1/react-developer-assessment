import React, { useEffect, useState } from "react";
import { createBrowserHistory } from "history";
import qs from "qs";
import APIService from '../../services/api.services';
import { Link } from "react-router-dom";
import { Dropdown } from "../Dropdown";
import { Option } from '../Dropdown/Option/index';

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
    if (category === "All") {
      setCategoryFilter([]);
    } else {
      if (!categoryFilter.includes(category))
        setCategoryFilter([...categoryFilter, category]);
    }
  };

  const pageChangeOnClick = (page: number) => {
    setCurrentPage(page);
  }

  return (
    <>
      <div className="filter">
        <Dropdown
          formLabel="Choose a category"
          action="/"
          onChange={(e) => {
            e.preventDefault();
            setCategoryFilterOnClick(e.target.value);
          }}
        >
          <Option selected value="All" />
          {categoryList.map(category => (
            <Option
              selected={categoryFilter.includes(category.name)}
              value={category.name} key={category.id}
            />
          ))}
        </Dropdown>
      </div>
      {postList.map((post) => (
        <Link className="link" to={`/posts/${post.id}`}>
          <div className="card">
            <div className="card-header">
              <img src={post.author.avatar} alt="" width={100} height={100} />
              <p>{post.author.name}</p>
            </div>
            <div className="card-body">
              <p>{post.title}</p>
              <p>{post.summary}</p>
              <ul>{post.categories.map(cate => {
                return <li key={cate.id}>{cate.name}</li>
              })}</ul>
            </div>
            <div className="card-footer">
              <p>{new Date(post.publishDate).toDateString()}</p>
            </div>
          </div>
        </Link>
      ))}

      <ul className="pagination">
        {pageList.map((page) => (
          <li className="item" onClick={() => pageChangeOnClick(page)}>
          {page === currentPage ? `[${page}]` : page}
        </li>
        ))}
      </ul>
    </>
  )
}

export default PostList;
