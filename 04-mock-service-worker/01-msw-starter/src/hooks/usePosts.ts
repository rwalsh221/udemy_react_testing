import { useState } from 'react';
import axios from 'axios';

export type Post = {
  id: string;
  title: string;
  likes: number;
};

export type PostWithoutId = Omit<Post, 'id'>;

const API_URL = 'http://localhost:4000/posts';

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string>('');

  const fetchPosts = async (): Promise<void> => {
    try {
      const { data } = await axios.get<Post[]>(API_URL);
      setPosts(data);
      setError('');
    } catch {
      setError('failed to fetch posts');
    }
  };

  const handleCreatePost = async (postData: PostWithoutId): Promise<void> => {
    try {
      await axios.post(API_URL, { ...postData });
      await fetchPosts();
      setError('');
    } catch {
      setError('failed to create post');
    }
  };

  const handleLike = async (postId: string): Promise<void> => {
    try {
      const post = posts.find((p) => p.id === postId);
      if (!post) {
        setError('post not found');
        return;
      }
      await axios.put(`${API_URL}/${postId}`, {
        ...post,
        likes: post.likes + 1,
      });
      await fetchPosts();
      setError('');
    } catch {
      setError('failed to like post');
    }
  };

  const handleDelete = async (postId: string): Promise<void> => {
    try {
      await axios.delete(`${API_URL}/${postId}`);
      await fetchPosts();
      setError('');
    } catch {
      setError('failed to delete post');
    }
  };

  return {
    posts,
    error,
    fetchPosts,
    handleCreatePost,
    handleLike,
    handleDelete,
  };
};
