const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const { initialBlogs, newBlog, blogWithoutLikes, blogWithoutTitleAndUrl,
  blogWithoutTitle, blogWithoutUrl, blogsInDb, nonExistingValidId, invalidId } = require('./test_helper')

beforeAll(async () => {
  await Blog.remove({})
  const blogObjects = initialBlogs.map(blog => new Blog(blog))
  await Promise.all(blogObjects.map(blog => blog.save()))
})

describe('GET /api/blogs', () => {

  test('returns the initial blogs as json', async () => {
    const blogsInDatabase = await blogsInDb()

    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.length).toBe(initialBlogs.length)

    const returnedTitles = response.body.map(r => r.title)
    blogsInDatabase.forEach(blog => {
      expect(returnedTitles).toContain(blog.title)
    })
  })
})

describe('POST /api/blogs', async () => {

  test('succeeds with valid data', async () => {
    const blogsAtStart = await blogsInDb()

    await postABlogAndExpectAStatus(newBlog, 201, true)

    const blogsAfterOperation = await blogsInDb()

    expect(blogsAfterOperation.length).toBe(blogsAtStart.length + 1)

    const titles = blogsAfterOperation.map(r => r.title)
    expect(titles).toContain('Tunteet ja käteinen')
  })

  test('sets likes to zero if they are not given', async () => {
    const blogsAtStart = await blogsInDb()

    await postABlogAndExpectAStatus(blogWithoutLikes, 201, true)

    const blogsAfterOperation = await blogsInDb()

    expect(blogsAfterOperation.length).toBe(blogsAtStart.length + 1)
    const addedBlog = blogsAfterOperation.find(r => r.title === blogWithoutLikes.title)
    expect(addedBlog.likes).toBe(0)
  })

  test('returns 400 if the request did not have a title', async () => {
    const blogsAtStart = await blogsInDb()

    await postABlogAndExpectAStatus(blogWithoutTitle, 400)

    const blogsAfterOperation = await blogsInDb()

    expect(blogsAfterOperation.length).toBe(blogsAtStart.length)

    const urls = blogsAfterOperation.map(r => r.url)
    expect(urls).not.toContain(blogWithoutTitle.url)
  })

  test('returns 400 if the request did not have a url', async () => {
    const blogsAtStart = await blogsInDb()

    await postABlogAndExpectAStatus(blogWithoutUrl, 400)

    const blogsAfterOperation = await blogsInDb()

    expect(blogsAfterOperation.length).toBe(blogsAtStart.length)

    const titles = blogsAfterOperation.map(blog => blog.title)
    expect(titles).not.toContain(blogWithoutUrl.title)
  })

  test('returns 400 if the request did not have a title and url', async () => {
    const blogsAtStart = await blogsInDb()

    await postABlogAndExpectAStatus(blogWithoutTitleAndUrl, 400)

    const blogsAfterOperation = await blogsInDb()

    expect(blogsAfterOperation.length).toBe(blogsAtStart.length)

    const authors = blogsAfterOperation.map(blog => blog.author)
    expect(authors).not.toContain(blogWithoutTitleAndUrl.author)
  })
})

describe('PUT api/blogs/:id', async () => {

  test('updates a valid blog\'s likes', async () => {
    const blogsAtStart = await blogsInDb()

    const blogToBeUpdated = blogsAtStart[0]
    blogToBeUpdated.likes = 5000

    await api
      .put(`/api/blogs/${blogToBeUpdated.id}`)
      .send(blogToBeUpdated)
      .expect(200)

    const blogsAfterOperation = await blogsInDb()

    const blogThatWasUpdated = blogsAfterOperation.find(
      blog => blog.title === blogToBeUpdated.title)
    expect(blogThatWasUpdated.likes).toBe(5000)
  })
})

describe('REMOVE api/blogs/:id', async () => {

  test('works with a valid id', async () => {
    const blogsAtStart = await blogsInDb()

    await api
      .delete(`/api/blogs/${blogsAtStart[0].id}`)
      .expect(204)

    const blogsAfterOperation = await blogsInDb()

    expect(blogsAfterOperation.length).toBe(blogsAtStart.length - 1)

    const titles = blogsAfterOperation.map(blog => blog.title)
    expect(titles).not.toContain(blogsAtStart[0].title)
  })

  /*test('returns 400 with an invalid id', async () => {
    const blogsAtStart = await blogsInDb()

    await api
      .delete(`/api/blogs/${invalidId}`)
      .expect(400)

    const blogsAfterOperation = await blogsInDb()

    expect(blogsAfterOperation.length).toBe(blogsAtStart.length)

    const titles = blogsAtStart.map(blog => blog.title)
    blogsAfterOperation.forEach(blog => {
      expect(titles).toContain(blog.title)
    })
  })*/

  test('returns 204 with a valid nonexisting id', async () => {
    const blogsAtStart = await blogsInDb()

    await api
      .delete(`/api/blogs/${nonExistingValidId}`)
      .expect(204)

    const blogsAfterOperation = await blogsInDb()

    expect(blogsAfterOperation.length).toBe(blogsAtStart.length)

    const titles = blogsAtStart.map(blog => blog.title)
    blogsAfterOperation.forEach(blog => {
      expect(titles).toContain(blog.title)
    })
  })
})

const postABlogAndExpectAStatus = async (blog, status, expectJson) => {
  if (expectJson) {
    await api
      .post('/api/blogs')
      .send(blog)
      .expect(status)
      .expect('Content-Type', /application\/json/)
  } else {
    await api
      .post('/api/blogs')
      .send(blog)
      .expect(status)
  }
}

afterAll(() => {
  server.close()
})