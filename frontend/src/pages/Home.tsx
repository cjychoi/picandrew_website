import './Home.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { useState } from 'react';

import img1 from '../assets/1.jpg';
import img2 from '../assets/2.jpg';
import img3 from '../assets/3.jpg';
import img4 from '../assets/4.jpg';
import img5 from '../assets/5.jpg';
import img6 from '../assets/6.jpg';
import img7 from '../assets/7.jpg';
import img8 from '../assets/8.jpg';
import img9 from '../assets/9.jpg';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import pauseIcon from '../assets/pause_icon.png';
import playIcon from '../assets/play_icon.png';

const slides = [img1, img2, img3, img4, img5, img6, img7, img8, img9];

const Home = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalSrc, setModalSrc] = useState('');

    const openModal = (src: string) => {
        setModalSrc(src);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setModalSrc('');
    };

    const [isPlaying, setIsPlaying] = useState(true);

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