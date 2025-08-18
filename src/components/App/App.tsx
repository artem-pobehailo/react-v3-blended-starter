import { useQuery } from "@tanstack/react-query";
import { ChangeEvent, useState } from "react";
import Modal from "../Modal/Modal";
import PostList from "../PostList/PostList";
import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";

import css from "./App.module.css";
import { useFormState } from "react-dom";
import { fetchPosts } from "../../services/postService";
import { useDebouncedCallback } from "use-debounce";
import { Post } from "../../types/post";
import PostForm from "../CreatePostForm/CreatePostForm";
import EditPostForm from "../EditPostForm/EditPostForm";

const LIMIT = 25;

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [isEditPost, setIsEditPost] = useState(false);
  const [editPost, setEditPost] = useState<Post | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const { data } = useQuery({
    queryKey: ["posts", searchQuery, currentPage],
    queryFn: () => fetchPosts(searchQuery, currentPage, LIMIT),
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleEdit = (post: Post) => {
    setEditPost(post);
    setIsEditPost(true);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditPost(null);
    setIsEditPost(false);
    setIsModalOpen(false);
    setIsCreate(false);
  };

  const handleChange = useDebouncedCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event?.target.value);
  }, 1000);

  const totalPages = data?.totalCount ? Math.ceil(data.totalCount / LIMIT) : 0;
  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onChange={handleChange} />

        <button className={css.button}>Create post</button>
      </header>
      {isModalOpen && (
        <Modal>
          {isEditPost && editPost && (
            <EditPostForm initialValues={editPost} onClose={handleCloseModal} />
          )}
        </Modal>
      )}
      {data && data?.posts.length > 0 && <PostList posts={data.posts} handleEdit={handleEdit} />}
      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
