import React from "react";

("use client");

import { useState } from "react";

function CreateArticle() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handelCreateArticle = () => {
    fetch("http://localhost:3001/articles", {
      method: "POST",
      body: JSON.stringify({
        id: Math.floor(Math.random() *1000).toString(),
        title: title,
        description: description,
      }),
    });
  };

  return (
    <div className="bg-blue-300 py-24 flex flex-col px-10">
      <label>title</label>
      <input
        className="bg-white border rounded shadow mb-10 h-10"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <label>description</label>
      <textarea
        className="bg-white border h-40"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <div className="flex justify-end">
        <button
          onClick={handelCreateArticle}
          className="bg-red-600 relative mt-6 w-24 h-10 rounded-2xl shadow hover:text-cyan-700 "
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default CreateArticle;
