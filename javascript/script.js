const nav = document.querySelector(".nav");
const hamburger = document.querySelector(".hamburger");
const one = document.querySelector(".one");
const two = document.querySelector(".two");
const navLinks = document.querySelectorAll(".nav__links li a");
const navLinksContainer = document.querySelector(".nav__links-container");
const hiddenCards = document.querySelectorAll(".hidden-card");
const projectsBtn = document.querySelector(".projects__btn");
const contactForm = document.querySelector(".contact__form");
const inputName = document.querySelector("#name");
const inputEmail = document.querySelector("#email");
const inputMessage = document.querySelector("#message");
const contactBtn = document.querySelector(".contact__btn");
const blurImage = document.querySelectorAll(".blur-load");
const headerContainer = document.querySelector(".header__container");
const sections = document.querySelectorAll("section");

// toggle nav menu
const toggleNav = () => {
  hamburger.classList.toggle("openNavLinks");
  one.classList.toggle("openNavLinks");
  two.classList.toggle("openNavLinks");
  navLinksContainer.classList.toggle("openNavLinks");
};

hamburger.addEventListener("click", () => toggleNav());

navLinks.forEach((link) => {
  link.addEventListener("click", () => toggleNav());
});

window.addEventListener("scroll", () => {
  const navHeight = nav.getBoundingClientRect().height;
  const scrollHeight = window.scrollY;

  if (scrollHeight > navHeight) {
    nav.classList.add("blurred");
  } else {
    nav.classList.remove("blurred");
  }
});

navLinks.forEach((link) => {
  link.addEventListener("mouseleave", () => {
    link.classList.add("mouseleave");

    setTimeout(() => link.classList.remove("mouseleave"), 300);
  });
});

// show more projects
projectsBtn.addEventListener("click", () => {
  hiddenCards.forEach((card) => {
    if (card.classList.contains("hidden")) {
      card.classList.remove("hidden");
      projectsBtn.textContent = "View less";
    } else {
      card.classList.add("hidden");
      projectsBtn.textContent = "View more";
    }
  });
});

// email js
emailjs.init("sT43Sprh9j8XzRIht");

const sendFormDetails = () => {
  const params = {
    from_name: inputName.value,
    user_email: inputEmail.value,
    message: inputMessage.value,
  };

  emailjs.send("service_1dn5nrk", "template_3jn1h8l", params).then(
    function () {
      (inputName.value = ""),
        (inputEmail.value = ""),
        (inputMessage.value = "");
      contactBtn.textContent = "Message sent ✔";
      contactBtn.classList.add("color-green");
      contactBtn.style.borderColor = "rgb(15, 207, 15)";

      setTimeout(() => {
        contactBtn.textContent = "Send Message";
        contactBtn.classList.add("color");
        contactBtn.classList.remove("color-green");
        contactBtn.style.borderColor = "#d4dce8";
      }, 5000);
    },
    function (error) {}
  );
};

contactForm.addEventListener("submit", function (event) {
  event.preventDefault();
  sendFormDetails();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    sendFormDetails();
  }
});

// gsap
const initialAnimation = () => {
  const tl = gsap.timeline({
    defaults: { duration: 1.2, ease: "Power3.easeOut" },
  });

  tl.from(".nav", { y: 50, autoAlpha: 0, delay: 0.6 })
    .from(".header__deco", { y: "-100%", autoAlpha: 0 }, "<")
    .from(".header__title-text", { y: "100%", autoAlpha: 0 }, "<")
    .from(".header__text-text", { y: "100%", autoAlpha: 0 }, "<")
    .from(".header__svg img", { y: "100%", autoAlpha: 0 }, "<");
};

const scrollAnimation = () => {
  const sectionTrigger = (sectionName, sectionTitle, sectionContent) => {
    const tl = gsap.timeline({
      defaults: { duration: 1.2, ease: "Power3.easeOut" },
      scrollTrigger: {
        trigger: sectionName,
        start: "top 85%",
        end: "bottom bottom",
      },
    });

    tl.from(sectionTitle, { y: "100%", delay: 0.6 }).from(
      sectionContent,
      { y: 50, autoAlpha: 0 },
      "<75%"
    );
  };

  sectionTrigger(".about", ".about__title-text", ".about__content");
  sectionTrigger(".projects", ".projects__title-text", ".projects__content");
  sectionTrigger(".contact", ".contact__title-text", ".contact__content");
};

const footerAnimation = () => {
  const tl = gsap.timeline({
    defaults: { duration: 1.2, ease: "Power3.easeOut" },
    scrollTrigger: {
      trigger: ".footer",
      start: "top 85%",
      end: "top bottom",
    },
  });

  tl.from(".footer__deco", { y: "100%", delay: 0.6, autoAlpha: 0 }).from(
    ".footer__container",
    { autoAlpha: 0 }
  );
};

window.addEventListener("load", () => {
  initialAnimation();
  scrollAnimation();
  footerAnimation();
});
