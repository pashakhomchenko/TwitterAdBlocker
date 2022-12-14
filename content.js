const adSelector = "div[data-testid=top-impression-pixel]";
const sidebarSelector = "div[data-testid=sidebarColumn]";
const messagesSelector = "div[data-testid=DMDrawer]";
const followSelector =
  "div[data-testid=primaryColumn] div[data-testid=UserCell]";
const listsSelector =
  "div[data-testid=primaryColumn] div[data-testid=listCell]";

new MutationObserver(() => {
  document.querySelectorAll(adSelector).forEach((ad) => {
    // Twitter detects if you take down the whole tweet, so we are removing its direct child (:
    ad.parentElement.parentElement.parentElement.remove();
  });
  const sidebar = document.querySelector(sidebarSelector);
  if (
    sidebar?.childNodes[0]?.childNodes[1]?.childNodes[0]?.childNodes[0]
      ?.childNodes[0]?.childNodes?.length == 4
  ) {
    const sidebarContent =
      sidebar.childNodes[0].childNodes[1].childNodes[0].childNodes[0]
        .childNodes[0];
    sidebarContent.remove();
  }
  if (
    sidebar?.childNodes[0]?.childNodes[1]?.childNodes[0]?.childNodes[0]
      ?.childNodes[0]?.childNodes?.length == 5
  ) {
    const sidebarChildren =
      sidebar.childNodes[0].childNodes[1].childNodes[0].childNodes[0]
        .childNodes[0].childNodes;
    sidebarChildren[4].remove();
    sidebarChildren[3].remove();
    sidebarChildren[2].remove();
  }
  if (
    sidebar?.childNodes[0]?.childNodes[1]?.childNodes[0]?.childNodes[0]
      ?.childNodes[0]?.childNodes?.length == 6
  ) {
    const sidebarChildren =
      sidebar.childNodes[0].childNodes[1].childNodes[0].childNodes[0]
        .childNodes[0].childNodes;
    sidebarChildren[5].remove();
    sidebarChildren[4].remove();
    sidebarChildren[3].remove();
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
