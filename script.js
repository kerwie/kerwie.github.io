/* ============================================================================
   KERWIN'S DARK DOMAIN - JAVASCRIPT
   Interactive Features and Functionality
   ============================================================================ */

// ============================================================================
// 1. MOBILE MENU TOGGLE
// ============================================================================

document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    // Toggle menu on hamburger click
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
    
    // Close menu when a link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            if (hamburger) {
                hamburger.classList.remove('active');
            }
        });
    });
});

// ============================================================================
// 2. GALLERY MODAL FUNCTIONALITY
// ============================================================================

let currentImageIndex = 0;
let galleryImages = [];

document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modal = document.getElementById('galleryModal');
    const modalImage = document.getElementById('modalImage');
    const closeBtn = document.querySelector('.close');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    // Populate gallery images array
    galleryImages = Array.from(galleryItems).map(item => item.getAttribute('data-image'));
    
    // Open modal on gallery item click
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            currentImageIndex = index;
            openModal(this.getAttribute('data-image'));
        });
    });
    
    // Close modal
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });
    
    // Next image
    nextBtn.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        modalImage.src = galleryImages[currentImageIndex];
        modalImage.style.animation = 'none';
        setTimeout(() => {
            modalImage.style.animation = '';
        }, 10);
    });
    
    // Previous image
    prevBtn.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        modalImage.src = galleryImages[currentImageIndex];
        modalImage.style.animation = 'none';
        setTimeout(() => {
            modalImage.style.animation = '';
        }, 10);
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(event) {
        if (modal.classList.contains('active')) {
            if (event.key === 'ArrowLeft') prevBtn.click();
            if (event.key === 'ArrowRight') nextBtn.click();
            if (event.key === 'Escape') closeModal();
        }
    });
});

function openModal(imageSrc) {
    const modal = document.getElementById('galleryModal');
    const modalImage = document.getElementById('modalImage');
    
    modal.classList.add('active');
    modalImage.src = imageSrc;
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('galleryModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// ============================================================================
// 3. BACK TO TOP BUTTON
// ============================================================================

document.addEventListener('DOMContentLoaded', function() {
    const backToTopButton = document.getElementById('backToTop');
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });
    
    // Scroll to top on button click
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// ============================================================================
// 4. SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================================================

document.addEventListener('click', function(event) {
    const link = event.target.closest('a[href^="#"]');
    
    if (link) {
        event.preventDefault();
        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// ============================================================================
// 5. ANIMATION TRIGGER ON SCROLL
// ============================================================================

document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe section content for animation
    document.querySelectorAll('.about-content, .gallery-grid, .social-links').forEach(element => {
        observer.observe(element);
    });
});

// ============================================================================
// 6. UTILITY FUNCTIONS
// ============================================================================

/**
 * Dynamically update social media links
 * CUSTOMIZATION: Call this function with your actual social media URLs
 * Example: updateSocialLinks('your-discord-url', 'your-facebook-url', 'your-email')
 */
function updateSocialLinks(discordUrl, facebookUrl, emailAddress) {
    const discordBtn = document.querySelector('.discord-btn');
    const facebookBtn = document.querySelector('.facebook-btn');
    const emailBtn = document.querySelector('.email-btn');
    
    if (discordBtn) discordBtn.href = discordUrl;
    if (facebookBtn) facebookBtn.href = facebookUrl;
    if (emailBtn) emailBtn.href = 'mailto:' + emailAddress;
}

/**
 * Update gallery images dynamically
 * CUSTOMIZATION: Call this if you want to change gallery images via JavaScript
 */
function updateGalleryImages(imageArray) {
    const galleryGrid = document.querySelector('.gallery-grid');
    galleryGrid.innerHTML = '';
    
    imageArray.forEach((imagePath, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.setAttribute('data-image', imagePath);
        galleryItem.innerHTML = `
            <img src="${imagePath}" alt="Gallery Image ${index + 1}">
            <div class="gallery-overlay">
                <i class="fas fa-search-plus"></i>
            </div>
        `;
        
        galleryItem.addEventListener('click', function() {
            currentImageIndex = imageArray.indexOf(imagePath);
            openModal(imagePath);
        });
        
        galleryGrid.appendChild(galleryItem);
    });
    
    galleryImages = imageArray;
}

/**
 * Update profile information
 * CUSTOMIZATION: Call this to dynamically update About section
 */
function updateProfileInfo(name, aboutText, profileImagePath) {
    const profilePhoto = document.querySelector('.profile-photo');
    const aboutTextElement = document.querySelector('.about-text p');
    const siteTitle = document.querySelector('.hero-title');
    
    if (siteTitle) {
        siteTitle.innerHTML = `
            <span class="tech-bracket">&lt;</span>
            ${name}'s Dark Domain
            <span class="tech-bracket">/&gt;</span>
        `;
    }
    
    if (profilePhoto) {
        profilePhoto.src = profileImagePath;
        profilePhoto.alt = `${name} Profile Photo`;
    }
    
    if (aboutTextElement) {
        aboutTextElement.textContent = aboutText;
    }
}

// ============================================================================
// 7. ERROR HANDLING & FALLBACKS
// ============================================================================

// Check for missing images and provide fallback
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            console.warn(`Image failed to load: ${this.src}`);
            this.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%237b2cbf" width="200" height="200"/%3E%3Ctext x="50%" y="50%" text-anchor="middle" dy=".3em" fill="white" font-family="Arial" font-size="16"%3EImage Not Found%3C/text%3E%3C/svg%3E';
            this.style.border = '2px solid #c77dff';
        });
    });
});

// ============================================================================
// 8. CONSOLE WELCOME MESSAGE
// ============================================================================

console.log('%c🖤 Welcome to Kerwin\'s Dark Domain 🖤', 'color: #c77dff; font-size: 16px; font-weight: bold;');
console.log('%cExplore the code and customize to your liking!', 'color: #9d4edd; font-size: 12px;');
console.log('%cFeel free to use the following functions:', 'color: #7b2cbf; font-size: 12px;');
console.log('%cupdateSocialLinks(discordUrl, facebookUrl, emailAddress)', 'color: #e0e0e0;');
console.log('%cupdateGalleryImages(imageArray)', 'color: #e0e0e0;');
console.log('%cupdateProfileInfo(name, aboutText, profileImagePath)', 'color: #e0e0e0;');
