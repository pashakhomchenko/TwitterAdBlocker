const adSelector = "div[data-testid=top-impression-pixel]";
const sidebarSelector = "div[data-testid=sidebarColumn]";
const messagesSelector = "div[data-testid=DMDrawer]";
const followSelector =
  "div[data-testid=primaryColumn] div[data-testid=UserCell]";
const listsSelector =
  "div[data-testid=primaryColumn] div[data-testid=listCell]";

function removeSidebarContent(sidebarContent) {
  for (let i = 2; i < sidebarContent.length; i++) {
    sidebarContent[i].remove();
  }
}

new MutationObserver(() => {
  document.querySelectorAll(adSelector).forEach((ad) => {
    // Twitter/X detects if you take down the whole tweet, so we are removing its direct child (:
    ad.parentElement.parentElement.parentElement.remove();
  });

  const sidebar = document.querySelector(sidebarSelector);
  var sidebarContent =
    sidebar?.childNodes[0]?.childNodes[1]?.childNodes[0]?.childNodes[0]
      ?.childNodes[0]?.childNodes;

  // Different pages have different sidebar structure
  if (sidebarContent?.length > 2) {
    removeSidebarContent(sidebarContent);
  }
  if (sidebarContent?.length == 1 && sidebarContent[0].childNodes.length > 2) {
    sidebarContent = sidebarContent[0].childNodes;
    removeSidebarContent(sidebarContent);
  }

  const messages = document.querySelector(messagesSelector);
  if (messages) {
    messages.remove();
  }

  if (
    !window.location.href.includes("explore") &&
    !window.location.href.includes("connect_people") &&
    !window.location.href.includes("followers_you_follow") &&
    !window.location.href.includes("followers") &&
    !window.location.href.includes("following")
  ) {
    document.querySelectorAll(followSelector).forEach((f) => {
      if (
        f.parentElement.parentElement.parentElement.previousElementSibling &&
        f.parentElement.parentElement.parentElement.nextElementSibling
          ?.nextElementSibling
      ) {
        f.parentElement.parentElement.parentElement.previousElementSibling.style.display =
          "none";
        f.parentElement.parentElement.parentElement.style.display = "none";
        f.parentElement.parentElement.parentElement.nextElementSibling.style.display =
          "none";
        f.parentElement.parentElement.parentElement.nextElementSibling.nextElementSibling.style.display =
          "none";
      }
    });
  }
  if (!window.location.href.includes("lists")) {
    document.querySelectorAll(listsSelector).forEach((f) => {
      f.parentElement.parentElement.parentElement.previousElementSibling.previousElementSibling.style.display =
        "none";
      f.parentElement.parentElement.parentElement.previousElementSibling.style.display =
        "none";
      f.parentElement.parentElement.parentElement.style.display = "none";
      f.parentElement.parentElement.parentElement.nextElementSibling.style.display =
        "none";
      f.parentElement.parentElement.parentElement.nextElementSibling.nextElementSibling.style.display =
        "none";
    });
  }
}).observe(document.body, {
  subtree: true,
  childList: true,
});
