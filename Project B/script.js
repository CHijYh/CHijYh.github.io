document.addEventListener('DOMContentLoaded', function() {

    const btn = document.getElementById('toggleMenuMobile');
    const menu = document.getElementById('mobileMenu');

    if (btn && menu) {
        btn.addEventListener('click', function() {
            this.classList.toggle('open');
            menu.classList.toggle('active');
        });
    }

    const toggles = document.querySelectorAll('.submenu-toggle');
    toggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            const parent = this.parentElement;
            parent.classList.toggle('open');
        });
    });
});


class ReviewsSlider {
    constructor() {
        this.currentSlide = 0;
        this.slides = [
            {
                title: "Команда Drupal Coder вызвала только положительные впечатления!",
                author: "Нуреев Александр, менеджер проекта Winamp Russian Community",
                avatar: "images/avatar.png"
            },
            {
                title: "Что-то",
                author: "Кто-то",
                avatar: "images/avatar.png"
            },
            {
                title: "Что-то",
                author: "Что-то",
                avatar: "images/avatar.png"
            },
            {
                title: "Что-то",
                author: "lorem",
                avatar: "images/avatar.png"
            },
            {
                title: "Что-то",
                author: "lorem",
                avatar: "images/avatar.png"
            },
            {
                title: "lorem",
                author: "lorem",
                avatar: "images/avatar.png"
            },
            {
                title: "lorem",
                author: "lorem",
                avatar: "images/avatar.png"
            },
            {
                title: "lorem",
                author: "lorem",
                avatar: "images/avatar.png"
            },
            {
                title: "lorem",
                author: "lorem",
                avatar: "images/avatar.png"
            },
            {
                title: "lorem",
                author: "lorem",
                avatar: "images/avatar.png"
            },
            {
                title: "lorem",
                author: "lorem",
                avatar: "images/avatar.png"
            },
            {
                title: "Что-то",
                author: "Кто-то",
                avatar: "images/avatar.png"
            },
            {
                title: "Что-то",
                author: "Кто-то",
                avatar: "images/avatar.png"
            },
            {
                title: "Что-то",
                author: "Кто-то",
                avatar: "images/avatar.png"
            }
        ];
        
        this.init();
    }
    
    init() {
        const prevBtns = document.querySelectorAll('.review-card__arrow--prev');
        const nextBtns = document.querySelectorAll('.review-card__arrow--next');
        
        if (prevBtns.length > 0 && nextBtns.length > 0) {
            prevBtns.forEach(btn => {
                btn.addEventListener('click', () => this.prevSlide());
            });
            
            nextBtns.forEach(btn => {
                btn.addEventListener('click', () => this.nextSlide());
            });
        }
        
        this.updateSlide();
    }
    
    prevSlide() {
        this.currentSlide = this.currentSlide === 0 
            ? this.slides.length - 1 
            : this.currentSlide - 1;
        this.updateSlide();
    }
    
    nextSlide() {
        this.currentSlide = this.currentSlide === this.slides.length - 1 
            ? 0 
            : this.currentSlide + 1;
        this.updateSlide();
    }
    
    updateSlide() {
        const slide = this.slides[this.currentSlide];
        const card = document.querySelector('.review-card');
        
        if (card) {
            const title = card.querySelector('.review-card__title');
            const author = card.querySelector('.review-card__author');
            const counter = card.querySelectorAll('.review-card__counter');
            const avatar = card.querySelector('.review-card__avatar img');
            
            if (title) title.textContent = slide.title;
            if (author) author.textContent = slide.author;
            if (avatar) avatar.src = slide.avatar;
            
            if (counter.length > 0) {
                counter.forEach(c => {
                    c.textContent = `${String(this.currentSlide + 1).padStart(2, '0')} / ${String(this.slides.length).padStart(2, '0')}`;
                });
            }
        }
    }
}

const form = document.getElementById('supportForm');
const responseMessage = document.getElementById('formResponse');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(form);
    const submitBtn = document.getElementById('submitBtn');

    if (submitBtn) {
        submitBtn.innerText = 'ОТПРАВКА...';
        submitBtn.disabled = true;
    }

    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
    })
    .then(async (response) => {
        let json = await response.json();
        if (response.status == 200) {
            if (responseMessage) {
                responseMessage.innerHTML = '<p style="color: #28a745;">Спасибо! Заявка успешно отправлена.</p>';
            } else {
                alert('Спасибо! Заявка успешно отправлена.');
            }
            form.reset();
        } else {
            console.log(response);
            if (responseMessage) {
                responseMessage.innerHTML = `<p style="color: #dc3545;">Ошибка: ${json.message}</p>`;
            }
        }
    })
    .catch(error => {
        console.log(error);
        if (responseMessage) {
            responseMessage.innerHTML = '<p style="color: #dc3545;">Что-то пошло не так. Попробуйте позже.</p>';
        }
    })
    .finally(() => {
        if (submitBtn) {
            submitBtn.innerText = 'Оставить заявку!';
            submitBtn.disabled = false;
        }
    });
});

const showMoreBtn = document.querySelector('.btn--outline-dark');
if (showMoreBtn && showMoreBtn.textContent.includes('Показать ещё')) {
    showMoreBtn.addEventListener('click', function() {
        this.textContent = 'Загрузка...';
        this.disabled = true;
        
        setTimeout(() => {
            this.textContent = 'Все кейсы загружены';
            this.classList.remove('btn--outline-dark');
            this.classList.add('btn--outline');
            this.disabled = true;
            this.style.opacity = '0.7';
        }, 1500);
    });
}



document.addEventListener('DOMContentLoaded', () => {
    const langToggle = document.getElementById('lang-toggle');
    const langList = document.getElementById('lang-list');
    const currentLangText = langToggle.querySelector('.current-lang');

    langToggle.addEventListener('click', (e) => {
        e.stopPropagation(); 
        const isVisible = langList.style.display === 'block';
        langList.style.display = isVisible ? 'none' : 'block';
        langToggle.classList.toggle('active');
    });


    langList.querySelectorAll('li').forEach(item => {
        item.addEventListener('click', () => {
            const newLang = item.getAttribute('data-value');
            currentLangText.textContent = newLang; 
            
            langList.style.display = 'none'; 
            console.log(`Язык изменен на: ${newLang}`); 
            
            
        });
    });

    document.addEventListener('click', () => {
        langList.style.display = 'none';
        langToggle.classList.remove('active');
    });
});
