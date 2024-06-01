const categoryParagraph = document.getElementById('category');
const imagesContainer = document.getElementById('images');
const resultParagraph = document.getElementById('result');

const LVL1CATEGORIES = ['koty', 'psy', 'ptaki'];
const LVL2CATEGORIES = ['aaa'];
const LVL3CATEGORIES = ['bbb'];

let IMG_CATEGORIES = [];
let CURRENT_CATEGORY;
let NO_OF_CORRECT;

document.addEventListener('DOMContentLoaded', () => {
  addImageClickEvent();
  generateCaptcha(1);
});

function generateCaptcha(level) {
  resetCaptchaState();
  const categoryArray = getCategoryArrayByLevel(level);
  CURRENT_CATEGORY = getRandomElement(categoryArray);
  categoryParagraph.innerText = `Select all images with ${CURRENT_CATEGORY}`;

  NO_OF_CORRECT = getRandomInt(3, 5);
  fillCategoriesArray(categoryArray, CURRENT_CATEGORY);
  IMG_CATEGORIES = shuffleArray(IMG_CATEGORIES);

  IMG_CATEGORIES.forEach(category => {
    const img = createImageElement(level, category);
    imagesContainer.appendChild(img);
  });
}

function verifyCaptcha() {
  const selectedImages = document.querySelectorAll('.images img.selected');
  const correctSelection = Array.from(selectedImages).every(img => img.dataset.type === CURRENT_CATEGORY);

  if (correctSelection && selectedImages.length === NO_OF_CORRECT) {
    resultParagraph.innerText = 'CAPTCHA passed!';
  } else {
    resultParagraph.innerText = 'CAPTCHA failed. Try again.';
  }
}

function addImageClickEvent() {
  imagesContainer.addEventListener('click', event => {
    if (event.target.tagName === 'IMG') {
      event.target.classList.toggle('selected');
    }
  });
}

function getCategoryArrayByLevel(level) {
  switch (level) {
    case 1: return LVL1CATEGORIES;
    case 2: return LVL2CATEGORIES;
    case 3: return LVL3CATEGORIES;
    default: return LVL1CATEGORIES;
  }
}

function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function fillCategoriesArray(categoryArray, correctCategory) {
  for (let i = 0; i < NO_OF_CORRECT; i++) {
    IMG_CATEGORIES.push(correctCategory);
  }
  while (IMG_CATEGORIES.length < 9) {
    const incorrectCategory = getRandomElement(categoryArray);
    if (incorrectCategory !== correctCategory) {
      IMG_CATEGORIES.push(incorrectCategory);
    }
  }
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function createImageElement(level, category) {
  const img = document.createElement('img');
  const randomIdx = getRandomInt(0, 0);
  img.src = `assets/level${level}/${category}/${randomIdx}.png`;
  img.dataset.type = category;
  return img;
}

function resetCaptchaState() {
  imagesContainer.innerHTML = '';
  IMG_CATEGORIES = [];
  resultParagraph.innerText = '';
}
