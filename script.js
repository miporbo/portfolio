/* ---------- FOOTER YEAR ---------- */
const yearElement = document.getElementById("y");
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

/* ---------- THEME TOGGLE ---------- */
const root = document.documentElement;
const themeBtn = document.getElementById("theme-toggle");

themeBtn?.addEventListener("click", () => {
  const current = root.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  root.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
});

/* ---------- MOBILE MENU ---------- */
const navToggle = document.getElementById("nav-toggle");
document.querySelectorAll(".nav nav a").forEach((link) => {
  link.addEventListener("click", () => {
    if (navToggle) {
      navToggle.checked = false;
    }
  });
});

/* ---------- BACK TO TOP + SCROLL INDICATOR ---------- */
const toTop = document.getElementById("to-top");
const scrollDown = document.querySelector(".scroll-down");

window.addEventListener("scroll", () => {
  const scrollPosition = window.scrollY;
  toTop?.classList.toggle("show", scrollPosition > 400);
  scrollDown?.classList.toggle("hide", scrollPosition > 80);
});

toTop?.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

/* ---------- PROJECT CARD GLOW ---------- */
document.querySelectorAll(".card.project").forEach((card) => {
  card.addEventListener("mousemove", (event) => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--x", `${event.clientX - rect.left}px`);
    card.style.setProperty("--y", `${event.clientY - rect.top}px`);
  });
});

/* ---------- CUSTOM CURSOR ---------- */
if (window.matchMedia("(pointer: fine)").matches) {
  document.body.classList.add("cursor-enabled");

  const dot = document.createElement("div");
  dot.className = "cursor-dot";

  const ring = document.createElement("div");
  ring.className = "cursor-ring";

  // Keep the custom cursor visible above the popup.
  dot.style.zIndex = "10001";
  ring.style.zIndex = "10001";

  document.body.append(dot, ring);

  let mouseX = 0;
  let mouseY = 0;
  let ringX = 0;
  let ringY = 0;

  window.addEventListener("mousemove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
    dot.style.left = `${mouseX}px`;
    dot.style.top = `${mouseY}px`;
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    ring.style.left = `${ringX}px`;
    ring.style.top = `${ringY}px`;
    requestAnimationFrame(animateRing);
  }

  animateRing();

  // Event delegation also supports links created inside the popup.
  const interactiveSelector = "a, button, label, input, .card.project";

  document.addEventListener("mouseover", (event) => {
    if (
      event.target instanceof Element &&
      event.target.closest(interactiveSelector)
    ) {
      ring.classList.add("hovered");
    }
  });

  document.addEventListener("mouseout", (event) => {
    if (!(event.target instanceof Element)) return;
    if (!event.target.closest(interactiveSelector)) return;

    const nextTarget =
      event.relatedTarget instanceof Element
        ? event.relatedTarget.closest(interactiveSelector)
        : null;

    if (!nextTarget) {
      ring.classList.remove("hovered");
    }
  });
}

/* ---------- TYPING ANIMATION ---------- */
const phrases = [
  "Python Developer.",
  "Backend Learner.",
  "Automation Enthusiast.",
  "Future Problem Solver."
];

const typedEl = document.getElementById("typed-text");

if (typedEl) {
  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function type() {
    const current = phrases[phraseIndex];

    if (!deleting) {
      typedEl.textContent = current.slice(0, charIndex + 1);
      charIndex++;

      if (charIndex === current.length) {
        deleting = true;
        setTimeout(type, 1400);
        return;
      }
    } else {
      typedEl.textContent = current.slice(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }
    }

    setTimeout(type, deleting ? 40 : 80);
  }

  type();
}

