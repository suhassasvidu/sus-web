/* Scroll + typing effects (shared by index.html and videos.html) */
(function(){
    let reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let canObserve = 'IntersectionObserver' in window;

    /* ---------- hero typing line (cycles through phrases) ---------- */
    let typed = document.querySelector('.typed');

    if(typed && !reduce){
        let phrases = ['HTML.', 'CSS.', 'JavaScript.', 'responsive design.', 'real projects.'];
        let p = 0, c = 0, deleting = false;

        function tick(){
            let word = phrases[p];
            typed.textContent = word.slice(0, c);
            let delay = deleting ? 40 : 90;

            if(!deleting && c === word.length){
                delay = 1500;
                deleting = true;
            }else if(deleting && c === 0){
                deleting = false;
                p = (p + 1) % phrases.length;
                delay = 350;
            }else{
                c += deleting ? -1 : 1;
            }
            setTimeout(tick, delay);
        }

        typed.textContent = '';
        setTimeout(tick, 700);
    }

    if(reduce || !canObserve) return;

    /* ---------- section headings type in when scrolled into view ---------- */
    function splitChars(el, start){
        let text = el.textContent.trim().replace(/\s+/g, ' ');
        let i = start;
        el.setAttribute('aria-label', text);
        el.textContent = '';

        text.split(' ').forEach((word, wi, all) =>{
            let w = document.createElement('span');
            w.className = 'word';
            w.setAttribute('aria-hidden', 'true');
            [...word].forEach(ch =>{
                let s = document.createElement('span');
                s.className = 'ch';
                s.textContent = ch;
                s.style.setProperty('--i', i++);
                w.appendChild(s);
            });
            el.appendChild(w);
            if(wi < all.length - 1){
                el.appendChild(document.createTextNode(' '));
                i++;
            }
        });
        return i;
    }

    let headingObserver = new IntersectionObserver(entries =>{
        entries.forEach(entry =>{
            if(entry.isIntersecting){
                entry.target.classList.add('typing-go');
                headingObserver.unobserve(entry.target);
            }
        });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.15 });

    document.querySelectorAll('.heading').forEach(heading =>{
        let label = heading.querySelector(':scope > span');
        let title = heading.querySelector(':scope > h1');
        let next = 0;
        if(label) next = splitChars(label, 0) + 6;
        if(title) splitChars(title, next);
        heading.classList.add('typing-ready');
        headingObserver.observe(heading);
    });

    /* ---------- fade-up reveal for cards and blocks ---------- */
    let targets = document.querySelectorAll([
        '.services .box-container .box',
        '.steps .box-container .box',
        '.features .box-container .box',
        '.about .image', '.about .content',
        '.format-toggler', '.formats .code-cta',
        '.faq .accordion',
        '.newsletter .content',
        '.footer .box-container .box',
        '.toolbar', '.page-hero .heading p',
        '.code-card'
    ].join(','));

    let revealObserver = new IntersectionObserver(entries =>{
        entries.forEach(entry =>{
            if(entry.isIntersecting){
                entry.target.classList.add('in');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    targets.forEach(el =>{
        let pos = [...el.parentElement.children].indexOf(el);
        el.style.setProperty('--rd', (pos % 4) * 90 + 'ms');
        el.classList.add('reveal');
        revealObserver.observe(el);
    });
})();
