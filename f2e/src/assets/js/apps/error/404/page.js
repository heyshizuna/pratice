import { common, pageCounterInit } from "@/commons";

$(async () => {
  common.inits()
  const backHomeElement = document.querySelector('.back-home')
  const href = backHomeElement ? backHomeElement.getAttribute('href') : null

  if (!backHomeElement || !href) return;
  pageCounterInit(6, href)
})
