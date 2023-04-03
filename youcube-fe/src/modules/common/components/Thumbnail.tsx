import Image from "next/image";
import React from "react";

const mockData = {
  title: "Thumbnail",
  authorName: "Author Name",
  views: 100,
  publishedAt: "2021-01-01",
  thumbnailUrl:
    "https://uuapp.plus4u.net/uu-appbinarystore-maing02/eb5f2c8c7a06433b9188316ea37cdb1d/binary/getData?accessKey=0cf4cccd803b0f4ca717714009b0bccb.27436102.9b7ea4cbd6663d5f2118ee6436ac0166975183d9&clientAwid=9bbeae2d272b4b28b0f0b3772ce4642d&dataKey=prod1-small_unicorn_cooperation",
  authorPofilePictureUrl:
    "https://s3.amazonaws.com/www-inside-design/uploads/2020/10/aspect-ratios-blogpost-1x1-1.png",
};

const Thumbnail: React.FC = () => {
  return (
    <div className="w-[250px] relative">
      <Image src={mockData.thumbnailUrl} alt="Thumbnail" width={250} height={125} className="rounded-lg" />
      <p className="text-xs text-gray-400">
        {mockData.authorName}
      </p>
      <p className="text-md">
        {mockData.authorName}
      </p>
      <div className="w-full flex justify-between">
        <p className="text-xs text-gray-400">
          {mockData.views} views
        </p>
        <p className="text-xs text-gray-400">
          {mockData.publishedAt}
        </p>
      </div>
      <Image src={mockData.authorPofilePictureUrl} alt="Profile" width={40} height={40} className="rounded-full absolute right-2 bottom-7 border-white border-2" />
    </div>
  );
};

export default Thumbnail;
