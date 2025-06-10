import { common, methods } from "@/commons";
// swiper
import { SwiperVer11 } from "@/plugins";
import { bannerConfig } from "@/configs"

// swiper
const { SwiperV11, Navigation, Pagination, Autoplay } = SwiperVer11
const swiperHandler = {};

swiperHandler.init = () => {
  const options = {
    modules: [Navigation, Pagination, Autoplay],
    // autoplay: {
    //   delay: 5000,
    // },
    navigation: {
      nextEl: '.swiper-box1 .swiper-button-next',
      prevEl: '.swiper-box1 .swiper-button-prev',
    },
    pagination: {
      el: '.swiper-box1 .swiper-pagination',
    },
    speed: 1200,
    slidesPerView: 1,
    preloadImages: false,
    centerInsufficientSlides: true,
    // lazy: true,
    // lazyPreloadPrevNext: 0,
    loop: true,
  }
  new SwiperV11('.swiper-box .swiper1', options);
}

$(async () => {
  // common Init
  common.inits()
  // coding...
  methods.noContentCheck();
  swiperHandler.init();
})