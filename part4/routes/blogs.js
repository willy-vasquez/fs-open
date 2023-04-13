const router = require('express').Router();
const Blog = require('../models/blog');

router.get('/', async (reques, response) => {
  try {
    const blogs = await Blog.find({});
    response.json(blogs);
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: error });
  }
});

router.post('/', async (request, response) => {
  try {
    const { body } = request;

    if (!body.title || !body.url || !body.author)
      return response.status(400).json({
        error: 'data missing',
      });

    const blog = new Blog({ likes: 0, ...body });

    const result = await blog.save();
    response.status(201).json(result);
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: error });
  }
});

router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const blog = await Blog.deleteOne({ _id: id });
    if (+blog.deletedCount === 1) response.status(204).end();
    else response.status(404).json({ message: 'element not found' }).end();
  } catch (error) {
    response.status(500).json({ error: error.message }).end();
  }
});

router.put('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const { likes } = request.body;

    const result = await Blog.updateOne({ _id: id }, { likes });
    if (+result.modifiedCount === 1) response.status(204).end();
    else response.status(404).json({ message: 'element not found' }).end();
  } catch (error) {
    response.status(500).json({ error: error.message }).end();
  }
});

module.exports = router;
