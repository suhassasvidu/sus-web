/* ---------- mobile menu ---------- */
let menu = document.querySelector('#menu-btn');
let navbar = document.querySelector('.header .navbar');

function closeMenu(){
    menu.classList.remove('fa-times');
    menu.classList.add('fa-bars');
    menu.setAttribute('aria-expanded', 'false');
    navbar.classList.remove('active');
}

menu.onclick = () =>{
    let open = navbar.classList.toggle('active');
    menu.classList.toggle('fa-times', open);
    menu.classList.toggle('fa-bars', !open);
    menu.setAttribute('aria-expanded', open ? 'true' : 'false');
}

navbar.querySelectorAll('a').forEach(link =>{
    link.addEventListener('click', closeMenu);
});

window.onscroll = () =>{
    closeMenu();
}

/* ---------- highlight the current section in the navbar ---------- */
let navLinks = document.querySelectorAll('.header .navbar a');
let sections = document.querySelectorAll('section[id]');

if('IntersectionObserver' in window){
    let observer = new IntersectionObserver(entries =>{
        entries.forEach(entry =>{
            if(entry.isIntersecting){
                navLinks.forEach(link =>{
                    link.classList.toggle('current', link.getAttribute('href') === '#' + entry.target.id);
                });
            }
        });
    }, { rootMargin: '-45% 0px -50% 0px' });

    sections.forEach(section => observer.observe(section));
}

/* ---------- shorts / tutorials toggle ---------- */
let shortsTab = document.querySelector('.format-toggler .shorts');
let tutorialsTab = document.querySelector('.format-toggler .tutorials');
let shortsPanel = document.querySelector('.formats .shorts-panel');
let tutorialsPanel = document.querySelector('.formats .tutorials-panel');

function showFormat(showShorts){
    shortsTab.classList.toggle('active', showShorts);
    tutorialsTab.classList.toggle('active', !showShorts);
    shortsTab.setAttribute('aria-selected', showShorts);
    tutorialsTab.setAttribute('aria-selected', !showShorts);
    shortsPanel.classList.toggle('active', showShorts);
    tutorialsPanel.classList.toggle('active', !showShorts);
}

shortsTab.onclick = () => showFormat(true);
tutorialsTab.onclick = () => showFormat(false);

[shortsTab, tutorialsTab].forEach(tab =>{
    tab.addEventListener('keydown', e =>{
        if(e.key === 'Enter' || e.key === ' '){
            e.preventDefault();
            tab.click();
        }
    });
});

/* ---------- topics slider ---------- */
let slides = document.querySelectorAll('.reviews .slide-container .slide');
let index = 0;
let timer;

function show(i){
    slides[index].classList.remove('active');
    index = (i + slides.length) % slides.length;
    slides[index].classList.add('active');
}

function next(){
    show(index + 1);
    restartTimer();
}

function prev(){
    show(index - 1);
    restartTimer();
}

function restartTimer(){
    clearInterval(timer);
    if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
        timer = setInterval(() => show(index + 1), 7000);
    }
}

restartTimer();

/* ---------- faq accordion ---------- */
document.querySelectorAll('.faq .accordion-container .accordion').forEach(accordion =>{
    let heading = accordion.querySelector('.accordion-heading');
    heading.onclick = () =>{
        let open = accordion.classList.toggle('active');
        heading.setAttribute('aria-expanded', open);
    }
});

/* ---------- back to top button ---------- */
let toTop = document.querySelector('.to-top');

function toggleToTop(){
    toTop.classList.toggle('show', window.scrollY > 400);
}

toTop.addEventListener('click', () =>{
    let reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
});

window.addEventListener('scroll', toggleToTop, { passive: true });
toggleToTop();
