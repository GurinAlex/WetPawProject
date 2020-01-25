export interface User {
  email?: string;
  password?: string;
  token?: string;
  username?: string;
  image?: string;
}
export interface Post {
  id?: number;
  address: string;
  author?: string;
  sex: boolean;
  description: string;
  contacts: string;
  image: string;
  category: string;
  created_at?: Date;
}
