let adsHidden = 0;
let runs = 0;
let adSelector = "div[data-testid=top-impression-pixel]";
let happeningSelector = "div[aria-label='Trending']";
let messagesSelector = "div[data-testid=DMDrawer]";
new MutationObserver(() => {
  document.querySelectorAll(adSelector).forEach((ad) => {
    // Twitter detects if you take down the whole tweet, so we are removing its children (:
    ad.parentElement.parentElement.parentElement.remove();
    adsHidden++;
  });
  const happening = document.querySelector(happeningSelector);
  if (happening) {
    happening.remove();
  }
  const messages = document.querySelector(messagesSelector);
  if (messages) {
    messages.remove();
  }
  console.log(`Runs: ${++runs}, Ads hidden: ${adsHidden}`);
}).observe(document.body, {
  subtree: true,
  childList: true,
});
