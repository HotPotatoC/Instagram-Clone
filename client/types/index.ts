export interface User {
  id: string
  image: string
  displayName: string
  username: string
  email: string
  password: string
  avatarImg: string
  bio: string
  website: string
  location: string
  createdAt: Date
}

export interface Post {
  id: string
  caption: string
  image: string
  location: string
  user: User
  comments: Comment[]
  likes: Like[]
  createdAt: Date
}

export interface Comment {
  id: string
  content: string
  post: Post
  createdAt: Date
}

export interface Like {
  id: string
  userId: string
  createdAt: Date
}

export interface Follower {
  id: string
  followedBy: User
  createdAt: Date
}

export interface Following {
  id: string
  followedTo: User
  createdAt: Date
}
