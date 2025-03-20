document.addEventListener('DOMContentLoaded', function() {
    // Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const menuOverlay = document.querySelector('.menu-overlay');
    const closeMenu = document.querySelector('.close-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    const navMenuItems = document.querySelectorAll('.nav-menu li');
    const body = document.body;
    
    // Function to open menu with animation
    function openMenu() {
        menuToggle.classList.add('active');
        menuOverlay.classList.add('active');
        body.style.overflow = 'hidden'; // Prevent scrolling
        
        // Animate menu items one by one
        navMenuItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('active');
            }, parseInt(item.querySelector('a').getAttribute('data-delay')));
        });
    }
    
    // Function to close menu
    function closeMenuFunc() {
        menuToggle.classList.remove('active');
        menuOverlay.classList.remove('active');
        body.style.overflow = ''; // Enable scrolling
        
        // Reset menu items animation
        navMenuItems.forEach(item => {
            item.classList.remove('active');
        });
    }
    
    // Event listeners for menu
    menuToggle.addEventListener('click', openMenu);
    closeMenu.addEventListener('click', closeMenuFunc);
    
    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            closeMenuFunc();
            
            // Smooth scroll to target after menu closes
            setTimeout(() => {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }, 300);
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.padding = '10px 0';
            header.style.backgroundColor = 'rgba(15, 15, 26, 0.95)';
        } else {
            header.style.padding = '20px 0';
            header.style.backgroundColor = 'rgba(15, 15, 26, 0.9)';
        }
    });
    
    // Back to top button
    const backToTopBtn = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
    
    // Services Tabs
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to current button
            this.classList.add('active');
            
            // Show corresponding tab pane
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
   // Depoimentos Slider (Swipeable)
const depoimentosTrack = document.querySelector('.depoimentos-track');
const depoimentoCards = document.querySelectorAll('.depoimento-card');
const depoDots = document.querySelectorAll('.depo-dot');
const depoPrevBtn = document.querySelector('.depo-prev-btn');
const depoNextBtn = document.querySelector('.depo-next-btn');
let currentDepoimento = 0;
let startX, moveX, currentTranslate = 0;
const cardWidth = 100; // 100%

// Initialize slider
function updateDepoimentosSlider() {
    currentTranslate = -currentDepoimento * cardWidth;
    depoimentosTrack.style.transform = `translateX(${currentTranslate}%)`;
    
    // Update active state for cards
    depoimentoCards.forEach((card, index) => {
        if (index === currentDepoimento) {
            card.classList.add('active');
        } else {
            card.classList.remove('active');
        }
    });
    
    // Update dots
    depoDots.forEach((dot, index) => {
        if (index === currentDepoimento) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Set up initial state
depoimentoCards[0].classList.add('active');
updateDepoimentosSlider();

// Next and Previous buttons
depoNextBtn.addEventListener('click', () => {
    if (currentDepoimento < depoimentoCards.length - 1) {
        // Animate current card out
        depoimentoCards[currentDepoimento].style.animation = 'fadeOut 0.3s forwards';
        
        setTimeout(() => {
            currentDepoimento++;
            updateDepoimentosSlider();
            
            // Animate new card in
            depoimentoCards[currentDepoimento].style.animation = 'fadeIn 0.3s forwards';
        }, 300);
    }
});

depoPrevBtn.addEventListener('click', () => {
    if (currentDepoimento > 0) {
        // Animate current card out
        depoimentoCards[currentDepoimento].style.animation = 'fadeOut 0.3s forwards';
        
        setTimeout(() => {
            currentDepoimento--;
            updateDepoimentosSlider();
            
            // Animate new card in
            depoimentoCards[currentDepoimento].style.animation = 'fadeIn 0.3s forwards';
        }, 300);
    }
});

// Dot navigation
depoDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        if (index !== currentDepoimento) {
            // Animate current card out
            depoimentoCards[currentDepoimento].style.animation = 'fadeOut 0.3s forwards';
            
            setTimeout(() => {
                currentDepoimento = index;
                updateDepoimentosSlider();
                
                // Animate new card in
                depoimentoCards[currentDepoimento].style.animation = 'fadeIn 0.3s forwards';
            }, 300);
        }
    });
});

// Touch events for swiping
depoimentosTrack.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    
    // Pause auto-rotation when interacting
    clearInterval(depoInterval);
});

depoimentosTrack.addEventListener('touchmove', (e) => {
    if (!startX) return;
    
    moveX = e.touches[0].clientX;
    const diff = moveX - startX;
    const tempTranslate = -currentDepoimento * cardWidth + (diff / depoimentosTrack.offsetWidth) * 100;
    
    // Limit the swipe to the next/prev card only
    if (tempTranslate <= 0 && tempTranslate >= -((depoimentoCards.length - 1) * cardWidth)) {
        depoimentosTrack.style.transform = `translateX(${tempTranslate}%)`;
    }
});

