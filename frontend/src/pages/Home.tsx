import './Home.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';

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

const slides = [img1, img2, img3, img4, img5, img6, img7, img8, img9];


const Home = () => {
    return (
        <main className='mainHome'>
            <div className='picSwiper'>
                <Swiper
                    modules={[Navigation, Autoplay]}
                    navigation
                    autoplay={{
                        delay: 2000,             // 2 s per slide
                        disableOnInteraction: false,   // keep autoplaying after user swipes
                        pauseOnMouseEnter: true,       // stop while pointer is over slider
                    }}
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
            </div>
        </main>
    );
};

export default Home;