'use strict';

///////////////////////////////////////
// Modal window

//----- Open Close Register Form  ----- //

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};
const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(mov => {
  mov.addEventListener('click', openModal);
});

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//----- Open Close Register Form  ----- //

//----- Sticky Nav Bar  ----- //
const header = document.querySelector('.header');
const nav = document.querySelector('.nav');
const navHeight = nav.getBoundingClientRect().height;

const headerFunction = function (entries, obsever) {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};

const headerObserver = new IntersectionObserver(headerFunction, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);
//----- Sticky Nav Bar  ----- //

//----- Click on Nav -----//
const navLinks = document.querySelector('.nav__links');
const navLinksChildren = Array.from(navLinks.querySelectorAll('.nav__link'));

const navLinksMouse = function (opacity) {
  navLinksChildren.forEach(mov => (mov.style.opacity = Number(opacity)));
};

navLinks.addEventListener('mouseover', function (e) {
  if (e.target.classList.contains('nav__link')) {
    navLinksMouse(0.7); // Hide button others
    e.target.style.opacity = 1;
  } else {
    navLinksMouse(1); // When mouse move out , opacity = 1
  }
});
//----- Click on Nav -----//

//----- Move to section by button ----- //

navLinks.addEventListener('click', function (e) {
  e.preventDefault();

  if (e.target.classList.contains('btn--show-modal')) return; // Skip if it's button

  if (e.target.classList.contains('nav__link')) {
    const position = e.target.getAttribute('href');
    document.querySelector(position).scrollIntoView({ behavior: 'smooth' });
  }
});

//----- Move to section by button ----- //

//----- Loading Image -----//
const imgs = document.querySelectorAll(`img[data-src]`);

const imgObserverFunction = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', () =>
    entry.target.classList.remove('lazy-img')
  );

  imgObserver.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(imgObserverFunction, {
  root: null,
  threshold: 0,
  rootMargin: '+200px',
});

imgs.forEach(mov => imgObserver.observe(mov));
//----- Loading Image -----//

//---- Operation animation ----//
const operationsContainer = document.querySelector(
  '.operations__tab-container'
);
const operationTab = document.querySelectorAll('.operations__tab');
const operationContent = document.querySelectorAll('.operations__content');

operationsContainer.addEventListener('click', function (e) {
  const target = e.target.closest('.operations__tab');
  if (target) {
    const id = target.dataset.tab;

    operationTab.forEach(mov =>
      mov.classList.remove('operations__tab--active')
    ); // Remove a active tab
    target.classList.add('operations__tab--active'); // Add active to tab is clicked

    operationContent.forEach(mov =>
      mov.classList.remove('operations__content--active')
    );
    document
      .querySelector(`.operations__content--${id}`)
      .classList.add('operations__content--active');
  }
});
//---- Operation animation ----//

//---- Image Slide ----//
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const slides = document.querySelectorAll('.slide');
let slideCur = 0;

const slidePosition = function (index) {
  index == 'next' ? slideCur-- : slideCur++;
  console.log(slideCur);
  slides.forEach((mov, i) => {
    // mov.style.transform = `translateX(${})`
  });
};

btnLeft.addEventListener('click', function () {
  slidePosition('previous');
});
btnRight.addEventListener('click', function () {
  slidePosition('next');
});

const sections = document.querySelectorAll('.section');

const sectionObserver = new IntersectionObserver(
  function (entries, observe) {
    const [entry] = entries;

    if (entry.isIntersecting) {
      entry.target.classList.remove('section--hidden');
      sectionObserver.unobserve(entry.target);
    }
  },
  {
    root: null,
    threshold: 0,
  }
);

sections.forEach(mov => {
  sectionObserver.observe(mov);
});
