// Main JavaScript file for GrowCiti website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });

    // Initialize Hero Slider
    if (document.querySelector('.hero-swiper')) {
        const heroSwiper = new Swiper('.hero-swiper', {
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            }
        });
    }

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.main-header');
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.navbar-toggler');
    const mobileMenu = document.querySelector('.navbar-collapse');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Search functionality
    const searchForms = document.querySelectorAll('.search-form');
    searchForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchInput = this.querySelector('input[type="search"]');
            const searchTerm = searchInput.value.trim();
            
            if (searchTerm) {
                // Redirect to products page with search query
                window.location.href = `products.html?search=${encodeURIComponent(searchTerm)}`;
            }
        });
    });

    // Cart functionality
    const addToCartButtons = document.querySelectorAll('.btn-add-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add animation effect
            this.innerHTML = '<i class="fas fa-check"></i> Added!';
            this.style.background = '#28a745';
            
            // Update cart count
            updateCartCount();
            
            // Reset button after 2 seconds
            setTimeout(() => {
                this.innerHTML = 'Add to Cart';
                this.style.background = '';
            }, 2000);
        });
    });

    // Update cart count function
    function updateCartCount() {
        const cartCountElement = document.querySelector('.cart-count');
        if (cartCountElement) {
            let currentCount = parseInt(cartCountElement.textContent) || 0;
            cartCountElement.textContent = currentCount + 1;
            
            // Add animation
            cartCountElement.style.transform = 'scale(1.3)';
            setTimeout(() => {
                cartCountElement.style.transform = 'scale(1)';
            }, 300);
        }
    }

    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email && isValidEmail(email)) {
                // Show success message
                showNotification('Thank you for subscribing!', 'success');
                emailInput.value = '';
            } else {
                showNotification('Please enter a valid email address.', 'error');
            }
        });
    }

    // Email validation function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Notification function
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '15px 20px',
            borderRadius: '5px',
            color: 'white',
            background: type === 'success' ? '#28a745' : '#dc3545',
            zIndex: '9999',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease'
        });
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Lazy loading for images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // Back to top button
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '<i class="fas fa-chevron-up"></i>';
    backToTopButton.className = 'back-to-top';
    backToTopButton.setAttribute('aria-label', 'Back to top');
    
    // Style the back to top button
    Object.assign(backToTopButton.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #91cd7d 0%, #1f8b44 100%)',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        opacity: '0',
        visibility: 'hidden',
        transition: 'all 0.3s ease',
        zIndex: '1000',
        fontSize: '18px'
    });
    
    document.body.appendChild(backToTopButton);
    
    // Show/hide back to top button
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.style.opacity = '1';
            backToTopButton.style.visibility = 'visible';
        } else {
            backToTopButton.style.opacity = '0';
            backToTopButton.style.visibility = 'hidden';
        }
    });
    
    // Back to top functionality
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Product quick view functionality
    const quickViewButtons = document.querySelectorAll('.product-overlay .btn');
    quickViewButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create modal for quick view
            const modal = createQuickViewModal();
            document.body.appendChild(modal);
            
            // Show modal
            setTimeout(() => {
                modal.style.opacity = '1';
                modal.style.visibility = 'visible';
            }, 100);
        });
    });

    // Create quick view modal
    function createQuickViewModal() {
        const modal = document.createElement('div');
        modal.className = 'quick-view-modal';
        modal.innerHTML = `
            <div class="modal-overlay">
                <div class="modal-content">
                    <button class="modal-close">&times;</button>
                    <div class="row">
                        <div class="col-md-6">
                            <img src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=500" alt="Product" class="img-fluid">
                        </div>
                        <div class="col-md-6">
                            <h3>Product Name</h3>
                            <div class="rating mb-3">
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                            </div>
                            <p>Product description goes here...</p>
                            <div class="price mb-3">
                                <span class="current-price">₹45</span>
                                <span class="old-price">₹55</span>
                            </div>
                            <button class="btn btn-primary btn-add-cart">Add to Cart</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Style the modal
        Object.assign(modal.style, {
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            background: 'rgba(0,0,0,0.8)',
            zIndex: '9999',
            opacity: '0',
            visibility: 'hidden',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        });
        
        // Close modal functionality
        const closeButton = modal.querySelector('.modal-close');
        const overlay = modal.querySelector('.modal-overlay');
        
        closeButton.addEventListener('click', () => closeModal(modal));
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closeModal(modal);
            }
        });
        
        return modal;
    }

    // Close modal function
    function closeModal(modal) {
        modal.style.opacity = '0';
        modal.style.visibility = 'hidden';
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    }

    // Loading animation for page transitions
    function showLoader() {
        const loader = document.createElement('div');
        loader.className = 'page-loader';
        loader.innerHTML = '<div class="spinner"></div>';
        
        Object.assign(loader.style, {
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            background: 'white',
            zIndex: '9999',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        });
        
        document.body.appendChild(loader);
        return loader;
    }

    // Hide loader
    function hideLoader(loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(loader);
            }, 300);
        }, 500);
    }

    // Initialize tooltips if Bootstrap is available
    if (typeof bootstrap !== 'undefined') {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }

    // Performance optimization: Debounce scroll events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Apply debouncing to scroll events
    const debouncedScrollHandler = debounce(() => {
        // Handle scroll events here
    }, 16); // ~60fps

    window.addEventListener('scroll', debouncedScrollHandler);

    console.log('GrowCiti website initialized successfully!');
});

// Global utility functions
window.GrowCiti = {
    // Format currency
    formatCurrency: function(amount) {
        return '₹' + amount.toLocaleString('en-IN');
    },
    
    // Format date
    formatDate: function(date) {
        return new Date(date).toLocaleDateString('en-IN');
    },
    
    // Generate random ID
    generateId: function() {
        return Math.random().toString(36).substr(2, 9);
    }
};