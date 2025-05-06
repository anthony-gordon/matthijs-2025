import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useItems } from './../ItemContext';
import './../style/HomePage.css'; 

function HomePage() {
  const { items } = useItems();
  // State to track when the image has loaded
  const [loadedImages, setLoadedImages] = useState({});

  // Function to handle image load
  const handleImageLoad = (id) => {
    setLoadedImages(prevState => ({
      ...prevState,
      [id]: true, // Mark image as loaded
    }));
  };

  return (
    <div className="page-container homepage">
    <div className="homepage__container">
      {items.map((item, index) => {
        const imageSrc = item['image_1_url']; // Main image URL
        const thumbnailSrc = item['image_1_url_thumbnail'];
        const altText = item['Title'] || 'Image';
        const imageLoaded = loadedImages[item.id] || false; // Track image loading status by item id
        

        return (
         <div className="homepage__tile-link-outer" data-index={parseInt(index + 1) % 6}>
          <div className="homepage__tile-link-spacer">
          </div>
          <Link className="homepage__tile-link" to={`/item/${item.Slug}`} key={item.Slug}>
            <div className="homepage__tile-image-container">
                {item['image_1_url'] && (
                  <img
                  className="homepage__tile-image"
                  src={imageLoaded ? imageSrc : thumbnailSrc} // Use the thumbnail or main image based on load state
                    // referrerPolicy="no-referrer"
                    onLoad={() => handleImageLoad(item.id)} // Call the function when image loads
                    alt={altText}
                  />
                )}
                {/* <div className="homepage__tile-info">
                  <h3 className="homepage__tile-title">{item.Title} - {item.DisplayYear}</h3>
                </div> */}
              </div>
          </Link>
        </div>
      )})}
    </div>
  </div>
  );
}

export default HomePage;
