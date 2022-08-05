const adSelector = "div[data-testid=top-impression-pixel]";
const sidebarSelector = "div[data-testid=sidebarColumn]";
const searchSelector = "form[aria-label='Search Twitter']";
const happeningSelector = "div[aria-label='Timeline: Trending now']";
const followSidebarSelector = "aside[aria-label='Who to follow']";
const footerSelector = "nav[aria-label='Footer']";
const messagesSelector = "div[data-testid=DMDrawer]";
const followSelector =
  "div[data-testid=primaryColumn] div[data-testid=UserCell]";
const topicsSelector = "div[aria-label='Timeline: Carousel']";

new MutationObserver(() => {
  document.querySelectorAll(adSelector).forEach((ad) => {
    // Twitter detects if you take down the whole tweet, so we are removing its direct child (:
    window.location.href.split("?")[0].split("/").pop() === "home"
      ? ad.parentElement.parentElement.parentElement.remove()
      : ad.parentElement.parentElement.parentElement.parentElement.remove();
  });
  const happening = document.querySelector(happeningSelector);
  if (happening) {
    happening.parentElement.parentElement.parentElement.remove();
  }
  const followSidebar = document.querySelector(followSidebarSelector);
  if (followSidebar) {
    followSidebar.parentElement.remove();
  }
  const footer = document.querySelector(footerSelector);
  if (footer) {
    footer.parentElement.remove();
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
      const title =
        topics.parentElement.parentElement.parentElement.parentElement
          .previousElementSibling.firstChild;
      const showMore =
        topics.parentElement.parentElement.parentElement.parentElement
          .nextElementSibling.firstChild;
      if (title && showMore) {
        title.remove();
        showMore.remove();
        topics.parentElement.parentElement.parentElement.remove();
      }
    }
  }
  /* const sidebar = document.querySelector(sidebarSelector);
  if (sidebar) {
    sidebar.remove();
  }
  const search = document.querySelector(searchSelector);
  if (search) {
    search.parentElement.parentElement.parentElement.parentElement.nextElementSibling.remove();
    search.parentElement.parentElement.parentElement.parentElement.remove();
  } */
}).observe(document.body, {
  subtree: true,
  childList: true,
});
