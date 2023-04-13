const supertest = require('supertest');
const mongoose = require('mongoose');
const helper = require('./test_helper');
const app = require('../app');
const api = supertest(app);

const Blog = require('../models/blog');

beforeEach(async () => {
  await Blog.deleteMany({});

  await Blog.insertMany(helper.initialBlogs);
});

describe('testing GET method', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('there are two blogs', async () => {
    const response = await api.get('/api/blogs');

    expect(response.body).toHaveLength(3);
  });

  test('the first blog is from Willy vasquez', async () => {
    const response = await api.get('/api/blogs');

    expect(response.body[0].author).toBe('willy vasquez');
  });

  test('the blogs have id', async () => {
    const response = await api.get('/api/blogs');

    const id = response.body[0].id;
    expect(id).toBeDefined();
  });
});

describe('testing POST method', () => {
  test('a valid blog can be added', async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(helper.initialBlogs);

    const newBlog = {
      title: 'You are so nice',
      author: 'Felipe Riccardo',
      url: 'https://js/nice-js',
      likes: 18,
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const response = await api.get('/api/blogs');
    expect(response.body).toHaveLength(helper.initialBlogs.length + 1);

    const titles = response.body.map((blog) => blog.title);
    expect(titles).toContainEqual('You are so nice');
  });

  test('blog without likes is added with like 0', async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(helper.initialBlogs);

    const newBlog = {
      title: 'The reason to be alive',
      author: 'Luis Gonzales',
      url: 'https://js/be-alive',
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const response = await api.get('/api/blogs');
    expect(response.body).toHaveLength(helper.initialBlogs.length + 1);

    expect(response.body[helper.initialBlogs.length].likes).toBe(0);
  });

  test('if the title is not defined in request', async () => {
    const newBlog = {
      author: 'Luis Gonzales',
      url: 'https://js/be-alive',
    };

    await api.post('/api/blogs').send(newBlog).expect(400);

    const response = await api.get('/api/blogs');
    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });
});

describe('deleting a blog', () => {
  test('status 204 when a blog is deleted', async () => {
    const startBlogs = await helper.blogsInDB();
    const blogToDelete = startBlogs[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const endBlogs = await helper.blogsInDB();
    expect(endBlogs).toHaveLength(helper.initialBlogs.length - 1);

    const contents = endBlogs.map((r) => r.title);

    expect(contents).not.toContain(blogToDelete.title);
  });
});

describe('updating a blog', () => {
  test('status 204 when a blog is updated', async () => {
    const startBlogs = await helper.blogsInDB();
    const blogToUpdate = startBlogs[0];

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send({ likes: 19 })
      .expect(204);

    const endBlogs = await helper.blogsInDB();
    expect(endBlogs).toHaveLength(helper.initialBlogs.length);

    expect(endBlogs[0].likes).toBe(19);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
