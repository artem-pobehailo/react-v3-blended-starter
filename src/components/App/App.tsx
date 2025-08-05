import Section from "../Section/Section";
import Container from "../Container/Container";
import type { Photo } from "../../types/photo";
import Form from "../Form/Form";
import { getPhotos } from "../../services/photos";
import { useState } from "react";
import PhotosGallery from "../PhotosGallery/PhotosGallery";
import toast, { Toaster } from "react-hot-toast";
import Text from "../Text/Text";
import Loader from "../Loader/Loader";
import Modal from "../Modal/Modal";

export default function App() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const onSubmit = async (query: string) => {
    setIsEmpty(false);
    setIsLoading(true);
    setError(null);
    try {
      const data = await getPhotos(query);
      if (!data.length) {
        toast.error(`We don't find photos with ${query}`);
        setIsEmpty(true);
        return;
      }
      setPhotos(data);
    } catch (error) {
      console.error("Request error:", error);
      setError("Щось пішло не так. Спробуйте ще раз.");
    } finally {
      setIsLoading(false);
    }
  };
  const handleCloseModal = () => setSelectedPhoto(null);

  return (
    <>
      <Section>
        <Toaster position="top-right" reverseOrder={false} />
        <Container>
          <Form onSubmit={onSubmit} />
          {photos.length > 0 && (
            <PhotosGallery photos={photos} onPhotoClick={setSelectedPhoto} />
          )}
          {isEmpty && <Text textAlign="center">{"We don`t find photos"}</Text>}
          {isLoading && <Loader />}
          {error && <Text textAlign="center">{error}</Text>}
        </Container>
        {selectedPhoto && (
          <Modal onClose={handleCloseModal}>
            <img src={selectedPhoto.src.original} alt={selectedPhoto.alt} />
          </Modal>
        )}
      </Section>
    </>
  );
}
