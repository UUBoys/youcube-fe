export interface IVideo {
  uuid: string;
  title: string;
  description: string;
  url: string;
  monetized: boolean;
  created: string;
  tag: number;
  users: {
    uuid: string;
    name: string;
  };
}
