import './Home.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { useState, useMemo } from 'react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import pauseIcon from '../assets/pause_icon.png';
import playIcon from '../assets/play_icon.png';

// Dynamic import of all images from the main folder
const imageModules = import.meta.glob('../assets/gallery/main/*.jpg', { eager: true });

const Home = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalSrc, setModalSrc] = useState('');
    const [isPlaying, setIsPlaying] = useState(true);

    // Process and sort images in reverse numerical order
    const slides = useMemo(() => {
        const imageEntries = Object.entries(imageModules);
        
        // Extract image paths and sort by filename numerically in reverse order
        const sortedImages = imageEntries
            .map(([path, module]) => ({
                path,
                src: (module as { default: string }).default,
                // Extract number from filename (e.g., "1.jpg" -> 1)
                number: parseInt(path.match(/(\d+)\.jpg$/)?.[1] || '0')
            }))
            .sort((a, b) => b.number - a.number) // Reverse order (newest first)
            .map(item => item.src);

        return sortedImages;
    }, []);

    const openModal = (src: string) => {
        setModalSrc(src);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setModalSrc('');
    };

    const autoplayConfig = isPlaying
        ? {
            delay: 2000,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
            }
        : false;

    return (
        <main className='mainHome'>
            <div className='picSwiper'>
                <Swiper
                    modules={[Navigation, Autoplay]}
                    navigation
                    autoplay={autoplayConfig}
                    speed={800}
                    loop={true}
                    spaceBetween={50}
                    slidesPerView={1}
                >
                    {slides.map((src, i) => (
                        <SwiperSlide key={i}>
                            <img src={src} alt={`Slide ${i + 1}`} className="slideImg" />
                        </SwiperSlide>
                    ))}
                </Swiper>
                <button className="pauseBtn" onClick={() => setIsPlaying(!isPlaying)}>
                    <img
                        src={isPlaying ? pauseIcon : playIcon}
                        alt={isPlaying ? 'Pause' : 'Play'}
                        className="pauseIcon"
                    />
                </button>
            </div>

            <div className="photoGrid">
                {slides.map((src, i) => (
                    <div className="gridItem" key={i} onClick={() => openModal(src)}>
                    <img src={src} alt={`Grid ${i + 1}`} />
                    </div>
                ))}

                {/* Modal overlay */}
                {modalVisible && (
                    <div className="modalOverlay" onClick={closeModal}>
                    <img className="modalImage" src={modalSrc} alt="Full View" />
                    </div>
                )}
            </div>
        </main>
    );
};

export default Home;