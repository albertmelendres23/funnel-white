// Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const quoteForm = document.getElementById('quoteForm');
    const formSuccess = document.getElementById('formSuccess');
    const formError = document.getElementById('formError');

    // Handle form submission
    if (quoteForm) {
        quoteForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Hide previous messages
            formSuccess.style.display = 'none';
            formError.style.display = 'none';

            // Validate form
            if (validateForm()) {
                // Get form data
                const formData = new FormData(quoteForm);
                const data = {};
                formData.forEach((value, key) => {
                    if (key === 'solutions') {
                        if (!data[key]) data[key] = [];
                        data[key].push(value);
                    } else {
                        data[key] = value;
                    }
                });

                // Simulate form submission (replace with actual API call)
                submitForm(data);
            }
        });
    }

    // Validate form
    function validateForm() {
        const solutions = document.querySelectorAll('input[name="solutions"]:checked');
        const postcode = document.getElementById('postcode').value;
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const privacy = document.querySelector('input[name="privacy"]').checked;

        // Check if at least one solution is selected
        if (solutions.length === 0) {
            showError('Please select at least one solution you are interested in.');
            return false;
        }

        // Validate postcode (4 digits)
        if (!/^\d{4}$/.test(postcode)) {
            showError('Please enter a valid 4-digit postcode.');
            return false;
        }

        // Validate required fields
        if (!firstName || !lastName || !email || !phone) {
            showError('Please fill in all required fields.');
            return false;
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showError('Please enter a valid email address.');
            return false;
        }

        // Validate privacy checkbox
        if (!privacy) {
            showError('Please agree to our Privacy Policy to continue.');
            return false;
        }

        return true;
    }

    // Submit form (replace with actual API endpoint)
    function submitForm(data) {
        // Show loading state
        const submitBtn = document.querySelector('.btn-submit');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Submitting...';
        submitBtn.disabled = true;

        // Simulate API call (replace with actual fetch/axios call)
        setTimeout(() => {
            // For demo purposes, always show success
            // In production, handle actual API response
            formSuccess.style.display = 'block';
            quoteForm.style.display = 'none';
            
            // Scroll to success message
            formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });

            // Log form data (in production, send to your backend)
            console.log('Form Data:', data);

            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;

            // Optional: Send to your backend API
            // fetch('/api/quote', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(data)
            // })
            // .then(response => response.json())
            // .then(result => {
            //     formSuccess.style.display = 'block';
            //     quoteForm.style.display = 'none';
            // })
            // .catch(error => {
            //     showError('Something went wrong. Please try again.');
            //     submitBtn.textContent = originalText;
            //     submitBtn.disabled = false;
            // });
        }, 1000);
    }

    // Show error message
    function showError(message) {
        formError.querySelector('p').textContent = message;
        formError.style.display = 'block';
        formError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    // FAQ Toggle Functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Phone number formatting
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            // Format as Australian phone number
            if (value.startsWith('61')) {
                value = '+' + value;
            } else if (value.startsWith('0')) {
                value = '+61' + value.substring(1);
            } else if (value.length > 0 && !value.startsWith('+61')) {
                value = '+61' + value;
            }
            
            e.target.value = value;
        });
    }

    // Postcode validation
    const postcodeInput = document.getElementById('postcode');
    if (postcodeInput) {
        postcodeInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 4) {
                value = value.substring(0, 4);
            }
            e.target.value = value;
        });
    }

    // Add animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.problem-card, .benefit-card, .why-card, .testimonial-card, .step-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Header scroll effect
    let lastScroll = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        }
        
        lastScroll = currentScroll;
    });

    // Checkbox group validation - ensure at least one is checked
    const solutionCheckboxes = document.querySelectorAll('input[name="solutions"]');
    solutionCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const checked = document.querySelectorAll('input[name="solutions"]:checked');
            if (checked.length > 0) {
                // Remove any error styling
                solutionCheckboxes.forEach(cb => {
                    cb.closest('.checkbox-label').style.borderColor = '';
                });
            }
        });
    });
});

// Add form validation styling
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input[required]');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value.trim() === '') {
                this.style.borderColor = '#EF4444';
            } else {
                this.style.borderColor = '';
            }
        });

        input.addEventListener('input', function() {
            if (this.value.trim() !== '') {
                this.style.borderColor = '';
            }
        });
    });

    // Modal Form Popup Functionality
    const formModal = document.getElementById('formModal');
    const openModalButtons = document.querySelectorAll('.open-modal');
    const closeModalButton = document.querySelector('.modal-close');
    const modalOverlay = document.querySelector('.modal-overlay');

    // Open modal function
    function openModal(e) {
        if (e) e.preventDefault();
        if (formModal) {
            formModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }
    }

    // Close modal function
    function closeModal() {
        if (formModal) {
            formModal.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
        }
    }

    // Add click listeners to all open modal buttons
    openModalButtons.forEach(button => {
        button.addEventListener('click', openModal);
    });

    // Close modal when close button is clicked
    if (closeModalButton) {
        closeModalButton.addEventListener('click', closeModal);
    }

    // Close modal when overlay is clicked
    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeModal);
    }

    // Close modal when Escape key is pressed
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && formModal && formModal.classList.contains('active')) {
            closeModal();
        }
    });

    // Prevent modal from closing when clicking inside modal content
    const modalContent = document.querySelector('.modal-content');
    if (modalContent) {
        modalContent.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
});

