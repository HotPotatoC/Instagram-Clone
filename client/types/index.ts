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
  createdAt: Date
}
