// JSONPlaceholder API servis fonksiyonları

const BASE_URL = 'https://jsonplaceholder.typicode.com'

// Types
export interface Post {
  id: number
  userId: number
  title: string
  body: string
}

export interface User {
  id: number
  name: string
  username: string
  email: string
  phone: string
  website: string
}

export interface Comment {
  id: number
  postId: number
  name: string
  email: string
  body: string
}

// GET istekleri
export const getPosts = async (): Promise<Post[]> => {
  const response = await fetch(`${BASE_URL}/posts`)
  if (!response.ok) {
    throw new Error('Posts yüklenemedi')
  }
  return response.json()
}

export const getPost = async (id: number): Promise<Post> => {
  const response = await fetch(`${BASE_URL}/posts/${id}`)
  if (!response.ok) {
    throw new Error('Post yüklenemedi')
  }
  return response.json()
}

export const getUsers = async (): Promise<User[]> => {
  const response = await fetch(`${BASE_URL}/users`)
  if (!response.ok) {
    throw new Error('Users yüklenemedi')
  }
  return response.json()
}

export const getUser = async (id: number): Promise<User> => {
  const response = await fetch(`${BASE_URL}/users/${id}`)
  if (!response.ok) {
    throw new Error('User yüklenemedi')
  }
  return response.json()
}

export const getPostComments = async (postId: number): Promise<Comment[]> => {
  const response = await fetch(`${BASE_URL}/posts/${postId}/comments`)
  if (!response.ok) {
    throw new Error('Comments yüklenemedi')
  }
  return response.json()
}

export const getPostsByUserId = async (userId: number): Promise<Post[]> => {
  const response = await fetch(`${BASE_URL}/posts?userId=${userId}`)
  if (!response.ok) {
    throw new Error('Posts yüklenemedi')
  }
  return response.json()
}

// Pagination için tip ve fonksiyon
export interface PaginatedPostsResponse {
  data: Post[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export const getPostsPaginated = async (
  page: number = 1,
  limit: number = 10
): Promise<PaginatedPostsResponse> => {
  const response = await fetch(`${BASE_URL}/posts`)
  if (!response.ok) {
    throw new Error('Posts yüklenemedi')
  }
  const allPosts: Post[] = await response.json()
  
  const total = allPosts.length
  const totalPages = Math.ceil(total / limit)
  const start = (page - 1) * limit
  const end = start + limit
  const data = allPosts.slice(start, end)
  
  return {
    data,
    total,
    page,
    limit,
    totalPages,
  }
}

// POST/PUT/DELETE istekleri
export const createPost = async (post: Omit<Post, 'id'>): Promise<Post> => {
  const response = await fetch(`${BASE_URL}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post),
  })
  if (!response.ok) {
    throw new Error('Post oluşturulamadı')
  }
  return response.json()
}

export const updatePost = async (post: Post): Promise<Post> => {
  const response = await fetch(`${BASE_URL}/posts/${post.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post),
  })
  if (!response.ok) {
    throw new Error('Post güncellenemedi')
  }
  return response.json()
}

export const deletePost = async (id: number): Promise<void> => {
  const response = await fetch(`${BASE_URL}/posts/${id}`, {
    method: 'DELETE',
  })
  if (!response.ok) {
    throw new Error('Post silinemedi')
  }
}
