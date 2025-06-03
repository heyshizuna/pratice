import { Article4 } from '@xwadex/fesd';
import { common, methods } from "@/commons";

$(async () => {
  // common Init
  common.inits()
  // pluginInit
  new Article4('._articleBlock')
  // coding...
  methods.noContentCheck();
})