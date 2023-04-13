const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((acc, curr) => acc + curr.likes, 0);
};

const favoriteBlog = (blogs) => {
  return blogs.sort((blog1, blog2) => blog2.likes - blog1.likes)[0];
};

const authorWithMostBlogs = (blogs) => {
  const authorBlogs = blogs.reduce((acc, curr) => {
    acc[curr.author] ? acc[curr.author]++ : (acc[curr.author] = 1);
    return acc;
  }, []);

  var result = Object.keys(authorBlogs).map((key) => {
    return { author: key, blogs: authorBlogs[key] };
  });

  return result.sort((a, b) => b.blogs - a.blogs)[0];
};

const authorWithMostLikes = (blogs) => {
  const authorBlogs = blogs.reduce((acc, curr) => {
    acc[curr.author]
      ? (acc[curr.author] += curr.likes)
      : (acc[curr.author] = curr.likes);
    return acc;
  }, []);

  var result = Object.keys(authorBlogs).map((key) => {
    return { author: key, likes: authorBlogs[key] };
  });

  return result.sort((a, b) => b.blogs - a.blogs)[0];
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  authorWithMostBlogs,
  authorWithMostLikes
};
