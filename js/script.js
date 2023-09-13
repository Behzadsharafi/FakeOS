const taskbarBtn = document.querySelector(".taskbar__btn");
const menu = document.querySelector(".menu");

taskbarBtn.addEventListener("click", () => {
  menu.classList.toggle("hide");
});

document.addEventListener("click", (event) => {
  if (
    event.target.classList.contains("main") ||
    event.target.classList.contains("taskbar") ||
    event.target.classList.contains("dateAndTime") ||
    event.target.classList.contains("dateAndTime__icon") ||
    event.target.classList.contains("dateAndTime__time")
  ) {
    menu.classList.add("hide");
    icons.forEach((icon) => {
      icon.classList.remove("clicked");
    });
  }
});

const gmailIcon = document.querySelector("#gmailIcon");
const gmailApp = document.querySelector(".gmailApp");
const closeGmail = document.querySelector("#closeGmail");
const notepadIcon = document.querySelector("#notepadIcon");
const notepadApp = document.querySelector(".notepadApp");
const closeNotepad = document.querySelector("#closeNotepad");
const photosIcon = document.querySelector("#photosIcon");
const photosApp = document.querySelector(".photosApp");
const closePhotos = document.querySelector("#closePhotos");
const imageTitle = document.querySelector(".imageTitle");

const nextPhoto = document.querySelector(".photosApp__body__next");
const imageContainer = document.querySelector("#imageContainer");

gmailIcon.addEventListener("dblclick", () => {
  gmailApp.classList.remove("hide");
  gmailIcon.classList.remove("clicked");
  gmailApp.style.zIndex = 5;
  notepadApp.style.zIndex = 0;
  photosApp.style.zIndex = 0;
});
closeGmail.addEventListener("click", () => {
  gmailApp.classList.add("hide");
});
notepadIcon.addEventListener("dblclick", () => {
  notepadApp.classList.remove("hide");
  notepadIcon.classList.remove("clicked");
  notepadApp.style.zIndex = 5;
  gmailApp.style.zIndex = 0;
  photosApp.style.zIndex = 0;
});

closeNotepad.addEventListener("click", () => {
  notepadApp.classList.add("hide");
});
photosIcon.addEventListener("dblclick", () => {
  photosApp.classList.remove("hide");
  photosIcon.classList.remove("clicked");
  photosApp.style.zIndex = 5;
  gmailApp.style.zIndex = 0;
  notepadApp.style.zIndex = 0;
});

closePhotos.addEventListener("click", () => {
  photosApp.classList.add("hide");
});

let currentIndex = 0;
nextPhoto.addEventListener("click", () => {
  const imageTitles = ["Beach", "Epic Sunset", "Beautiful River"];
  const imageSources = [
    "../images/Nature1.jpg",
    "../images/Nature2.jpg",
    "../images/Nature3.jpg",
  ];
  currentIndex = (currentIndex + 1) % 3;
  imageContainer.src = imageSources[currentIndex];
  imageTitle.textContent = imageTitles[currentIndex];
});

const icons = document.querySelectorAll(".desktop__app");

icons.forEach((icon) => {
  icon.addEventListener("click", (e) => {
    icons.forEach((otherIcon) => {
      if (otherIcon !== e.target) {
        otherIcon.classList.remove("clicked");
      }
    });

    icon.classList.add("clicked");
  });
});

const elements = document.querySelectorAll(".overlap");

elements.forEach((element) => {
  element.addEventListener("mousedown", () => {
    elements.forEach((el) => {
      el.style.zIndex = 0;
    });
    element.style.zIndex = 10;
  });
});

const drag = (appElement, headerElement) => {
  let isDragging = false;
  let offsetX, offsetY;
  let parentRect;

  headerElement.addEventListener("mousedown", (e) => {
    isDragging = true;
    appElement.style.cursor = "grabbing";
    const rect = appElement.getBoundingClientRect();
    parentRect = appElement.parentElement.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    const newX = e.clientX - offsetX;
    const newY = e.clientY - offsetY;

    const maxX = parentRect.width - appElement.offsetWidth;
    const maxY = parentRect.height - appElement.offsetHeight;

    const clampedX = Math.min(Math.max(0, newX), maxX);
    const clampedY = Math.min(Math.max(0, newY), maxY);

    appElement.style.left = clampedX + "px";
    appElement.style.top = clampedY + "px";
  });

  document.addEventListener("mouseup", () => {
    if (isDragging) {
      isDragging = false;
      appElement.style.cursor = "grab";
    }
  });
};

const gmailHeader = gmailApp.querySelector(".gmailApp__header");
const notepadHeader = notepadApp.querySelector(".notepadApp__header");
const photosHeader = photosApp.querySelector(".photosApp__header");

drag(gmailApp, gmailHeader);
drag(notepadApp, notepadHeader);
drag(photosApp, photosHeader);

const updateClock = () => {
  const today = new Date();
  let hours = today.getHours();
  const minutes = today.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";

  if (hours > 12) {
    hours -= 12;
  }
  hours = String(hours).padStart(2, "0");
  const formattedTime =
    hours + ":" + String(minutes).padStart(2, "0") + " " + ampm;

  document.querySelector(".dateAndTime__time").innerHTML = formattedTime;
  setTimeout(updateClock, 1000);
};

updateClock();
