// errorPage
export function pageCounterInit(time, href) {
  let countdownInterval;
  let second = time;

  countdownInterval = setInterval(() => {
    second--;
    randerCountdownContent(second)
    if (second === 0) {
      clearInterval(countdownInterval);
      window.location.href = href;
    }
  }, 1000);
}
// errorPage
export function randerCountdownContent(content) {
  const countdown = document.querySelector('.back-home .countdown');
  countdown.textContent = content;
}