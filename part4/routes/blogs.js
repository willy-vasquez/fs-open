const router = require('express').Router();
const jwt = require('jsonwebtoken');
const Blog = require('../models/blog');
const User = require('../models/user');
const auth = require('../utils/auth');

const getToken = (request) => {
  const auth = request.get('authorization');
  if (auth && auth.startsWith('bearer')) {
    return auth.replace('bearer ', '');
  }
  return null;
};

router.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
  });
  response.json(blogs);
});

router.get('/:id', async (request, response) => {
  const { id } = request.params;
  const blog = await Blog.findById(id);
  response.json(blog);
});

router.post('/', [auth], async (request, response) => {
  const { user: _user } = request;
  const user = await User.findById(_user.id);

  const { title, url, author, likes } = request.body;

  if (!title || !url || !author)
    return response.status(400).json({
      error: 'data missing',
    });

  const blog = new Blog({
    title,
    url,
    author,
    likes: likes ? likes : 0,
    user: user.id,
  });

  const result = await blog.save();
  user.blogs = [...user.blogs, result.id];
  await user.save();

  response.status(201).json(result);
});

router.delete('/:id', [auth], async (request, response) => {
  const { user } = request;
  const { id } = request.params;

  const findBlog = await Blog.findById(id);
  if (!findBlog)
    return response.status(404).json({ message: 'element not found' });

  if (findBlog.user.toString() !== user.id)
    return response
      .status(400)
      .json({ error: 'blog was not created by logged user' });

  const blog = await Blog.deleteOne({ _id: id });
  if (+blog.deletedCount === 1) response.status(204).end();
  else response.status(404).json({ message: 'element not found' }).end();
});

router.put('/:id', async (request, response) => {
  const { id } = request.params;
  const { likes } = request.body;

  const result = await Blog.updateOne({ _id: id }, { likes });
  if (+result.modifiedCount === 1) response.status(204).end();
  else response.status(404).json({ message: 'element not found' }).end();
});

module.exports = router;
