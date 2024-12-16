"use client";

import { useState } from "react";
import Image from "next/image";
import Spinner from "@/components/Spinner";

interface Post {
  id: number;
  user: string;
  userImage: string;
  content: string;
  postImage?: string;
  likes: number;
  comments: { user: string; text: string }[];
}

const PostCard: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      user: "John Doe",
      userImage: "https://www.growstack.ai/grey.svg",
      content: "This is my first post!",
      postImage: "https://www.growstack.ai/landingpage/img8.svg",
      likes: 25,
      comments: [
        { user: "Jane Smith", text: "Nice post!" },
        { user: "Alex Brown", text: "Great content!" },
      ],
    },
    {
      id: 2,
      user: "Jane Smith",
      userImage: "https://www.growstack.ai/grey.svg",
      content: "Loving the new features!",
      postImage: "https://www.growstack.ai/landingpage/img4.svg",

      likes: 40,
      comments: [],
    },
  ]);

  const handleLike = (id: number) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === id ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  const handleComment = (id: number, comment: string) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === id
          ? {
              ...post,
              comments: [...post.comments, { user: "You", text: comment }],
            }
          : post
      )
    );
  };

  return (
    <>
      {loading && (
        <div className="absolute flex-1 h-full flex flex-col gap-5 justify-center items-center">
          <Spinner color="black" size={100} />
          Loading...
        </div>
      )}
      <div className="container mx-auto p-4">
        <div className="space-y-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white p-4 rounded shadow-md border border-gray-200"
            >
              <div className="flex items-center gap-4">
                <Image
                  src={post.userImage}
                  alt="User Image"
                  width={50}
                  height={50}
                  className="rounded-full"
                />
                <p className="font-semibold">{post.user}</p>
              </div>
              <p className="mt-4 text-gray-800">{post.content}</p>
              {post.postImage && (
                <div className="mt-4">
                  <Image
                    src={post.postImage}
                    alt="Post Image"
                    width={600}
                    height={400}
                    className="rounded-md"
                  />
                </div>
              )}
              <div className="mt-4 flex items-center justify-between text-gray-600">
                <button
                  className="flex items-center gap-2"
                  onClick={() => handleLike(post.id)}
                >
                  👍 {post.likes} Likes
                </button>
                <p>{post.comments.length} Comments</p>
              </div>
              <div className="mt-4">
                {post.comments.map((comment, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-sm text-gray-700"
                  >
                    <span className="font-medium">{comment.user}:</span>
                    <span>{comment.text}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  className="border border-gray-300 rounded w-full p-2 text-sm"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && e.currentTarget.value.trim()) {
                      handleComment(post.id, e.currentTarget.value);
                      e.currentTarget.value = "";
                    }
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PostCard;
