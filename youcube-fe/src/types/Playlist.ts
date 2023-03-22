import Video from "./Video";
import User from "./User";

export default interface Playlist {
  uuid: string;
  user: User;
  videos: Video[];
}
