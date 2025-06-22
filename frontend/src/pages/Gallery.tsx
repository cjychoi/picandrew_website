import { useState, useMemo, useEffect, useCallback } from 'react';
import './Gallery.css';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

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

interface Collection {
  name: string;
  count: number;
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
    const [isCollectionsOpen, setIsCollectionsOpen] = useState(window.innerWidth > 768);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) {
                setIsCollectionsOpen(true);
            } else {
                setIsCollectionsOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const { allImages, collections, favoritesCount }: { allImages: ImageData[], collections: Collection[], favoritesCount: number } = useMemo(() => {
        const images: ImageData[] = Object.keys(imageModules)
            .map(path => parseImageData(path))
            .filter((data): data is ImageData => data !== null);

        const collectionMap: Record<string, number> = {};
        
        images.forEach((image: ImageData) => {
            if (image.collection === 'Favorites') return;
            const { collection } = image;
            if (!collectionMap[collection]) {
                collectionMap[collection] = 0;
            }
            collectionMap[collection]++;
        });
        
        const favoritesCount = images.filter((img: ImageData) => img.collection === 'Favorites').length;
        
        const collections: Collection[] = Object.entries(collectionMap)
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => a.name.localeCompare(b.name));

        return { allImages: images, collections, favoritesCount };
    }, []);

    const filteredImages = useMemo(() => {
        if (selectedCollection === 'All') return allImages.filter((img: ImageData) => img.collection !== 'Favorites');
        if (selectedCollection === 'Favorites') return allImages.filter((img: ImageData) => img.collection === 'Favorites');
        return allImages.filter((image: ImageData) => image.collection === selectedCollection);
    }, [selectedCollection, allImages]);

    const openModal = (imageData: ImageData) => setModalData(imageData);
    const closeModal = () => setModalData(null);

    const showNextImage = useCallback(() => {
        if (!modalData) return;
        const currentIndex = filteredImages.findIndex(img => img.src === modalData.src);
        if (currentIndex !== -1) {
            const nextIndex = (currentIndex + 1) % filteredImages.length;
            setModalData(filteredImages[nextIndex]);
        }
    }, [modalData, filteredImages]);

    const showPrevImage = useCallback(() => {
        if (!modalData) return;
        const currentIndex = filteredImages.findIndex(img => img.src === modalData.src);
        if (currentIndex !== -1) {
            const prevIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
            setModalData(filteredImages[prevIndex]);
        }
    }, [modalData, filteredImages]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!modalData) return;

            if (e.key === 'Escape') {
                closeModal();
            } else if (e.key === 'ArrowRight') {
                showNextImage();
            } else if (e.key === 'ArrowLeft') {
                showPrevImage();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [modalData, showNextImage, showPrevImage]);

    const formatMetadata = (metadata: ImageMetadata) => {
        const { title, date, focalLength, aperture, shutterSpeed, iso } = metadata;
        const formattedDate = date.substring(0, 7); // YYYY-MM
        const formattedAperture = aperture.startsWith('f') ? `f/${aperture.substring(1)}` : aperture;
        const formattedShutter = shutterSpeed.includes('-') ? `1/${shutterSpeed.split('-')[1]}` : shutterSpeed;
        return `${title} | ${formattedDate} | ${focalLength} | ${formattedAperture} | ${formattedShutter} | ISO ${iso}`;
    };

    const toggleCollections = () => {
        if (window.innerWidth <= 768) {
            setIsCollectionsOpen(!isCollectionsOpen);
        }
    };

    return (
        <div className="gallery-page">
            <aside className="sidebar">
                <div className="collections-menu">
                    <h2 className="collections-toggle" onClick={toggleCollections}>
                        Collections
                        <span className="chevron-container">
                            {isCollectionsOpen ? <FaChevronUp /> : <FaChevronDown />}
                        </span>
                    </h2>
                    <ul className={`collections-list ${isCollectionsOpen ? 'open' : ''}`}>
                        <li>
                            <span
                                className={selectedCollection === 'All' ? 'active' : ''}
                                onClick={() => setSelectedCollection('All')}
                            >
                                All ({allImages.filter((img: ImageData) => img.collection !== 'Favorites').length})
                            </span>
                        </li>
                        <li>
                            <span
                                className={selectedCollection === 'Favorites' ? 'active' : ''}
                                onClick={() => setSelectedCollection('Favorites')}
                            >
                                Favorites ({favoritesCount})
                            </span>
                        </li>
                        {collections.map(({ name, count }: Collection) => (
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
                    <button className="nav-button prev" onClick={(e) => { e.stopPropagation(); showPrevImage(); }}>&#10094;</button>
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}} onClick={(e) => e.stopPropagation()}>
                      <img src={modalData.src} alt={modalData.metadata.title} className="modal-image" />
                      <div className="metadata">
                          <p>{formatMetadata(modalData.metadata)}</p>
                      </div>
                    </div>
                    <button className="nav-button next" onClick={(e) => { e.stopPropagation(); showNextImage(); }}>&#10095;</button>
                </div>
            )}
        </div>
    );
};

export default Gallery;