/* ---------- PROJECT DETAILS DATA ---------- */
const projectDetails = {
  "grade-calculator": {
    kicker: "PROJECT 01 // LIVE",
    title: "Grade Calculator",
    description:
      "A Python command-line program that takes marks for three subjects, calculates the average, and assigns a grade from A+ to F.",
    features: [
      "Takes the student's name and three subject names.",
      "Accepts marks for each subject.",
      "Calculates the average marks.",
      "Assigns a grade using conditional statements."
    ],
    learning: [
      "Getting user input with input().",
      "Converting input with int().",
      "Variables and arithmetic operations.",
      "Using if, elif, and else.",
      "Comparing values with operators."
    ],
    sample:
      "Enter your name: Porbo\n" +
      "enter subject 1 name: Math\n" +
      "Math marks: 85\n" +
      "enter subject 2 name: English\n" +
      "English marks: 78\n" +
      "enter subject 3 name: Science\n" +
      "Science marks: 91\n" +
      "total average: 84.66666666666667\n" +
      "your grade is A+",
    sourceUrl:
      "https://github.com/miporbo/python-projects/tree/main/Grade-Calculator",
    sourceLabel: "View source code"
  },

  "quiz-game": {
    kicker: "PROJECT 02 // LIVE",
    title: "Quiz Game",
    description:
      "A Python terminal quiz that asks five questions, checks answers, tracks the score, and lets the player play again.",
    features: [
      "Displays five quiz questions.",
      "Checks the player's answers, ignoring capital letters and extra spaces.",
      "Keeps track of the score.",
      "Shows a message based on the final score.",
      "Allows the player to play again."
    ],
    learning: [
      "Storing questions in a list of dictionaries.",
      "Using for and while loops.",
      "Checking answers with if and else.",
      "Tracking score with variables.",
      "Using functions to organize code."
    ],
    sample:
      "Welcome to the quiz! Please answer the following questions:\n" +
      "What is the capital of Bangladesh? dhaka\n" +
      "Correct!\n" +
      "Which language are we learning? Java\n" +
      "Incorrect! The correct answer is: Python\n" +
      "What is 5 + 3? 8\n" +
      "Correct!\n" +
      "Which is the largest planet? Jupiter\n" +
      "Correct!\n" +
      "How many days are in a week? 7\n" +
      "Correct!\n" +
      "Your final score is: 4/5\n" +
      "Good job! You got more than half of the answers correct!\n" +
      "Do you want to play again? (yes/no) no\n" +
      "Goodbye!",
    sourceUrl:
      "https://github.com/miporbo/python-projects/tree/main/Quiz%20Game",
    sourceLabel: "View source code"
  },

  "todo-app": {
    kicker: "PROJECT 03 // LIVE",
    title: "To-Do App",
    description:
      "A Python command-line task manager with a menu for adding, viewing, and deleting tasks. Tasks are saved to a text file, so they are still there the next time the program runs.",
    features: [
      "Menu-based interface: add, view, delete, or exit.",
      "Shows tasks with numbers (1, 2, 3...).",
      "Deletes a task by its number.",
      "Handles invalid input without crashing.",
      "Saves tasks to a text file and loads them on start."
    ],
    learning: [
      "Storing tasks in a list.",
      "Organizing code with functions.",
      "Using a while loop to keep a menu running.",
      "Handling errors with try and except.",
      "Reading and writing text files."
    ],
    sample:
      "To-Do List Application\n" +
      "1. Add Task\n" +
      "2. View Tasks\n" +
      "3. Delete Task\n" +
      "4. Exit\n" +
      "Enter your choice (1-4): 1\n" +
      "Enter a new task: Buy milk\n" +
      "Task added successfully!\n" +
      "\n" +
      "Enter your choice (1-4): 2\n" +
      "Your tasks:\n" +
      "1. Buy milk\n" +
      "\n" +
      "Enter your choice (1-4): 4\n" +
      "Tasks saved to tasks.txt\n" +
      "Exiting the application. Goodbye!",
    sourceUrl:
      "https://github.com/miporbo/python-projects/tree/main/TO%20DO%20APP",
    sourceLabel: "View source code"
  },

  "number-guessing-game": {
    kicker: "PROJECT 04 // LIVE",
    title: "Number Guessing Game",
    description:
      "A Python terminal game where the computer picks a secret number between 1 and 100 and the player guesses it with higher or lower hints.",
    features: [
      "Picks a random secret number from 1 to 100.",
      "Gives a hint (too low or too high) after every guess.",
      "Counts how many attempts the player used.",
      "Handles invalid input without counting it as a guess.",
      "Lets the player play again."
    ],
    learning: [
      "Using the random module.",
      "Repeating with a while loop, with break and continue.",
      "Handling errors with try and except.",
      "Putting the game inside a function.",
      "Keeping game values inside the function so every round starts fresh."
    ],
    sample:
      "I'm thinking of a number between 1 and 100.\n" +
      "Your guess: 50\n" +
      "Too low! Try again.\n" +
      "Your guess: abc\n" +
      "Please enter a whole number.\n" +
      "Your guess: 75\n" +
      "Too high! Try again.\n" +
      "Your guess: 62\n" +
      "Correct! You guessed it in 3 attempts.\n" +
      "Do you want to play again? (yes/no): no\n" +
      "Thanks for playing!",
    sourceUrl:
      "https://github.com/miporbo/python-projects/tree/main/Number-Guessing-Game",
    sourceLabel: "View source code"
  },

  "password-generator": {
    kicker: "PROJECT 05 // LIVE",
    title: "Password Generator",
    description:
      "A Python command-line program that generates a random password of the length you choose, mixing letters, digits, and symbols.",
    features: [
      "Asks for the password length.",
      "Mixes lowercase letters, uppercase letters, digits, and symbols.",
      "Asks again if the input is text, zero, or negative.",
      "Generates the password inside a separate function."
    ],
    learning: [
      "Using the random and string modules.",
      "Building text step by step with a for loop.",
      "Checking input with try, except, and a while loop.",
      "Writing a function with a parameter and a return value."
    ],
    sample:
      "Enter the length of the password: abc\n" +
      "Please enter a valid integer.\n" +
      "Enter the length of the password: 0\n" +
      "Please enter a positive integer.\n" +
      "Enter the length of the password: 12\n" +
      "Your password: k9#Tq2!mPz@L",
    sourceUrl:
      "https://github.com/miporbo/python-projects/tree/main/Password-Generator",
    sourceLabel: "View source code"
  }
};

