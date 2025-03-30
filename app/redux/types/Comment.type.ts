import { Post } from "./Post.type";
import { User } from "./User.type";

export interface Comment {
  _id: string;
  user: User;
  post: string | Post;
  parentComment: string | Comment;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  upvotes: string[];
  downvotes: string[];
}
