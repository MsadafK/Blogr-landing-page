document.addEventListener("DOMContentLoaded", (event) => {
  // Selecting DOM elements
  const hamburger_icon = document.querySelector(
    ".header__nav-and-logo-container__hamburger-icon"
  );
  const cross_icon = document.querySelector(
    ".header__nav-and-logo-container__close-icon"
  );
  const list_items = document.querySelectorAll(
    ".header__nav-and-logo-container__mobile-nav-container__list__item"
  );
  const mob_nav = document.querySelector(
    ".header__nav-and-logo-container__mobile-nav-container"
  );

  // Variables to track the current mode (mobile or desktop)
  let isMobile = false;

  // handleClick function
  function handleClick() {
    hamburger_icon.classList.toggle("active");
    cross_icon.classList.toggle("active");
    mob_nav.classList.toggle("active");
  }

  // Function to rotate arrow heads
  function handleRotate(item) {
    list_items.forEach((itemx) => {
      if (itemx === item)
        itemx.children[0].children[0].classList.toggle("rotate");
    });
  }

  // Add desktop-specific hover behavior
  function forDesktop() {
    list_items.forEach((item) => {
      item.addEventListener("mouseover", handleMouseOver);
      item.addEventListener("mouseout", handleMouseOut);
    });
  }

  function handleMouseOver(event) {
    const item = event.currentTarget;
    const link = item.querySelector("a");
    const sublist = item.querySelector(".sublist");
    if (sublist) {
      link.classList.add("changeTextColor");
      handleRotate(item);
      sublist.classList.add("flex");
    }
  }

  function handleMouseOut(event) {
    const item = event.currentTarget;
    const link = item.querySelector("a");
    const sublist = item.querySelector(".sublist");
    if (sublist) {
      link.classList.remove("changeTextColor");
      handleRotate(item);
      sublist.classList.remove("flex");
    }
  }

  // Add mobile-specific click behavior
  function forMobile() {
    list_items.forEach((item) =>
      item.addEventListener("click", handleClickOnMobile)
    );
  }

  function handleClickOnMobile(event) {
    const item = event.currentTarget;
    list_items.forEach((itemx) => {
      const sublist = itemx.querySelector(".sublist");
      if (sublist && itemx !== item) {
        itemx.children[0].children[0].classList.remove("rotate");
        sublist.classList.remove("flex");
        itemx.querySelector("a").classList.remove("changeTextColor");
      }
      if (sublist && itemx === item) {
        itemx.children[0].children[0].classList.toggle("rotate");
        sublist.classList.toggle("flex");
        itemx.querySelector("a").classList.toggle("changeTextColor");
      }
    });
  }

  // Remove all desktop-specific event listeners
  function removeDesktopListeners() {
    list_items.forEach((item) => {
      item.removeEventListener("mouseover", handleMouseOver);
      item.removeEventListener("mouseout", handleMouseOut);
    });
  }

  // Remove all mobile-specific event listeners
  function removeMobileListeners() {
    list_items.forEach((item) => {
      item.removeEventListener("click", handleClickOnMobile);
    });
  }

  // Manage the behavior based on the screen size
  function handleScreenResize() {
    const screenWidth = window.innerWidth;
    if (screenWidth < 768 && !isMobile) {
      isMobile = true;
      removeDesktopListeners();
      forMobile();
    } else {
      isMobile = false;
      removeMobileListeners();
      forDesktop();
    }
  }

  // Initial setup
  handleScreenResize();

  // Listen for screen resize
  window.addEventListener("resize", handleScreenResize);

  // Adding event listeners
  hamburger_icon.addEventListener("click", handleClick);
  cross_icon.addEventListener("click", handleClick);
});
