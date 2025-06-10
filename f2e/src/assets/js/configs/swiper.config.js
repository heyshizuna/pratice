import { SwiperVer11 } from "@/plugins"
const {
    Pagination,
    Navigation,
    Autoplay,
} = SwiperVer11

export const bannerConfig = {
    modules: [Navigation, Pagination, Autoplay],
    autoplay: {
        delay: 5000,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
    },
    speed: 1200,
    slidesPerView: 1,
    preloadImages: false,
    centerInsufficientSlides: true,
    lazy: true,
    lazyPreloadPrevNext: 0,
    loop: true,
}
export const swiperConfig = {
    modules: [Navigation, Pagination, Autoplay],
    autoplay: {
        delay: 5000,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    speed: 1200,
    slidesPerView: 1,
    preloadImages: false,
    centerInsufficientSlides: true,
}