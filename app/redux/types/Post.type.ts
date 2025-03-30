import { Space } from "./Space.type";
import { User } from "./User.type";

export interface Post {
  _id: string;
  user: User;
  communityId: string | Space;
  title: string;
  type: string;
  content: string;
  video: {
    url: string;
    public_id: string;
  };
  images: {
    url: string;
    public_id: string;
  }[];
  likes: string[];
  dislikes: string[];
  createdAt: string;
  updatedAt: string;
  commentCount?: number;
}
