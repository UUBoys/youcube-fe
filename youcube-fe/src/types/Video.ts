import User from "./User";
import Tag from "./Tag";

export default interface Video {
  uuid: string;
  user: User;
  tag: Tag;
  monetized: boolean;
  title: string;
  description: string;
  created_at: string;
}
