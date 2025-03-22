import React, { useState, useEffect } from "react";
import imagesData from "./data/images.json";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    setImages(imagesData);
    if (imagesData.length > 0) {
      setSelectedImage(imagesData[0]);
    }
  }, []);

  const selectImage = (image) => {
    setSelectedImage(image);
  };

  const nextImage = () => {
    const currentIndex = images.findIndex(img => img.id === selectedImage.id);
    const nextIndex = (currentIndex + 1) % images.length;
    setSelectedImage(images[nextIndex]);
  };

  const prevImage = () => {
    const currentIndex = images.findIndex(img => img.id === selectedImage.id);
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setSelectedImage(images[prevIndex]);
  };

  const randomImage = () => {
    const randomIndex = Math.floor(Math.random() * images.length);
    setSelectedImage(images[randomIndex]);
  };

  const shuffleImages = () => {
    const shuffled = [...images].sort(() => Math.random() - 0.5);
    setImages(shuffled);
    setSelectedImage(shuffled[0]);
  };

  return (
    <div>
      <h1>Galerie de Pisici</h1>

      {selectedImage && (
        <div>
          <h2>{selectedImage.title}</h2>
          <img src={selectedImage.url} alt={selectedImage.title} style={{ width: "300px", border: "2px solid black" }} />
        </div>
      )}

      <div>
        <button onClick={prevImage}>Imaginea Anterioară</button>
        <button onClick={nextImage}>Următoarea Imagine</button>
        <button onClick={randomImage}>Imagine Aleatoare</button>
        <button onClick={shuffleImages}>Aranjare Aleatoare</button>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", marginTop: "20px" }}>
        {images.map((image) => (
          <img
            key={image.id}
            src={image.url}
            alt={image.title}
            onClick={() => selectImage(image)}
            style={{
              width: "100px",
              margin: "5px",
              cursor: "pointer",
              border: selectedImage?.id === image.id ? "3px solid red" : "none",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Gallery;
