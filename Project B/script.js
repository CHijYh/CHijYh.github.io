document.addEventListener('DOMContentLoaded', function() {
    const btn = document.getElementById('toggleMenu');
    const menu = document.getElementById('mobileMenu');


    btn.addEventListener('click', function() {
        btn.classList.toggle('open');
        menu.classList.toggle('active');
    });


    const submenuToggle = menu.querySelector('.submenu-toggle');
    if (submenuToggle) {
        submenuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            const parentLi = this.parentElement;
            parentLi.classList.toggle('open');
        });
    }


    const navLinks = menu.querySelectorAll('.mobile-nav-list a:not(.submenu-toggle), .mobile-submenu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            btn.classList.remove('open');
            menu.classList.remove('active');
            document.querySelector('.has-submenu').classList.remove('open');
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
                avatar: "assets/images/review-avatar.png"
            },
            {
                title: "Что-то",
                author: "Кто-то",
                avatar: "assets/images/review-avatar.png"
            },
            {
                title: "Что-то",
                author: "Что-то",
                avatar: "assets/images/review-avatar.png"
            },
            {
                title: "Что-то",
                author: "lorem",
                avatar: "assets/images/review-avatar.png"
            },
            {
                title: "Что-то",
                author: "lorem",
                avatar: "assets/images/review-avatar.png"
            },
            {
                title: "lorem",
                author: "lorem",
                avatar: "assets/images/review-avatar.png"
            },
            {
                title: "lorem",
                author: "lorem",
                avatar: "assets/images/review-avatar.png"
            },
            {
                title: "lorem",
                author: "lorem",
                avatar: "assets/images/review-avatar.png"
            },
            {
                title: "lorem",
                author: "lorem",
                avatar: "assets/images/review-avatar.png"
            },
            {
                title: "lorem",
                author: "lorem",
                avatar: "assets/images/review-avatar.png"
            },
            {
                title: "lorem",
                author: "lorem",
                avatar: "assets/images/review-avatar.png"
            },
            {
                title: "Что-то",
                author: "Кто-то",
                avatar: "assets/images/review-avatar.png"
            },
            {
                title: "Что-то",
                author: "Кто-то",
                avatar: "assets/images/review-avatar.png"
            },
            {
                title: "Что-то",
                author: "Кто-то",
                avatar: "assets/images/review-avatar.png"
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

const contactForm = document.getElementById('contactForm');
const formMessages = document.getElementById('formMessages');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const name = this.querySelector('input[name="name"]').value.trim();
        const phone = this.querySelector('input[name="phone"]').value.trim();
        const email = this.querySelector('input[name="email"]').value.trim();
        const message = this.querySelector('textarea[name="message"]').value.trim();
        const privacy = this.querySelector('input[name="privacy"]').checked;
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        if (formMessages) {
            formMessages.innerHTML = '';
        }
        
        let errors = [];
        
        if (!name) errors.push('имя');
        if (!phone) errors.push('телефон');
        if (!email) errors.push('email');
        
        if (errors.length > 0) {
            showFormMessage('Пожалуйста, заполните все обязательные поля: ' + errors.join(', '), 'error');
            return;
        }
        
        if (!privacy) {
            showFormMessage('Необходимо согласие на обработку персональных данных', 'error');
            return;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showFormMessage('Пожалуйста, введите корректный email', 'error');
            return;
        }
        
        const phoneRegex = /^[\d\s\+\-\(\)]{10,}$/;
        const cleanPhone = phone.replace(/\D/g, '');
        if (!phoneRegex.test(phone) || cleanPhone.length < 10) {
            showFormMessage('Пожалуйста, введите корректный номер телефона (минимум 10 цифр)', 'error');
            return;
        }
        
        submitBtn.textContent = 'Отправка...';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';
        submitBtn.style.cursor = 'not-allowed';
        
        try {
            const formData = new FormData(this);
            
            formData.append('_subject', 'Новая заявка с сайта Drupal-coder');
            formData.append('_replyto', email);
            formData.append('_format', 'plain');
            
            const response = await fetch('https://formcarry.com/', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                showFormMessage('Спасибо за заявку!', 'success');
                
                contactForm.reset();
                
                if (formMessages) {
                    formMessages.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                
                setTimeout(() => {
                    if (formMessages) {
                        formMessages.innerHTML = '';
                    }
                }, 5000);
            } else {
                throw new Error('Ошибка при отправке формы');
            }
            
        } catch (error) {
            console.error('Form submission error:', error);
            showFormMessage('Произошла ошибка при отправке формы. Пожалуйста, попробуйте еще раз или свяжитесь с нами по телефону.', 'error');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
            submitBtn.style.cursor = 'pointer';
        }
    });
}

function showFormMessage(message, type = 'success') {
    if (!formMessages) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.textContent = message;
    
    formMessages.innerHTML = '';
    formMessages.appendChild(messageDiv);
}


function initFormValidation() {
    const form = document.querySelector('.webform__form');
    if (!form) return;
    
    const phoneInput = form.querySelector('input[type="tel"]');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = this.value.replace(/\D/g, '');
            
            if (value.length > 0) {
                value = value.match(/(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
                value = !value[2] ? value[1] : value[1] + ' ' + value[2] + (value[3] ? ' ' + value[3] : '') + (value[4] ? ' ' + value[4] : '');
            }
            
            this.value = value;
        });
    }
    
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.type === 'email' && this.value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(this.value)) {
                    this.style.borderColor = '#dc3545';
                } else {
                    this.style.borderColor = '';
                }
            }
            
            if (this.type === 'tel' && this.value) {
                const cleanPhone = this.value.replace(/\D/g, '');
                if (cleanPhone.length < 10) {
                    this.style.borderColor = '#dc3545';
                } else {
                    this.style.borderColor = '';
                }
            }
            
            if (this.hasAttribute('required') && !this.value.trim()) {
                this.style.borderColor = '#dc3545';
            }
        });
        
        input.addEventListener('input', function() {
            this.style.borderColor = '';
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initFormValidation();
    new ReviewsSlider();
});


if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                }
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px 0px',
        threshold: 0.1
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

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