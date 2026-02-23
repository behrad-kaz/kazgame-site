import { IGetArtcles } from "@/app/blogs/page";
import React from "react";

function Article({title , description} :IGetArtcles) {
  return (
    <div className="shadow p-4">
      <h2>{title}</h2>
      <p>
        {description}
      </p>
    </div>
  );
}

export default Article;