depoimentosTrack.addEventListener('touchend', (e) => {
    if (!startX || !moveX) {
        startX = null;
        moveX = null;
        return;
    }
    
    const diff = moveX - startX;
    
    // If swiped more than 20% of card width, change card
    if (Math.abs(diff) > (depoimentosTrack.offsetWidth * 0.2)) {
        if (diff > 0 && currentDepoimento > 0) {
            // Swiped right
            currentDepoimento--;
        } else if (diff < 0 && currentDepoimento < depoimentoCards.length - 1) {
            // Swiped left
            currentDepoimento++;
        }
    }
    
    updateDepoimentosSlider();
    startX = null;
    moveX = null;
    
    // Resume auto-rotation
    startAutoRotation();
});

// Auto-rotate testimonials
let depoInterval;

function startAutoRotation() {
    // Clear any existing interval
    clearInterval(depoInterval);
    
    // Start a new interval
    depoInterval = setInterval(() => {
        if (currentDepoimento < depoimentoCards.length - 1) {
            // Animate current card out
            depoimentoCards[currentDepoimento].style.animation = 'fadeOut 0.3s forwards';
            
            setTimeout(() => {
                currentDepoimento++;
                updateDepoimentosSlider();
                
                // Animate new card in
                depoimentoCards[currentDepoimento].style.animation = 'fadeIn 0.3s forwards';
            }, 300);
        } else {
            // Animate current card out
            depoimentoCards[currentDepoimento].style.animation = 'fadeOut 0.3s forwards';
            
            setTimeout(() => {
                currentDepoimento = 0;
                updateDepoimentosSlider();
                
                // Animate new card in
                depoimentoCards[currentDepoimento].style.animation = 'fadeIn 0.3s forwards';
            }, 300);
        }
    }, 5000);
}

// Start auto-rotation initially
startAutoRotation();

// Pause auto-rotation when hovering
depoimentosTrack.addEventListener('mouseenter', () => {
    clearInterval(depoInterval);
});

// Resume auto-rotation when mouse leaves
depoimentosTrack.addEventListener('mouseleave', () => {
    startAutoRotation();
});
    
    // Team Slider
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const slider = document.querySelector('.profissionais-slider');
    
    prevBtn.addEventListener('click', function() {
        slider.scrollBy({
            left: -300,
            behavior: 'smooth'
        });
    });
    
    nextBtn.addEventListener('click', function() {
        slider.scrollBy({
            left: 300,
            behavior: 'smooth'
        });
    });
    
    // Form Validation
    const consultaForm = document.getElementById('consulta-form');
    
    if (consultaForm) {
        consultaForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            let isValid = true;
            const requiredFields = consultaForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = 'red';
                } else {
                    field.style.borderColor = '';
                }
            });
            
            // Email validation
            const emailField = document.getElementById('email');
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (emailField.value && !emailPattern.test(emailField.value)) {
                isValid = false;
                emailField.style.borderColor = 'red';
            }
            
            if (isValid) {
                // Show success message
                const formContainer = consultaForm.parentElement;
                formContainer.innerHTML = `
                    <div class="success-message">
                        <div class="success-icon">
                            <i class="fas fa-check-circle"></i>
                        </div>
                        <h3>Solicitação Enviada com Sucesso!</h3>
                        <p>Agradecemos pelo seu contato. Nossa equipe entrará em contato em até 24 horas úteis para confirmar sua consulta.</p>
                    </div>
                `;
                
                // Scroll to success message
                formContainer.scrollIntoView({ behavior: 'smooth' });
            }
        });
        
        // Clear validation on input
        const formInputs = consultaForm.querySelectorAll('input, select, textarea');
        formInputs.forEach(input => {
            input.addEventListener('input', function() {
                this.style.borderColor = '';
            });
        });
    }

    // Animation on scroll
    const animateElements = document.querySelectorAll('.especialidade-card, .diferencial-item, .timeline-item, .caso-card, .info-card-modern, .contato-card');
    
    function checkScroll() {
        const triggerBottom = window.innerHeight * 0.8;
        
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < triggerBottom) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Set initial state for animation
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
    });
    
    // Check on load and scroll
    window.addEventListener('load', checkScroll);
    window.addEventListener('scroll', checkScroll);
    
    // Gallery image hover effect
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.querySelector('.gallery-caption').style.transform = 'translateY(0)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.querySelector('.gallery-caption').style.transform = 'translateY(100%)';
        });
    });
    
    // Current year for copyright
    const yearSpan = document.querySelector('.footer-bottom .container p');
    if (yearSpan) {
        const currentYear = new Date().getFullYear();
        yearSpan.innerHTML = yearSpan.innerHTML.replace('2025', currentYear);
    }
});




// Adicione este código ao seu arquivo script.js existente
document.addEventListener('DOMContentLoaded', function() {
    // Código existente...
    
    // Funcionalidade de abas para a seção Sobre Nós
    const sobreTabLinks = document.querySelectorAll('#sobre-moderno .tab-link[data-tab]');
    
    sobreTabLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove a classe active de todas as abas e painéis
            sobreTabLinks.forEach(tab => tab.classList.remove('active'));
            document.querySelectorAll('#sobre-moderno .tab-pane').forEach(pane => pane.classList.remove('active'));
            
            // Adiciona a classe active à aba clicada
            this.classList.add('active');
            
            // Mostra o painel correspondente
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId + '-tab').classList.add('active');
        });
    });
});