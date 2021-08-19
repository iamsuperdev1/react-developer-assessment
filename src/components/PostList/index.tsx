import qs from "qs";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import APIService from '../../services/api.services';
import { Dropdown, Option } from "../Dropdown";
import { Card } from "../Card";
import { Pagination } from "./styles";
import LoadingIndicator from "../LoadingIndicator";


const PostList: React.FC = () => {
  const history = useHistory();
  const [categoryList, setCategoryList] = useState<ICategory[]>([]);
  const [postList, setPostList] = useState<IPost[]>([]);

  const [pageList, setPageList] = useState<number[]>([1]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const [categoryFilter, setCategoryFilter] = useState<string[]>([]);

  const [loading, setLoading] = useState<boolean>(true);

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
    setLoading(true);
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
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
    history.push(`?page=${currentPage}&pageSize=${pageSize}&category=${categoryFilter}`);
  }, [pageSize, currentPage, categoryFilter]); // eslint-disable-line react-hooks/exhaustive-deps
  
  const setCategoryFilterOnClick = (category: string) => {
    if (category === "All") {
      setCategoryFilter([]);
    } else {
      if (!categoryFilter.includes(category)) {
        setCategoryFilter([...categoryFilter, category]);
        setCurrentPage(1);
      }
    }
  };

  const pageChangeOnClick = (page: number) => {
    setCurrentPage(page);
  }

  return (
    <>
      { loading ? (
        <LoadingIndicator />
      ): (
        <>
          <div className="filter">
            <Dropdown formLabel="Choose a category" action="/"
              onChange={(e) => {
                e.preventDefault(); setCategoryFilterOnClick(e.target.value);
              }}
            >
              <Option selected value="All" />
              {categoryList.map(category => (
                <Option selected={categoryFilter.includes(category.name)}
                  value={category.name} key={category.id}/>
              ))}
            </Dropdown>
          </div>
          {postList.map((post) => (
            <Card post={post} />
          ))}
          <Pagination>
            {pageList.map((page) => (
              <li className="item" onClick={() => pageChangeOnClick(page)}>
                {page === currentPage ? `[${page}]` : page}
              </li>
            ))}
          </Pagination>
        </>
      )}
    </>
  )
}

export default PostList;
