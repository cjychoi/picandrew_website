import { useState, useMemo } from 'react';
import './Gallery.css';

// Dynamically import all images, preserving the path for metadata extraction
const imageModules = import.meta.glob('../assets/gallery/**/*.jpg', { eager: true });

interface ImageMetadata {
  title: string;
  date: string;
  focalLength: string;
  aperture: string;
  shutterSpeed: string;
  iso: string;
}

interface ImageData {
  src: string;
  collection: string;
  year: string;
  metadata: ImageMetadata;
}

// Function to parse the filename and path
const parseImageData = (path: string): ImageData | null => {
  const pathParts = path.split('/');
  const filename = pathParts.pop() || '';
  let collection = pathParts.pop()?.replace(/_/g, ' ') || 'Unknown';
  
  // Designate 'favorites' folder as the 'Favorites' collection
  if (collection === 'favorites') {
    collection = 'Favorites';
  }

  const regex = /^(.*?)_(\d{4}-\d{2}-\d{2})_(.*?)_(f[\d.]+)_([^_]+)_(\d+)\.jpg$/;
  const match = filename.match(regex);

  if (!match) return null;

  const [, title, date, focalLength, aperture, shutterSpeed, iso] = match;
  const year = date.substring(0, 4);

  return {
    src: (imageModules[path] as { default: string }).default,
    collection,
    year,
    metadata: {
      title: title.replace(/_/g, ' '),
      date,
      focalLength,
      aperture,
      shutterSpeed,
      iso,
    },
  };
};

const Gallery = () => {
    const [selectedCollection, setSelectedCollection] = useState('All');
    const [modalData, setModalData] = useState<ImageData | null>(null);

    const { allImages, collectionsByYear, favoritesCount } = useMemo(() => {
        const images = Object.keys(imageModules)
            .map(path => parseImageData(path))
            .filter((data): data is ImageData => data !== null);

        const collections: Record<string, Record<string, number>> = {};
        
        images.forEach(image => {
            // Exclude 'Favorites' from yearly collections to keep it as a top-level category
            if (image.collection === 'Favorites') return;
            const { year, collection } = image;
            if (!collections[year]) {
                collections[year] = {};
            }
            if (!collections[year][collection]) {
                collections[year][collection] = 0;
            }
            collections[year][collection]++;
        });
        
        const favoritesCount = images.filter(img => img.collection === 'Favorites').length;
        const sortedYears = Object.keys(collections).sort((a, b) => parseInt(b) - parseInt(a));
        
        const collectionsByYear: Record<string, {name: string, count: number}[]> = {};

        for (const year of sortedYears) {
            collectionsByYear[year] = Object.entries(collections[year])
                .map(([name, count]) => ({ name, count }))
                .sort((a, b) => a.name.localeCompare(b.name));
        }

        return { allImages: images, collectionsByYear, favoritesCount };
    }, []);

    const filteredImages = useMemo(() => {
        if (selectedCollection === 'All') return allImages;
        if (selectedCollection === 'Favorites') return allImages.filter(img => img.collection === 'Favorites');
        return allImages.filter(image => image.collection === selectedCollection);
    }, [selectedCollection, allImages]);

    const openModal = (imageData: ImageData) => setModalData(imageData);
    const closeModal = () => setModalData(null);

    const formatMetadata = (metadata: ImageMetadata) => {
        const { title, date, focalLength, aperture, shutterSpeed, iso } = metadata;
        const formattedDate = date.substring(0, 7); // YYYY-MM
        const formattedAperture = aperture.startsWith('f') ? `f/${aperture.substring(1)}` : aperture;
        const formattedShutter = shutterSpeed.includes('-') ? `1/${shutterSpeed.split('-')[1]}` : shutterSpeed;
        return `${title} | ${formattedDate} | ${focalLength} | ${formattedAperture} | ${formattedShutter} | ISO ${iso}`;
    };

    return (
        <div className="gallery-page">
            <aside className="sidebar">
                <h2>Collections</h2>
                <ul>
                    <li 
                        className={selectedCollection === 'All' ? 'active' : ''}
                        onClick={() => setSelectedCollection('All')}
                    >
                        All ({allImages.length})
                    </li>
                    <li 
                        className={selectedCollection === 'Favorites' ? 'active' : ''}
                        onClick={() => setSelectedCollection('Favorites')}
                    >
                        Favorites ({favoritesCount})
                    </li>
                </ul>
                {Object.entries(collectionsByYear).map(([year, collections]) => (
                    <div key={year}>
                        <h3>{year}</h3>
                        <ul>
                            {collections.map(({ name, count }) => (
                                <li 
                                    key={name}
                                    className={selectedCollection === name ? 'active' : ''}
                                    onClick={() => setSelectedCollection(name)}
                                >
                                    {`${name.charAt(0).toUpperCase() + name.slice(1)} (${count})`}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </aside>
            <main className="image-grid-container">
                <div className="photo-grid">
                    {filteredImages.map((image, index) => (
                        <div key={index} className="grid-item" onClick={() => openModal(image)}>
                            <img src={image.src} alt={image.metadata.title} />
                        </div>
                    ))}
                </div>
            </main>

            {modalData && (
                <div className="modal-overlay" onClick={closeModal}>
                    <img src={modalData.src} alt={modalData.metadata.title} className="modal-image" />
                    <div className="metadata">
                        <p>{formatMetadata(modalData.metadata)}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Gallery;