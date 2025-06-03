// plugins
import {
  Modal4,
  Video4,
  Anchor4,
  Collapse4,
  Share4,
  ImagePreview
} from '@xwadex/fesd';
import {
  delay,
  isVideo,
  CustomForm,
  scrollLock,
  scrollUnlock
} from '@xwadex/fesd/tools';
import {
  common,
  methods
} from "@/commons"
// flatpickr
import { Mandarin } from "flatpickr/dist/l10n/zh.js"
// swiper
import { SwiperVer11 } from "@/plugins";
import { bannerConfig } from "@/configs"

// swiper
const { SwiperV11 } = SwiperVer11
const swiperHandler = {};

swiperHandler.banner = function () {
  const bannerEvents = {
    ...bannerConfig,
    init() {
      console.log('swiper init!!');
    },
    slideChangeTransitionStart(swiper) {
      isVideo(swiper);
    },
  };
  const banner = new SwiperV11('.swiper', bannerEvents );
};

swiperHandler.all = function () {
  this.banner();
};

// 第一區塊
const s1Handler = function () {
  new ImagePreview('.upload-btn');

  function greetings() {
    const date = new Date();
    const hours = parseInt(date.getHours());
    if (hours >= 0 && hours < 12) {
      return 'Good morning !';
    } else if (hours >= 12 && hours < 18) {
      return 'Good afternoon !';
    } else if (hours >= 18 && hours < 24) {
      return 'Good evening !';
    }
  }

  const text = document.querySelector('.welcome-wrap').querySelector('.text p');
  text.innerText = greetings();
};

const s4Handler = function () {
  const dropdown = document.querySelector('.dropdown3');
  const data = JSON.parse(dropdown.dataset.json);
  dropdown.removeAttribute('data-json');
  /**
   * 將傳入的 HTML 結構字串轉為實際結構
   * @param {string} htmlString HTML結構字串
   * @returns
  */
  function createElementFromHTML(htmlString) {
    const div = document.createElement('div');
    div.innerHTML = htmlString.trim();
    return div.innerHTML;
  }
  /**
   * 產生次分類選項
   * @param {object} data 資料陣列
   * @returns
  */
  function createOptions(data) {
    let optionDOM = '';
    let li = '';
    data.forEach(item => {
      item.options.forEach(option => {
        li += `<li data-option="${option}">${option}</li>`;
      });
      const dom = `
      <li class="has-sublayer">
      <div class="header">
      <div class="title" title="${item.title}">${item.title}</div>
      <div class="icon"></div>
      </div>
      <div class="sub-dropdown">
      <ul class="sub-dropdown-list">
      ${li}
      </ul>
      </div>
      </li>
      `;
      optionDOM += dom;
    });
    return createElementFromHTML(optionDOM);
  }
  dropdown.on('change', function () {
    const d4 = this;
    const val = d4.s.value.id;
    const controlDropdownEl = document.querySelector(d4.getAttribute('control-elements'));
    if (controlDropdownEl) {
      controlDropdownEl.querySelector('.dropdown-list').textContent = '';
      controlDropdownEl.querySelector('.dropdown-list').innerHTML = createOptions(data[val]);
      controlDropdownEl.update();
      // 切換主類別時次類別自動帶入第一個選項
      const firstOption = data[val][0].options[0];
      controlDropdownEl.setAttribute('d4-value', firstOption);
    }
  });
};

const s6Handler = function () {
  // 簡易版
  methods.collapseEvent('[data-collapse-click]', '[data-collapse]', true, true)
  // 公版
  collapse: new Collapse4('[partnerCollapse-wrapper]', {
    defaultOpen: false,
    single: true,
    targetStopPropagation: true,
    on: {
      afterCollapse() {
        console.log('afterCollapse');
      }
    },
  })
};

const s8Handler = function () {
  const wddForm = document.querySelector('.wdd-form');
  const locale = wddForm.getAttribute('lang');
  const form = new CustomForm('.wdd-form', {
    locale: locale ? locale : 'zh-TW',
    clearEl: '.btn.form-clear',
    submitEl: '.btn.form-done',
    errorText: {
      underField: true,
      detailOutput: '.error-detail',
    },
  });
  wddForm.addEventListener('submit', function () {
    console.log('submit', wddForm.value);
  });
};
// -- 方法 給後端
const test = () => {
  console.log('toBackend test!!!');
}
// 使用 document.body.fesd.test()
methods.toBackend({ test });

$(async () => {
  // common Init
  common.inits()
  // plugins Init
  new Modal4('[data-modal-target]', {
    on: {
      open(modal) {
        const scrollers = modal.querySelectorAll('[data-overlayscrollbars-viewport]');
        scrollLock([...scrollers]);
      },
      close(modal) {
        const scrollers = modal.querySelectorAll('[data-overlayscrollbars-viewport]');
        scrollUnlock([...scrollers]);
      },
    },
  });
  new Video4('[video-target]');
  new Share4('[web-share]');
  new Anchor4('[data-anchor-target]');
  // await
  await delay(500);
  // coding...
  swiperHandler.all();
  s1Handler();
  s4Handler();
  s6Handler();
  s8Handler();
});
