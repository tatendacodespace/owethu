// Create floating hearts
function createHearts() {
    const starsContainer = document.querySelector('.stars-container');
    if (!starsContainer) return;

    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 10 + 10 + 's';
        heart.style.opacity = Math.random() * 0.5 + 0.5;
        starsContainer.appendChild(heart);
    }
}

// Handle button clicks
document.addEventListener('DOMContentLoaded', () => {
    createHearts();

    // Function to handle navigation
    function handleNavigation(nextPage) {
        // Create heart animation
        const button = event.currentTarget;
        createHeartAnimation(button);
        
        // Navigate after animation
        setTimeout(() => {
            window.location.href = nextPage;
        }, 1000);
    }

    // Function to get current page
    function getCurrentPage() {
        const path = window.location.pathname;
        return path.substring(path.lastIndexOf('/') + 1) || 'index.html';
    }

    // Proceed button
    const proceedBtn = document.querySelector('.proceed-btn');
    if (proceedBtn) {
        proceedBtn.addEventListener('click', (event) => {
            const currentPage = getCurrentPage();
            if (currentPage === 'index.html' || currentPage === '') {
                handleNavigation('page2.html');
            } else if (currentPage === 'page2.html') {
                handleNavigation('page3.html');
            }
        });
    }

    // Return button
    const returnBtn = document.querySelector('.return-btn');
    if (returnBtn) {
        returnBtn.addEventListener('click', (event) => {
            handleNavigation('page3.html');
        });
    }

    // Option buttons
    const optionBtns = document.querySelectorAll('.option-btn');
    optionBtns.forEach(btn => {
        btn.addEventListener('click', (event) => {
            // Remove selected class from all buttons
            optionBtns.forEach(b => b.classList.remove('selected'));
            // Add selected class to clicked button
            btn.classList.add('selected');
            
            // Create heart animation
            createHeartAnimation(btn);

            // Handle navigation based on selection
            if (btn.textContent.includes('Nah')) {
                setTimeout(() => {
                    window.location.href = 'page4.html';
                }, 1000);
            } else {
                setTimeout(() => {
                    window.location.href = 'page5.html';
                }, 1000);
            }
        });
    });

    // Next button
    const nextBtn = document.querySelector('.next-btn');
    if (nextBtn) {
        nextBtn.addEventListener('click', (event) => {
            const currentPage = getCurrentPage();
            if (currentPage === 'page5.html') {
                handleNavigation('page6.html');
            } else if (currentPage === 'page7.html') {
                window.location.href = 'https://wa.me/+27681930814';
            }
        });
    }

    // Submit button
    const submitBtn = document.querySelector('.submit-btn');
    if (submitBtn) {
        submitBtn.addEventListener('click', async (event) => {
            const questionInput = document.querySelector('.question-input');
            const question = questionInput.value.trim();
            
            if (question) {
                try {
                    // Create heart animation
                    createHeartAnimation(submitBtn);
                    
                    // Send the question to the server
                    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            service_id: 'service_3ucsukm',
                            template_id: 'template_d28ic3u',
                            user_id: '--mHdD4datxmYOyPW',
                            template_params: {
                                message: question,
                                to_email: 'tatendamidzi49@gmail.com',
                                from_name: 'Anonymous'
                            }
                        })
                    });

                    if (response.ok) {
                        // Store the question locally
                        localStorage.setItem('lastQuestion', question);
                        
                        // Navigate to next page after animation
                        setTimeout(() => {
                            window.location.href = 'page7.html';
                        }, 1000);
                    } else {
                        throw new Error('Failed to send message');
                    }
                } catch (error) {
                    console.error('Error sending message:', error);
                    // Still navigate to next page even if sending fails
                    setTimeout(() => {
                        window.location.href = 'page7.html';
                    }, 1000);
                }
            } else {
                // Add shake animation to input if empty
                questionInput.classList.add('shake');
                setTimeout(() => {
                    questionInput.classList.remove('shake');
                }, 500);
            }
        });
    }
});

// Create heart animation when option is selected
function createHeartAnimation(element) {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.style.left = element.getBoundingClientRect().left + element.offsetWidth / 2 + 'px';
    heart.style.top = element.getBoundingClientRect().top + 'px';
    heart.style.animationDuration = '1s';
    heart.style.opacity = '1';
    document.querySelector('.stars-container').appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 1000);
}

// Add pop heart animation
const style = document.createElement('style');
style.textContent = `
    @keyframes popHeart {
        0% {
            transform: translate(-50%, -50%) scale(0.5);
            opacity: 0;
        }
        50% {
            transform: translate(-50%, -50%) scale(1.2);
            opacity: 1;
        }
        100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Handle CTA button click
const ctaButton = document.querySelector('.cta-btn');
if (ctaButton) {
    ctaButton.addEventListener('click', () => {
        // Add pulse animation
        ctaButton.classList.add('pulse');
        
        // Remove animation class after animation completes
        setTimeout(() => {
            ctaButton.classList.remove('pulse');
        }, 1000);
    });
}

