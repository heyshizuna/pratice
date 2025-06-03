import LazyLoad from 'vanilla-lazyload';
import { lazyOptionsConfig } from "@/configs"

export function lazyLoadImg(options) {
  if (options) {
    return new LazyLoad(options)
  } else {
    return new LazyLoad(lazyOptionsConfig)
  }
}