/* ---------- PROJECT DETAILS POPUP ---------- */
const projectModal = document.getElementById("project-modal");
const modalPanel = projectModal?.querySelector(".project-modal-panel");
const modalCloseBtn = document.getElementById("project-modal-close");
const modalKicker = document.getElementById("project-modal-kicker");
const modalTitle = document.getElementById("project-modal-title");
const modalDescription = document.getElementById("project-modal-description");
const modalFeatures = document.getElementById("project-modal-features");
const modalLearning = document.getElementById("project-modal-learning");
const modalSample = document.getElementById("project-modal-sample");
const modalLinks = document.getElementById("project-modal-links");

let lastFocusedElement = null;

/* Fill a list with project details */
function fillModalList(listElement, items) {
  if (!listElement) return;

  listElement.replaceChildren();

  items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    listElement.appendChild(li);
  });
}

/* Open the popup */
function openProjectModal(projectId, triggerElement) {
  if (
    !projectModal ||
    !modalPanel ||
    !modalTitle ||
    !modalDescription ||
    !modalFeatures ||
    !modalLearning ||
    !modalSample ||
    !modalLinks
  ) {
    return;
  }

  const project = projectDetails[projectId];
  if (!project) return;

  lastFocusedElement = triggerElement || document.activeElement;

  if (modalKicker) {
    modalKicker.textContent = project.kicker;
  }

  modalTitle.textContent = project.title;
  modalDescription.textContent = project.description;
  modalSample.textContent = project.sample;

  fillModalList(modalFeatures, project.features);
  fillModalList(modalLearning, project.learning);

  // Create the source link safely.
  modalLinks.replaceChildren();

  const sourceLink = document.createElement("a");
  sourceLink.href = project.sourceUrl;
  sourceLink.target = "_blank";
  sourceLink.rel = "noopener noreferrer";
  sourceLink.className = "btn btn-ghost";
  sourceLink.textContent = project.sourceLabel;
  modalLinks.appendChild(sourceLink);

  projectModal.classList.add("is-open");
  projectModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");

  modalCloseBtn?.focus();
}

