const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Määän',
    author: 'Dxxxa Ö',
    url: 'https://open.spotify.com/album/497pgilSar18xy052nHvbh',
    likes: 9001,
  },
  {
    title: 'Low Key Cue New Tan Bloss It',
    author: 'Dxxxa D',
    url: 'https://open.spotify.com/album/06ySNBwgKYAND3441a5nl8',
    likes: 9003,
  },
  {
    title: 'Sydänten taksikuski',
    author: 'Dxxxa D',
    url: 'https://open.spotify.com/album/13nAcdvXW4qQsSoDFKRyae',
    likes: 9002,
  }
]

const newBlog = {
  title: 'Tunteet ja käteinen',
  author: 'Dxxxa F',
  url: 'https://open.spotify.com/album/7fXyuIIANSrIa2tekwm4mz',
  likes: 9004
}

const blogWithoutLikes = {
  title: 'Katoa tai katoat',
  author: 'Dxxxa G',
  url: 'https://open.spotify.com/album/2bdi8ejdxgtq9ZsZJaRkve'
}

const blogWithoutTitleAndUrl = {
  author: 'Dxxxa Z',
  likes: 0
}

const blogWithoutTitle = Object.assign({}, blogWithoutTitleAndUrl)
blogWithoutTitle.url = 'https://open.spotify.com/album/5R7QmBzR3tPK6yOt8YVBFK'

const blogWithoutUrl = Object.assign({}, blogWithoutTitleAndUrl)
blogWithoutUrl.title = 'Faust in der Accordeon'


const nonExistingValidId = '5a914299fca63d12ecb89d7e'

const invalidId = 'x'

const format = (blog) => {
  return {
    id: blog._id,
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes
  }
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(format)
}

module.exports = {
  initialBlogs, newBlog, blogWithoutLikes, blogWithoutTitleAndUrl,
  blogWithoutTitle, blogWithoutUrl, blogsInDb, nonExistingValidId, invalidId
}