let adsHidden = 0;
let runs = 0;
let adSelector = "div[data-testid=top-impression-pixel]";
let sidebarSelector = "div[data-testid=sidebarColumn]";
let messagesSelector = "div[data-testid=DMDrawer]";
let followSelector = "div[data-testid=primaryColumn] div[data-testid=UserCell]";
let topicsSelector = "div[aria-label='Timeline: Carousel']";
new MutationObserver(() => {
  document.querySelectorAll(adSelector).forEach((ad) => {
    // Twitter detects if you take down the whole tweet, so we are removing its direct child (:
    window.location.href.split("?")[0].split("/").pop() === "home"
      ? ad.parentElement.parentElement.parentElement.remove()
      : ad.parentElement.parentElement.parentElement.parentElement.remove();
    adsHidden++;
  });
  const sidebar = document.querySelector(sidebarSelector);
  if (sidebar) {
    sidebar.remove();
  }
  const messages = document.querySelector(messagesSelector);
  if (messages) {
    messages.remove();
  }
  if (window.location.href.split("?")[0].split("/").pop() !== "explore") {
    const follow = document.querySelectorAll(followSelector);
    if (follow.length === 3) {
      follow[0].parentElement.parentElement.parentElement.previousElementSibling.firstChild.remove();
      follow[2].parentElement.parentElement.parentElement.nextElementSibling.firstChild.remove();
      follow.forEach((f) => {
        f.parentElement.parentElement.remove();
      });
    }
  }
  if (window.location.href.split("?")[0].split("/").pop() !== "topics") {
    const topics = document.querySelector(topicsSelector);
    if (topics) {
      topics.parentElement.parentElement.parentElement.parentElement.previousElementSibling.firstChild.remove();
      topics.parentElement.parentElement.parentElement.parentElement.nextElementSibling.firstChild.remove();
      topics.parentElement.parentElement.parentElement.remove();
    }
  }
  console.log(`Runs: ${++runs}, Ads hidden: ${adsHidden}`);
}).observe(document.body, {
  subtree: true,
  childList: true,
});
