import { useParams } from 'react-router-dom';
import { useItems } from './../ItemContext';
import { useEffect, useState } from 'react';
import './../style/ItemPage.css'; 
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";

function ItemPage() {
    const { slug } = useParams();
    const { items } = useItems();
    const item = items.find(i => i.Slug === slug);

    const [images, setImages] = useState([])
    const [index, setIndex] = useState(-1); // -1 = closed
    const [imageUrls, setimageUrls] = useState([]);
    const [primaryImageSrc, setPrimaryImageSrc] = useState('');
    const [primaryImageThumbnailSrc, setPrimaryImageThumbnailSrc] = useState('');
    const [loadedImages, setLoadedImages] = useState({});

    const primaryImageLoaded = item ? loadedImages[item.id] : false;

    console.log('images', images)
    
    useEffect(() => {
      if (!item) return;
      
      if(imageUrls.length == 0){
        setimageUrls(Object.entries(item)
        .filter(([key, value]) => /^image_\d+_url$/.test(key) && value) 
        .map(([key, value]) => value));
      
      setPrimaryImageSrc(item['image_1_url']);
      setPrimaryImageThumbnailSrc(item['image_1_url_thumbnail']);
      }

      if(imageUrls.length > 0){
        setImages(imageUrls.map((url, index) => ({ src: url, title: item[`image_${index + 1}_caption`] })));

      }
    }, [item, imageUrls])
  

    
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
            <figure className="ItemPage__primary-mobile-image-figure">
            <img
              className="ItemPage__primary-image-mobile"
              src={primaryImageLoaded ? primaryImageSrc : primaryImageThumbnailSrc} 
              onLoad={() => handleImageLoad(item.id)} 
              alt={item['image_1_caption']}
              onClick={() => setIndex(0)}
            />
            <figcaption className="ItemPage__primary-mobile-image-caption">
                {item['image_1_caption']}
              </figcaption>
            </figure>
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
              onClick={() => setIndex(index)}
              className="ItemPage__gallery-image" />
              <figcaption className="ItemPage__gallery-caption">
                {item[`image_${index + 1}_caption`]}
              </figcaption>
            </figure>
          )
        })}
        </div>
        <Lightbox
          open={index >= 0}
          close={() => setIndex(-1)}
          slides={images}
          index={index}
          plugins={[Zoom, Captions]}
          on={{ view: ({ index }) => setIndex(index) }}
        />
        </>}
      </div>
    );
  }

export default ItemPage;
