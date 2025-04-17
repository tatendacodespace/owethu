
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


document.addEventListener('DOMContentLoaded', () => {
    createHearts();

    function handleNavigation(nextPage) {
        const button = event.currentTarget;
        createHeartAnimation(button);
        
        setTimeout(() => {
            window.location.href = nextPage;
        }, 1000);
    }

    function getCurrentPage() {
        const path = window.location.pathname;
        return path.substring(path.lastIndexOf('/') + 1) || 'index.html';
    }

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

    const returnBtn = document.querySelector('.return-btn');
    if (returnBtn) {
        returnBtn.addEventListener('click', (event) => {
            handleNavigation('page3.html');
        });
    }

    const optionBtns = document.querySelectorAll('.option-btn');
    optionBtns.forEach(btn => {
        btn.addEventListener('click', (event) => {
            optionBtns.forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');

            createHeartAnimation(btn);

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

    const submitBtn = document.querySelector('.submit-btn');
    if (submitBtn) {
        submitBtn.addEventListener('click', async (event) => {
            const questionInput = document.querySelector('.question-input');
            const question = questionInput.value.trim();
            
            if (question) {
                try {
                    createHeartAnimation(submitBtn);
                    
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
                        localStorage.setItem('lastQuestion', question);
                        
                        setTimeout(() => {
                            window.location.href = 'page7.html';
                        }, 1000);
                    } else {
                        throw new Error('Failed to send message');
                    }
                } catch (error) {
                    console.error('Error sending message:', error);
                    setTimeout(() => {
                        window.location.href = 'page7.html';
                    }, 1000);
                }
            } else {
                questionInput.classList.add('shake');
                setTimeout(() => {
                    questionInput.classList.remove('shake');
                }, 500);
            }
        });
    }
});

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

const ctaButton = document.querySelector('.cta-btn');
if (ctaButton) {
    ctaButton.addEventListener('click', () => {
        
        ctaButton.classList.add('pulse');
        

        setTimeout(() => {
            ctaButton.classList.remove('pulse');
        }, 1000);
    });
}

