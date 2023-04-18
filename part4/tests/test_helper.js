const Blog = require('../models/blog');
const User = require('../models/user');

const initialBlogs = [
  {
    title: 'The nicest blog',
    author: 'willy vasquez',
    url: 'https://blog-willy',
    likes: 1,
  },
  {
    title: 'The amazing world of JS',
    author: 'Luis Jimenez',
    url: 'https://blog-jimenez',
    likes: 3,
  },
  {
    title: 'The important of JavaScript',
    author: 'Matheu Riccardo',
    url: 'https://js/important-js',
    likes: 12,
  },
];

const nonExistingId = async () => {
  const blog = new Blog({ content: 'willremovethissoon' });
  await blog.save();
  await blog.deleteOne();

  return blog.id.toString();
};

const blogsInDB = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDB = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDB,
  usersInDB,
};