/* Close the popup */
function closeProjectModal() {
  if (!projectModal || !projectModal.classList.contains("is-open")) {
    return;
  }

  projectModal.classList.remove("is-open");
  projectModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");

  if (
    lastFocusedElement instanceof HTMLElement &&
    lastFocusedElement.isConnected
  ) {
    lastFocusedElement.focus();
  }

  lastFocusedElement = null;
}

/* Connect each project button to its details */
document.querySelectorAll(".project-details-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const projectId = button.dataset.project;

    if (projectId) {
      openProjectModal(projectId, button);
    }
  });
});

/* Close when clicking the close button or backdrop */
modalCloseBtn?.addEventListener("click", closeProjectModal);

projectModal?.addEventListener("click", (event) => {
  if (
    event.target instanceof Element &&
    event.target.closest("[data-modal-close]")
  ) {
    closeProjectModal();
  }
});

/* Escape key + keyboard focus management */
document.addEventListener("keydown", (event) => {
  if (!projectModal?.classList.contains("is-open")) return;

  if (event.key === "Escape") {
    closeProjectModal();
    return;
  }

  if (event.key !== "Tab" || !modalPanel) return;

  const focusableElements = Array.from(
    modalPanel.querySelectorAll(
      'button:not([disabled]), a[href], input:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )
  ).filter((element) => element.getClientRects().length > 0);

  if (focusableElements.length === 0) {
    event.preventDefault();
    modalPanel.focus();
    return;
  }

  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  if (event.shiftKey && document.activeElement === firstElement) {
    event.preventDefault();
    lastElement.focus();
  } else if (
    !event.shiftKey &&
    document.activeElement === lastElement
  ) {
    event.preventDefault();
    firstElement.focus();
  }
});

/* ---------- PROJECT CAROUSEL ---------- */
const carouselTrack = document.getElementById("carousel-track");
const carouselPrev = document.getElementById("carousel-prev");
const carouselNext = document.getElementById("carousel-next");
const carouselCount = document.getElementById("carousel-count");

if (carouselTrack && carouselPrev && carouselNext) {
  const slides = Array.from(carouselTrack.children);
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  // Distance from one card to the next (card width + gap).
  function slideStep() {
    if (slides.length < 2) return carouselTrack.clientWidth;
    return slides[1].offsetLeft - slides[0].offsetLeft;
  }

  function updateCarousel() {
    const step = slideStep();
    const maxScroll = carouselTrack.scrollWidth - carouselTrack.clientWidth;
    const first = Math.round(carouselTrack.scrollLeft / step);
    const visible = Math.max(1, Math.round(carouselTrack.clientWidth / step));
    const last = Math.min(first + visible, slides.length);

    carouselPrev.disabled = carouselTrack.scrollLeft <= 2;
    carouselNext.disabled = carouselTrack.scrollLeft >= maxScroll - 2;

    if (carouselCount) {
      carouselCount.textContent = `${first + 1}-${last} / ${slides.length}`;
    }
  }

  function moveCarousel(direction) {
    carouselTrack.scrollBy({
      left: direction * slideStep(),
      behavior: reduceMotion.matches ? "auto" : "smooth"
    });
  }

  carouselPrev.addEventListener("click", () => moveCarousel(-1));
  carouselNext.addEventListener("click", () => moveCarousel(1));

  carouselTrack.addEventListener(
    "scroll",
    () => requestAnimationFrame(updateCarousel),
    { passive: true }
  );

  window.addEventListener("resize", updateCarousel);
  updateCarousel();
}

/* ---------- SCROLL REVEAL ANIMATION ---------- */
const revealElements = document.querySelectorAll(".reveal");

if (!("IntersectionObserver" in window)) {
  revealElements.forEach((element) => {
    element.classList.add("visible");
  });
} else {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        } else {
          entry.target.classList.remove("visible");
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -30px 0px"
    }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
}
