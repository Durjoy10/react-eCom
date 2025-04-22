import { useRef } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'; // Using Feather Icons
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from './Showcase1.module.css';

interface BannerItem {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  cta: string;
  link: string;
}

const Showcase1 = () => {
  const swiperRef = useRef<any>(null);
  const banners: BannerItem[] = [
    {
      id: 1,
      title: "Summer Sale",
      subtitle: "Up to 50% Off",
      image: "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      cta: "Shop Now",
      link: "/summer-sale"
    },
    {
      id: 2,
      title: "New Arrivals",
      subtitle: "Discover the Latest Trends",
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      cta: "Explore",
      link: "/new-arrivals"
    },
    {
      id: 3,
      title: "Limited Offer",
      subtitle: "Only This Weekend",
      image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      cta: "Grab Now",
      link: "/weekend-deal"
    }
  ];

  return (
    <div className={styles.container}>
      <Swiper
        ref={swiperRef}
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className={styles.swiper}
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <div className={styles.slideContainer}>
              <img
                src={banner.image}
                alt={banner.title}
                className={styles.slideImage}
              />
              {/* <div className={styles.overlay}>
                <div className={styles.content}>
                  <h2 className={styles.title}>{banner.title}</h2>
                  <p className={styles.subtitle}>{banner.subtitle}</p>
                  <button className={styles.ctaButton}>
                    {banner.cta}
                  </button>
                </div>
              </div> */}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <div className={styles.navigationContainer}>
        <button
          onClick={() => swiperRef.current?.swiper.slidePrev()}
          className={styles.navButton}
          aria-label="Previous slide"
        >
          <FiChevronLeft className={styles.navIcon} />
        </button>
        <button
          onClick={() => swiperRef.current?.swiper.slideNext()}
          className={styles.navButton}
          aria-label="Next slide"
        >
          <FiChevronRight className={styles.navIcon} />
        </button>
      </div>
    </div>
  );
};

export default Showcase1;