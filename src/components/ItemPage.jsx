import { useParams } from 'react-router-dom';
import { useItems } from './../ItemContext';
import { useEffect, useState } from 'react';
import './../style/ItemPage.css'; 


function ItemPage() {
    const { slug } = useParams();
    const { items } = useItems();
    const item = items.find(i => i.Slug === slug);

    const [imageUrls, setimageUrls] = useState([]);
    const [primaryImageSrc, setPrimaryImageSrc] = useState('');
    const [primaryImageThumbnailSrc, setPrimaryImageThumbnailSrc] = useState('');
    const [loadedImages, setLoadedImages] = useState({});

    const primaryImageLoaded = item ? loadedImages[item.id] : false;

    
    useEffect(() => {
      if (!item) return;

      setimageUrls(Object.entries(item)
      .filter(([key, value]) => /^image_\d+_url$/.test(key) && value) 
      .map(([key, value]) => value));

      setPrimaryImageSrc(item['image_1_url'])
      setPrimaryImageThumbnailSrc(item['image_1_url_thumbnail'])
    }, [item])

    
      // Function to handle image load
      const handleImageLoad = (id) => {
        setLoadedImages(prevState => ({
          ...prevState,
          [id]: true, // Mark image as loaded
        }));
      };
  
    return (
      <div className="ItemPage page-container">
        {item && item['image_1_url'] &&
        <>
        <div className="ItemPage__info-container">
          <div className="ItemPage__info">
          {item['image_1_url'] && (
            <img
              className="ItemPage__primary-image-mobile"
              src={primaryImageLoaded ? primaryImageSrc : primaryImageThumbnailSrc} 
              onLoad={() => handleImageLoad(item.id)} 
              alt={item['image_1_caption']}
            />
          )}
          <h1 className="ItemPage__title">{item.Title}</h1>
          <h4 className="ItemPage__year">{item.Year}</h4>
          {item.description_paragraph_1 && <div className="ItemPage__description-container">
            {item.description_paragraph_1 && <p className="ItemPage__description">{item.description_paragraph_1}</p>}
            {item.description_paragraph_1 && item.description_paragraph_2 && <br />}
            {item.description_paragraph_2 && <p className="ItemPage__description">{item.description_paragraph_2}</p>}
            {item.description_paragraph_2 && item.description_paragraph_3 && <br />}
            {item.description_paragraph_3 && <p className="ItemPage__description">{item.description_paragraph_3}</p>}
          </div>}
          </div>
        </div>
        <div className="ItemPage__gallery">
        {imageUrls.map((url, index) => {
          let thumbnailImage = item[`image_url_${index + 1}_thumbnail`];
          return (
            <figure data-index={index} key={url}  className="ItemPage__gallery-figure">
              <img 
              src={primaryImageLoaded ? url : thumbnailImage} 
              alt={item[`image_${index + 1}_caption`]} 
              onLoad={() => handleImageLoad(url)} 
              className="ItemPage__gallery-image" />
              <figcaption className="ItemPage__gallery-caption">
                {item[`image_${index + 1}_caption`]}
              </figcaption>
            </figure>
          )
        })}
        </div>
        </>}
      </div>
    );
  }

export default ItemPage;
