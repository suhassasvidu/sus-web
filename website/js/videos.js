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

navbar.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
window.onscroll = closeMenu;

/* ---------- filter + search ---------- */
let cards = document.querySelectorAll('.code-card');
let filters = document.querySelectorAll('.filter');
let searchBox = document.querySelector('#search');
let empty = document.querySelector('#empty');
let activeFilter = 'all';

function applyFilters(){
    let query = searchBox.value.trim().toLowerCase();
    let visible = 0;

    cards.forEach(card =>{
        let cats = card.dataset.cat.split(' ');
        let matchCat = activeFilter === 'all' || cats.includes(activeFilter);
        let matchText = card.dataset.title.includes(query);
        let show = matchCat && matchText;
        card.hidden = !show;
        if(show) visible++;
    });

    empty.hidden = visible !== 0;
}

filters.forEach(button =>{
    button.onclick = () =>{
        filters.forEach(b => b.classList.remove('active'));
        button.classList.add('active');
        activeFilter = button.dataset.filter;
        applyFilters();
    }
});

searchBox.addEventListener('input', applyFilters);

/* ---------- copy buttons ---------- */
function fallbackCopy(text){
    let area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.opacity = '0';
    document.body.appendChild(area);
    area.select();
    let ok = false;
    try { ok = document.execCommand('copy'); } catch(e) {}
    document.body.removeChild(area);
    return ok;
}

async function copyText(text){
    if(navigator.clipboard && window.isSecureContext){
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch(e) {}
    }
    return fallbackCopy(text);
}

document.querySelectorAll('.copy-btn').forEach(button =>{
    let label = button.querySelector('span');
    let icon = button.querySelector('i');

    button.onclick = async () =>{
        let code = button.closest('.code-window').querySelector('code').textContent;
        let ok = await copyText(code);
        label.textContent = ok ? 'Copied!' : 'Press Ctrl+C';
        button.classList.toggle('done', ok);
        icon.className = ok ? 'fas fa-check' : 'far fa-copy';
        setTimeout(() =>{
            label.textContent = 'Copy';
            button.classList.remove('done');
            icon.className = 'far fa-copy';
        }, 2000);
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
