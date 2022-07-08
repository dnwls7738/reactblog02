import React from "react";
import Post from "../post/Post";

function Posts() {
  return (
    <section className="blog__posts">
      <Post img="https://source.unsplash.com/800x580/?blog,Human" />
      <Post img="https://source.unsplash.com/800x580/?blog,wood" />
      <Post img="https://source.unsplash.com/800x580/?blog,water" />
      <Post img="https://source.unsplash.com/800x580/?blog,space" />
      <Post img="https://source.unsplash.com/800x580/?blog,cyber" />
      <Post img="https://source.unsplash.com/800x580/?blog,spring" />
    </section>
  );
}

export default Posts;
