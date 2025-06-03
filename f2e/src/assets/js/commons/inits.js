import {
  Aost4,
  ImageValidate
} from '@xwadex/fesd';
import {
  bodyScrollbarInit,
  appleDebug,
  fixMobile100vh,
  cgpagechange,
  scrollLock,
  scrollUnlock
} from '@xwadex/fesd/tools';
import { toBackend } from "@/commons/methods";
import { cookiePolicy } from "@/commons/pages";
import { lazyLoadImg } from '@/plugins';
import { navbar } from '@/ui';

const firstEntryHandler = {}

// 進場
firstEntryHandler.saveState = () => {
  // 進場動畫...
  localStorage.setItem('firstEntry', true);
}

firstEntryHandler.active = () => {
  $('.main-wrapper').addClass('show');
  setTimeout(() => {
    new Aost4('[data-aost]', {
      start: 95,
    });
  }, 100);
}

firstEntryHandler.init = () => {
  const firstEntry = localStorage.getItem('firstEntry');
  if (!firstEntry) firstEntryHandler.saveState()
    firstEntryHandler.active()
}

toBackend({ scrollLock, scrollUnlock });

export const inits = () => {
  // commonInit
  bodyScrollbarInit();
  appleDebug();
  fixMobile100vh();
  cgpagechange();
  // pluginInit
  lazyLoadImg();
  new ImageValidate();
  // uiInit
  navbar.init();
  cookiePolicy();
  // coding...
  firstEntryHandler.init();
}

//Don't Move and Delete!!!
if (!window || !$) throw new Error("window or $ undifine")
window.$ = window.jquery = $
