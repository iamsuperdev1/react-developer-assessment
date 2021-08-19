import { createServer } from 'miragejs';

import data from './data.json';

createServer({
  routes() {
    this.namespace = 'api';

    this.get('/posts', (_, request) => {
      const { category, limit, offset } = request.params;
      
      const limitNum = limit ? Number(limit) : 10;
      const offsetNum = offset ? Number(offset) : 0;

      let responseData = [];
      
      if (category) {
        const categoryList = category.indexOf(',') > 0 ? category.split(',') : [category];

        data.posts.forEach((post) => {
          for (let i=0; i< post.categories.length; i++) {
            if (categoryList.indexOf(post.categories[i].name) > 0) {
              responseData.push(post);
              return;
            }
          }
        });
      } else {
        responseData = data.posts;
      }

      const paginatedData = responseData.slice(offsetNum, offsetNum+limitNum);

      return {
        count: responseData.length,
        data: paginatedData
      }
    });

    this.get('/posts/:id', (_, request) => {
      let id = request.params.id;
      return data.posts.find(post => post.id === id)
    });

    this.get('/categories', () => {
      const responseData = [];
      let categorySet = new Set();

      data.posts.forEach((post) => {
        post.categories.forEach((category) => {
          if (!categorySet.has(category.name)) {
            categorySet.add(category.name);
            responseData.push(category);
          }
        })
      });

      return {
        count: responseData.length,
        data: responseData
      }
    });
  },
});
