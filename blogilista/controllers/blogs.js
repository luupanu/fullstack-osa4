const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.delete('/:id', async (request, response) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (error) {
    console.log(error)
    response.status(400).json({ error: 'malformatted id' })
  }
})

blogRouter.get('/', async (request, response) => {
  try {
    const blogs = await Blog.find({})
    response.json(blogs)
  } catch (error) {
    console.log(error)
    response.status(500).json({ error: 'something went wrong!' })
  }
})

blogRouter.post('/', async (request, response) => {
  try {
    const blog = new Blog(request.body)
    if (blog.title === undefined || blog.url === undefined) {
      return response.status(400).json({ error: 'title or url missing' })
    }
    if (blog.likes === undefined) {
      blog.likes = 0
    }
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  } catch (error) {
    console.log(error)
    response.status(500).json({ error: 'something went wrong!' })
  }
})

blogRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    likes: body.likes
  }

  try {
    await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.status(200).end()
  } catch (error) {
    console.log(error)
    response.status(400).json({ error: 'malformatted id' })
  }
})

module.exports = blogRouter