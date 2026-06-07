document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const closeBtn = document.querySelector(".close-btn");
  const menuContainer = document.querySelector(".menu-container");
  const menuItems = document.querySelectorAll(".menu-item");

  menuToggle.addEventListener("click", () => {
    menuContainer.style.left = "0%";
    shuffleAll();
    animateMenuItems(menuItems, "in");
  });

  closeBtn.addEventListener("click", () => {
    menuContainer.style.left = "-100%";
    animateMenuItems(menuItems, "out");
  });

  function animateMenuItems(items, direction) {
    items.forEach((item, index) => {
      setTimeout(() => {
        item.style.left = direction === "in" ? "0px" : "-100px";
      }, index * 50);
    });
  }

  const link = new SplitType(".menu-item a", { types: "words, chars" });
  const span = new SplitType(".menu-item span", {
    types: "words, chars",
  });
  const menuTitle = new SplitType(".menu-title p", {
    types: "words, chars",
  });
  const menuContent = new SplitType(".menu-content p", {
    types: "words, chars",
  });

  const links = document.querySelectorAll(
    ".menu-item, .menu-sub-item .menu-title, .menu-sub-item .menu-content"
  );

  document.querySelectorAll(".menu-item").forEach((item) => {
    const linkElement = item.querySelector(".menu-item-link a");
    if (linkElement) {
      const width = linkElement.offsetWidth;
      item.querySelector(".menu-item-link .bg-hover").style.width =
        width + 30 + "px";
      const spanElement = item.querySelector("span");
      if (spanElement) {
        spanElement.style.left = width + 40 + "px";
      }
    }

    const chars = item.querySelectorAll("span .char");

    function colorChars(chars) {
      chars.forEach((char, index) => {
        setTimeout(() => {
          char.classList.add("char-active");
        }, index * 50);
      });
    }

    function clearColorChars(chars) {
      chars.forEach((char) => {
        char.classList.remove("char-active");
      });
    }

    linkElement.addEventListener("mouseenter", () => {
      colorChars(chars);
    });

    linkElement.addEventListener("mouseleave", () => {
      clearColorChars(chars);
    });
  });

  links.forEach((link) => {
    link.addEventListener("mouseenter", (event) => {
      const targetElement = event.currentTarget.querySelector(
        ".menu-item-link a, .menu-title p, .menu-content p"
      );
      if (targetElement) {
        addShuffleEffect(targetElement);
      }
      const spanElement = link.querySelector("span");
      if (spanElement) {
        addShuffleEffect(spanElement);
      }
    });
  });

  function shuffleAll() {
    links.forEach((link) => {
      const targetElement = link.querySelector(
        ".menu-item-link a, .menu-title p, .menu-content p"
      );
      if (targetElement) {
        addShuffleEffect(targetElement);
      }
    });
  }

  function addShuffleEffect(element) {
    const chars = element.querySelectorAll(".char");
    const originalText = [...chars].map((char) => char.textContent);
    const shuffleInterval = 10;
    const resetDelay = 75;
    const additionalDelay = 150;

    chars.forEach((char, index) => {
      setTimeout(() => {
        const interval = setInterval(() => {
          char.textContent = String.fromCharCode(
            97 + Math.floor(Math.random() * 26)
          );
        }, shuffleInterval);

        setTimeout(() => {
          clearInterval(interval);
          char.textContent = originalText[index];
        }, resetDelay + index * additionalDelay);
      }, index * shuffleInterval);
    });
  }
});
