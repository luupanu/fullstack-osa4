const listHelper = require('../utils/list_helper')

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Määän',
    author: 'Dxxxa Ö',
    url: 'https://open.spotify.com/album/497pgilSar18xy052nHvbh',
    likes: 9001,
    __v: 0
  }
]

const listWithMultipleBlogs = [
  listWithOneBlog[0],
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Low Key Cue New Tan Bloss It',
    author: 'Dxxxa D',
    url: 'https://open.spotify.com/album/06ySNBwgKYAND3441a5nl8',
    likes: 9003,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Sydänten taksikuski',
    author: 'Dxxxa D',
    url: 'https://open.spotify.com/album/13nAcdvXW4qQsSoDFKRyae',
    likes: 9002,
    __v: 0
  }
]

describe('favorite blog', () => {
  test('of empty list is null', () => {
    expect(listHelper.favoriteBlog([])).toBe(null)
  })

  test('when list has only one blog equals the blog', () => {
    const expected = {
      author: listWithOneBlog[0].author,
      likes: listWithOneBlog[0].likes,
      title: listWithOneBlog[0].title
    }
    expect(listHelper.favoriteBlog(listWithOneBlog)).toEqual(expected)
  })

  test('of a bigger list is calculated right', () => {
    const expected = {
      author: listWithMultipleBlogs[1].author,
      likes: listWithMultipleBlogs[1].likes,
      title: listWithMultipleBlogs[1].title
    }
    expect(listHelper.favoriteBlog(listWithMultipleBlogs)).toEqual(expected)
  })
})

describe('most blogs', () => {
  test('of empty list is null', () => {
    expect(listHelper.mostBlogs([])).toBe(null)
  })

  test('to be calculated right when list has only one blog', () => {
    const expected = {
      author: listWithOneBlog[0].author,
      blogs: 1
    }
    expect(listHelper.mostBlogs(listWithOneBlog)).toEqual(expected)
  })

  test('of a bigger list is calculated right', () => {
    const expected = {
      author: listWithMultipleBlogs[1].author,
      blogs: 2
    }
    expect(listHelper.mostBlogs(listWithMultipleBlogs)).toEqual(expected)
  })
})

describe('most likes', () => {
  test('of empty list is null', () => {
    expect(listHelper.mostLikes([])).toBe(null)
  })

  test('to be calculated right when list has only one blog', () => {
    const expected = {
      author: listWithOneBlog[0].author,
      likes: listWithOneBlog[0].likes
    }
    expect(listHelper.mostLikes(listWithOneBlog)).toEqual(expected)
  })

  test('of a bigger list is calculated right', () => {
    const expected = {
      author: listWithMultipleBlogs[1].author,
      likes: listWithMultipleBlogs[1].likes + listWithMultipleBlogs[2].likes
    }
    expect(listHelper.mostLikes(listWithMultipleBlogs)).toEqual(expected)
  })
})

describe('total likes', () => {
  test('of empty list is zero', () => {
    expect(listHelper.totalLikes([])).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    expect(listHelper.totalLikes(listWithOneBlog)).toBe(9001)
  })

  test('of a bigger list is calculated right', () => {
    expect(listHelper.totalLikes(listWithMultipleBlogs)).toBe(27006)
  })
})

test('dummy is called', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})