import { createContext, useContext, useState, useEffect } from 'react';

const ItemContext = createContext();

export function ItemProvider({ children }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Fetch data from Google Sheets
    const fetchData = async () => {
    const SHEET_ID = '1mqsNB3uBkdSgiM-yXvVNxont0-swRhBsDpAsibeQpnA';
    const API_KEY = 'AIzaSyCHRasM4agErGNMa64zlVjFLB1HlLra2Nc';
    const RANGE = 'Sheet1!A1:Z100';
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`;

      const res = await fetch(url);
      const data = await res.json();
      const headers = data.values[0];
      const rows = data.values.slice(1);
      const entries = rows.map(row =>
        Object.fromEntries(headers.map((h, i) => [h, row[i]]))
      );

      const usedSlugs = new Set();

    const itemsWithSlugs = entries.map(item => {
        // Generate base slug
        let baseSlug = item['Title']
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

        let slug = baseSlug;

        // If already used, append random string until it's unique
        while (usedSlugs.has(slug)) {
        const rand = Math.random().toString(36).substring(2, 6); // 4 random chars
        slug = `${baseSlug}-${rand}`;
        }

        usedSlugs.add(slug);


        const year = item['Year'] || new Date().getFullYear();

        const imageURL1Match = item['image_1_url'].match(/\/d\/(.+?)\//);
        const imageUrl1 = imageURL1Match
        ? `https://lh3.google.com/u/0/d/${imageURL1Match[1]}`
        : ''; 
        const randomId = Math.random().toString(36).substring(2, 12);


        return { 
            ...item, 
            id: randomId,
            Slug: slug,
            DisplayYear: year,
            ConvertedImageUrl1: imageUrl1
         };
    });

    setItems(itemsWithSlugs);
    };

    fetchData();
  }, []);

  return (
    <ItemContext.Provider value={{ items }}>
      {children}
    </ItemContext.Provider>
  );
}

export function useItems() {
  return useContext(ItemContext);
}
