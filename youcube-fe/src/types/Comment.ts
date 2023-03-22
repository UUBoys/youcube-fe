import Video from "./Video";
import User from "./User";

export default interface Comment {
  uuid: string;
  parent_uuid: string;
  user: User;
  video: Video;
  message: string;
  created_at: string;
}
