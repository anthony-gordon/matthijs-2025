import { useParams } from 'react-router-dom';
import { useItems } from './../ItemContext';

function ItemPage() {
    const { slug } = useParams();
    const { items } = useItems();
  
    const item = items.find(i => i.Slug === slug);
    if (!item) return <p>Loading or not found...</p>;
  
    return (
      <div>
        <h1>{item.Name}</h1>
        <img src={item['Image URL']} alt={item.Name} />
        <p>{item.Description}</p>
      </div>
    );
  }

export default ItemPage;
