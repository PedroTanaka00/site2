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



document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const form = document.getElementById('consulta-form');
    const formContainer = document.getElementById('form-container');
    const successMessage = document.getElementById('success-message');
    const newConsultationBtn = document.getElementById('new-consultation-btn');
    const submitBtn = document.getElementById('submit-btn');
    
    // Form steps
    const formSteps = document.querySelectorAll('.form-step');
    const progressSteps = document.querySelectorAll('.progress-step');
    const progressLines = [
      document.getElementById('progress-line-1'),
      document.getElementById('progress-line-2')
    ];
    
    // Form fields
    const formFields = {
      nome: document.getElementById('nome'),
      email: document.getElementById('email'),
      telefone: document.getElementById('telefone'),
      area: document.getElementById('area'),
      mensagem: document.getElementById('mensagem'),
      data: document.getElementById('data'),
      termos: document.getElementById('termos')
    };
    
    // Initialize floating labels
    initFloatingLabels();
    
    // Next and Previous buttons
    const nextButtons = document.querySelectorAll('.btn-next');
    const prevButtons = document.querySelectorAll('.btn-prev');
    
    nextButtons.forEach(button => {
      button.addEventListener('click', function() {
        const nextStep = parseInt(this.dataset.next);
        goToStep(nextStep);
      });
    });
    
    prevButtons.forEach(button => {
      button.addEventListener('click', function() {
        const prevStep = parseInt(this.dataset.prev);
        goToStep(prevStep);
      });
    });
    
    // Form submission
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Show loading state
      submitBtn.classList.add('loading');
      
      // Simulate form submission (replace with actual form submission)
      setTimeout(() => {
        submitBtn.classList.remove('loading');
        showSuccessMessage();
      }, 1500);
    });
    
    // New consultation button
    newConsultationBtn.addEventListener('click', function() {
      hideSuccessMessage();
      form.reset();
      goToStep(1);
    });
    
    // Add hover effects to contact cards
    const contactCards = document.querySelectorAll('.contact-card');
    contactCards.forEach(card => {
      card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
        this.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.1)';
      });
      
      card.addEventListener('mouseleave', function() {
        this.style.transform = '';
        this.style.boxShadow = '';
      });
    });
    
    // Functions
    function initFloatingLabels() {
      // For each input and textarea with floating label
      document.querySelectorAll('.floating-label input, .floating-label textarea').forEach(field => {
        // Set placeholder to empty string to make floating label work
        field.setAttribute('placeholder', ' ');
        
        // Check if field already has value on page load
        if (field.value.trim() !== '') {
          field.classList.add('has-value');
        }
        
        // Add focus and blur event listeners
        field.addEventListener('focus', function() {
          this.parentElement.classList.add('focused');
        });
        
        field.addEventListener('blur', function() {
          this.parentElement.classList.remove('focused');
          if (this.value.trim() !== '') {
            this.classList.add('has-value');
          } else {
            this.classList.remove('has-value');
          }
        });
      });
    }
    
    function goToStep(stepNumber) {
      // Hide all steps
      formSteps.forEach(step => {
        step.classList.remove('active');
      });
      
      // Show the target step
      document.getElementById(`step-${stepNumber}`).classList.add('active');
      
      // Update progress steps
      progressSteps.forEach((step, index) => {
        const stepNum = index + 1;
        
        if (stepNum < stepNumber) {
          step.classList.add('completed');
          step.classList.add('active');
          if (progressLines[index]) {
            progressLines[index].style.width = '100%';
          }
        } else if (stepNum === stepNumber) {
          step.classList.add('active');
          step.classList.remove('completed');
          if (index > 0 && progressLines[index-1]) {
            progressLines[index-1].style.width = '100%';
          }
        } else {
          step.classList.remove('active');
          step.classList.remove('completed');
          if (progressLines[index-1]) {
            progressLines[index-1].style.width = '0';
          }
        }
      });
      
      // Scroll to top of form
      formContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    function showSuccessMessage() {
      formContainer.style.display = 'none';
      successMessage.style.display = 'block';
    }
    
    function hideSuccessMessage() {
      successMessage.style.display = 'none';
      formContainer.style.display = 'block';
    }
    
    // Animate background shapes
    const bgShapes = document.querySelectorAll('.bg-shape');
    bgShapes.forEach((shape, index) => {
      // Set random animation parameters
      const duration = 15 + Math.random() * 10;
      const delay = index * 5;
      
      // Apply animation with random parameters
      shape.style.animationDuration = `${duration}s`;
      shape.style.animationDelay = `${delay}s`;
    });
  });