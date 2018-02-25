const dummy = (blogs) => {
  return 1
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null
  let favorite = blogs.reduce((a, b) => a.likes > b.likes ? a : b)
  favorite = {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes
  }
  return favorite
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null
  const authors = []
  blogs.forEach(blog => {
    const found = authors.find(a => a.author === blog.author)
    found ? found.blogs += 1 : authors.push({ author: blog.author, blogs: 1 })
  })
  return authors.reduce((a, b) => a.blogs > b.blogs ? a : b)
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null
  const authors = []
  blogs.forEach(blog => {
    const found = authors.find(a => a.author === blog.author)
    found ? found.likes += blog.likes : authors.push({ author: blog.author, likes: blog.likes })
  })
  return authors.reduce((a, b) => a.likes > b.likes ? a : b)
}

const totalLikes = (blogs) => {
  return blogs.length === 0 ? 0 : blogs.map(b => b.likes).reduce((a, b) => a + b)
}

module.exports = {
  dummy, favoriteBlog, mostBlogs, mostLikes, totalLikes
}