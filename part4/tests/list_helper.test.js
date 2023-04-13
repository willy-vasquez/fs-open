const listHelper = require('../utils/list_helper');

const listWithOneBlog = [
  {
    title: 'second blog',
    author: 'willy',
    likes: 4,
  },
];
const listBigBlog = [
  {
    title: 'new blog',
    author: 'luis',
    likes: 20,
  },
  {
    title: 'second blog',
    author: 'willy',
    likes: 4,
  },
  {
    title: 'new blog',
    author: 'willy',
    likes: 6,
  },
  {
    title: 'old blog',
    author: 'willy',
    likes: 1,
  },
  {
    title: 'last blog',
    author: 'luis',
    likes: 3,
  },
];

describe('dummy test', () => {
  test('dummy returns one', () => {
    const blogs = [];

    const result = listHelper.dummy(blogs);
    expect(result).toBe(1);
  });
});

describe('total likes', () => {
  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([]);
    expect(result).toBe(0);
  });

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(4);
  });

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(listBigBlog);
    expect(result).toBe(34);
  });
});

describe('utils to calculate blogs', () => {
  test('get the blog with most likes', () => {
    const result = listHelper.favoriteBlog(listBigBlog);
    expect(result).toEqual({
      title: 'new blog',
      author: 'luis',
      likes: 20,
    });
  });

  test('author with most blogs', () => {
    const result = listHelper.authorWithMostBlogs(listBigBlog);
    expect(result).toEqual({
      author: 'willy',
      blogs: 3,
    });
  });

  test('author with most likes', () => {
    const result = listHelper.authorWithMostLikes(listBigBlog);
    expect(result).toEqual({
      author: 'luis',
      likes: 23,
    });
  });
});
