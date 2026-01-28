      // DOM Elements
        const hamburger = document.getElementById('hamburger');
        const mobileMenu = document.getElementById('mobileMenu');
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
        const navLinks = document.querySelectorAll('.nav-link');
        
        // Initialize
        document.addEventListener('DOMContentLoaded', function() {
            initNavbar();
            initMobileMenu();
            initSmoothScroll();
            initAnimations();
        });
        
        // ===== NAVBAR SCROLL EFFECT =====
        function initNavbar() {
            const navbar = document.querySelector('.navbar');
            
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
                
                // Update active nav link based on scroll position
                updateActiveNavLink();
            });
        }
        
        // ===== UPDATE ACTIVE NAV LINK =====
        function updateActiveNavLink() {
            const sections = document.querySelectorAll('section[id]');
            const scrollPos = window.scrollY + 100;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                    
                    mobileNavLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }
        
        // ===== MOBILE MENU =====
        function initMobileMenu() {
            hamburger.addEventListener('click', toggleMobileMenu);
            
            // Close mobile menu when clicking on a link
            mobileNavLinks.forEach(link => {
                link.addEventListener('click', closeMobileMenu);
            });
            
            // Close mobile menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
                    closeMobileMenu();
                }
            });
        }
        
        function toggleMobileMenu() {
            mobileMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
            
            if (mobileMenu.classList.contains('active')) {
                // Animate hamburger to X
                hamburger.querySelectorAll('span')[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
                hamburger.querySelectorAll('span')[1].style.opacity = '0';
                hamburger.querySelectorAll('span')[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
            } else {
                closeMobileMenu();
            }
        }
        
        function closeMobileMenu() {
            mobileMenu.classList.remove('active');
            hamburger.classList.remove('active');
            
            // Reset hamburger
            hamburger.querySelectorAll('span')[0].style.transform = '';
            hamburger.querySelectorAll('span')[1].style.opacity = '';
            hamburger.querySelectorAll('span')[2].style.transform = '';
        }
        
        // ===== SMOOTH SCROLL =====
        function initSmoothScroll() {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    if (targetId === '#') return;
                    
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    }
                });
            });
        }
        
        // ===== ANIMATIONS =====
        function initAnimations() {
            // Add hover effects to cards
            document.querySelectorAll('.focus-card, .commitment-item').forEach(card => {
                card.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-5px)';
                    this.style.boxShadow = '0 15px 30px rgba(0,0,0,0.15)';
                });
                
                card.addEventListener('mouseleave', function() {
                    this.style.transform = '';
                    this.style.boxShadow = '';
                });
            });
            
            // Add hover effects to buttons
            document.querySelectorAll('.btn').forEach(button => {
                button.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-3px)';
                });
                
                button.addEventListener('mouseleave', function() {
                    this.style.transform = '';
                });
            });
            
            // Add animation on scroll
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, observerOptions);
            
            // Observe all sections for animation
            document.querySelectorAll('section').forEach(section => {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                observer.observe(section);
            });
        }