export const cookiePolicy = () => {
  const $cookiePolicy = $(".cookie-check"); 
  if (!$cookiePolicy.length) return;
  
  const $agreeBtn = $cookiePolicy.find(".agree");
  const $closeBtn = $cookiePolicy.find(".close");

  const firstEnterDetect = () => {
    // 請記得更改 cookie 存入的值
    const agreeLocal = localStorage.getItem("frameworkCookie-agree");
    const agreeSession = sessionStorage.getItem("frameworkCookie-agree");
  
    if (agreeLocal !== "true" && agreeSession !== "false") {
      $cookiePolicy.addClass("first-enter");
      setTimeout(() => {
        $cookiePolicy.addClass("show");
      }, 800);
    }
  };
  
  // 點擊事件
  const clickEvent = () => {
    $agreeBtn.on("click", () => {
      $cookiePolicy.addClass("agree");
      localStorage.setItem("frameworkCookie-agree", "true");
    });
  
    $closeBtn.on("click", () => {
      $cookiePolicy.addClass("hidden");
      sessionStorage.setItem("frameworkCookie-agree", "false");
    });
  };

  // 執行事件
  firstEnterDetect();
  clickEvent();
};
