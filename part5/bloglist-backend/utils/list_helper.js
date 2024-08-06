const dummy = (blogs) => {
  return 1
}

const totalLikes = (list) => {
  const reducer = (total, blog) => {
    return total + blog.likes
  }

  return list.length === 0
  ? 0
  : list.reduce(reducer, 0)
}

const favoriteBlog = (list) => {
  const reducer = (mostLikedBlog, currentBlog) => {
    return mostLikedBlog.likes > currentBlog.likes ? mostLikedBlog: currentBlog
  }

  return list.length === 0
  ? null
  : list.reduce(reducer, list[0])
}

const mostBlogs = (list) => { 
  const authorCounter = (arr, author) => {
    return arr.filter(
      (elem) => elem.author == author).length
  }

  const reducer = (mostBlogs, currentBlog) => { 
    const mbAuthCount = authorCounter(list, mostBlogs.author)
    const cAuthCount = authorCounter(list, currentBlog.author)

    return mbAuthCount > cAuthCount
    ? { author: mostBlogs.author, blogs: mbAuthCount }
    : { author: currentBlog.author, blogs: cAuthCount }
  }
  
  return list.length === 0
  ? null
  : list.reduce(reducer, list[0].author)
}

const mostLikes = (list) =>{
  const likesCounter = (arr, author) => {
    return arr.length === 0
    ? null
    : arr.reduce((likesTotal, currentBlog) => {
      return currentBlog.author === author ? likesTotal + currentBlog.likes : likesTotal
    },0)
  }

  const reducer = (mostBlogs, currentBlog) => { 
    const mbLikesCount = likesCounter(list, mostBlogs.author)
    const cLikesCount = likesCounter(list, currentBlog.author)

    return mbLikesCount > cLikesCount
    ? { author: mostBlogs.author, likes: mbLikesCount }
    : { author: currentBlog.author, likes: cLikesCount }
  }
  
  return list.length === 0
  ? null
  : list.reduce(reducer, list[0].author)
}

module.exports = {
  dummy, 
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}