/* eslint-disable import/no-unresolved */
import { NextPage } from "next";
import React from "react";

// eslint-disable-next-line import/extensions
import Thumbnail from "@/modules/common/components/Thumbnail";

const components: NextPage = () => {
  return (
    <div className="flex-1">
      <Thumbnail />
      <Thumbnail />
      <Thumbnail />
    </div>
  );
};

export default components;
