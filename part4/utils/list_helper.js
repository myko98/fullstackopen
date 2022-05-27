const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  likes = 0;

  blogs.map((blog) => {
    likes += blog.likes
  })
  return likes
}

const favouriteBlog = (blogs) => {
  fav = blogs.reduce((a, b) => (
    a.likes <= b.likes ? b : a
  ))

  return {
    title: fav.title, author: fav.author, likes: fav.likes
  }
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog
}