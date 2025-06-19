// 통합된 스크립트 - 중복 제거하여 재작성

// ===== 페이지 로더 =====
window.addEventListener('load', () => {
    setTimeout(() => {
        const loader = document.querySelector('.page-loader');
        if (loader) {
            loader.classList.add('fade-out');
            setTimeout(() => {
                loader.remove();
            }, 800);
        }
    }, 1500);
});

// ===== 커스텀 커서 =====
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

if (cursor && cursorFollower) {
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });

    const animateFollower = () => {
        followerX += (mouseX - followerX) * 0.25;
        followerY += (mouseY - followerY) * 0.25;
        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';
        requestAnimationFrame(animateFollower);
    };
    animateFollower();

    // 호버 효과
    const hoverElements = document.querySelectorAll('a, button, .gallery-item, .feature-card, .stat-item');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            cursorFollower.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            cursorFollower.classList.remove('hover');
        });
    });

    // 커서 숨기기/보이기
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
        cursorFollower.style.opacity = '1';
    });
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        cursorFollower.style.opacity = '0';
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // JavaScript가 로드되었음을 표시
    document.body.classList.add('js-loaded');
    
    // ===== 스크롤 애니메이션 =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // fade-in 요소들 관찰
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => {
        observer.observe(element);
    });

    // 히어로 요소들 즉시 표시
    const heroElements = document.querySelectorAll('.hero .fade-in');
    setTimeout(() => {
        heroElements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('visible');
            }, index * 200);
        });
    }, 500);

    // ===== 갤러리 필터 기능 =====
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (filterButtons.length > 0 && galleryItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');
                
                // 활성 버튼 업데이트
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // 갤러리 아이템 필터링
                galleryItems.forEach((item, index) => {
                    const category = item.getAttribute('data-category');
                    
                    if (filter === 'all' || category === filter) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'perspective(1000px) rotateX(1deg)';
                        }, index * 100);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'perspective(1000px) rotateX(10deg) scale(0.9)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // ===== 갤러리 모달 =====
    const galleryModal = document.getElementById('galleryModal');
    const modalImage = document.getElementById('modalImage');
    const modalClose = document.getElementById('modalClose');

    if (galleryItems.length > 0 && galleryModal && modalImage) {
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const img = item.querySelector('.gallery-image');
                if (img) {
                    galleryModal.style.display = 'flex';
                    modalImage.src = img.src;
                    modalImage.alt = img.alt;
                }
            });
        });
    }

    if (modalClose && galleryModal) {
        modalClose.addEventListener('click', () => {
            galleryModal.style.display = 'none';
        });
        
        galleryModal.addEventListener('click', (e) => {
            if (e.target === galleryModal) {
                galleryModal.style.display = 'none';
            }
        });
    }

    // ===== 예약 폼 계산기 =====
    const updateBookingPrice = () => {
        const roomType = document.getElementById('roomType');
        const checkin = document.getElementById('checkin');
        const checkout = document.getElementById('checkout');
        const guestCount = document.getElementById('guestCount');
        const roomPriceEl = document.getElementById('roomPrice');
        const optionPriceEl = document.getElementById('optionPrice');
        const nightCountEl = document.getElementById('nightCount');
        const totalPriceEl = document.getElementById('totalPrice');
        
        console.log('Updating booking price...'); // 디버깅용
        
        // 기본값
        let roomPrice = 0;
        let nights = 1;
        let optionPrice = 0;
        
        // 객실 가격 계산
        if (roomType && roomType.value) {
            const selectedOption = roomType.options[roomType.selectedIndex];
            roomPrice = parseInt(selectedOption.getAttribute('data-price')) || 0;
            console.log('Room price:', roomPrice); // 디버깅용
        }
        
        // 박수 계산
        if (checkin && checkout && checkin.value && checkout.value) {
            const checkinDate = new Date(checkin.value);
            const checkoutDate = new Date(checkout.value);
            const timeDiff = checkoutDate.getTime() - checkinDate.getTime();
            nights = Math.max(1, Math.ceil(timeDiff / (1000 * 3600 * 24)));
            console.log('Nights:', nights); // 디버깅용
        }
        
        // 추가 옵션 계산
        const optionCheckboxes = document.querySelectorAll('.option-checkbox:checked');
        console.log('Checked options:', optionCheckboxes.length); // 디버깅용
        
        optionCheckboxes.forEach(checkbox => {
            const price = parseInt(checkbox.getAttribute('data-price')) || 0;
            const guests = parseInt(guestCount?.textContent) || 2;
            
            console.log(`Option ${checkbox.id}: ${price}, guests: ${guests}`); // 디버깅용
            
            if (checkbox.id === 'breakfast') {
                optionPrice += price * guests * nights;
            } else {
                optionPrice += price;
            }
        });
        
        // UI 업데이트
        const totalRoomPrice = roomPrice * nights;
        const totalPrice = totalRoomPrice + optionPrice;
        
        console.log('Final calculation:', { totalRoomPrice, optionPrice, totalPrice }); // 디버깅용
        
        if (roomPriceEl) roomPriceEl.textContent = totalRoomPrice.toLocaleString() + '원';
        if (optionPriceEl) optionPriceEl.textContent = optionPrice.toLocaleString() + '원';
        if (nightCountEl) nightCountEl.textContent = nights + '박';
        if (totalPriceEl) totalPriceEl.textContent = totalPrice.toLocaleString() + '원';
    };
    
    // 이벤트 리스너 추가 - 페이지 로드 후 잠시 대기
    setTimeout(() => {
        const roomTypeSelect = document.getElementById('roomType');
        const checkinInput = document.getElementById('checkin');
        const checkoutInput = document.getElementById('checkout');
        const optionCheckboxes = document.querySelectorAll('.option-checkbox');
        
        console.log('Setting up event listeners...'); // 디버깅용
        console.log('Found elements:', { roomTypeSelect, checkinInput, checkoutInput, optionCount: optionCheckboxes.length });
        
        if (roomTypeSelect) {
            roomTypeSelect.addEventListener('change', updateBookingPrice);
            console.log('Room type listener added');
        }
        if (checkinInput) {
            checkinInput.addEventListener('change', updateBookingPrice);
            console.log('Check-in listener added');
        }
        if (checkoutInput) {
            checkoutInput.addEventListener('change', updateBookingPrice);
            console.log('Check-out listener added');
        }
        
        optionCheckboxes.forEach((checkbox, index) => {
            checkbox.addEventListener('change', updateBookingPrice);
            console.log(`Option checkbox ${index} (${checkbox.id}) listener added`);
        });
        
        // 초기 계산 실행
        updateBookingPrice();
    }, 100);
    
    // 게스트 카운터 - 페이지 로드 후 설정
    setTimeout(() => {
        const increaseBtn = document.getElementById('increaseGuests');
        const decreaseBtn = document.getElementById('decreaseGuests');
        const guestCountEl = document.getElementById('guestCount');
        
        console.log('Setting up guest counter...', { increaseBtn, decreaseBtn, guestCountEl });
        
        if (increaseBtn && guestCountEl) {
            increaseBtn.addEventListener('click', (e) => {
                e.preventDefault();
                let count = parseInt(guestCountEl.textContent) || 2;
                if (count < 8) {
                    guestCountEl.textContent = count + 1;
                    updateBookingPrice();
                    console.log('Guest count increased to:', count + 1);
                }
            });
        }
        
        if (decreaseBtn && guestCountEl) {
            decreaseBtn.addEventListener('click', (e) => {
                e.preventDefault();
                let count = parseInt(guestCountEl.textContent) || 2;
                if (count > 1) {
                    guestCountEl.textContent = count - 1;
                    updateBookingPrice();
                    console.log('Guest count decreased to:', count - 1);
                }
            });
        }
    }, 100);

    // ===== Stats 카운터 애니메이션 =====
    const animateCounter = (element, target, suffix = '') => {
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + suffix;
        }, 20);
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach((stat, index) => {
                    setTimeout(() => {
                        switch(index) {
                            case 0: animateCounter(stat, 500, '+'); break;
                            case 1: animateCounter(stat, 87, '%'); break;
                            case 2: animateCounter(stat, 12, ''); break;
                            case 3: stat.textContent = '4.8★'; break;
                        }
                    }, index * 200);
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    // ===== Feature Cards 호버 효과 =====
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.feature-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.feature-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
});

// ===== 스무스 스크롤 =====
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

// ===== 헤더 스크롤 효과 =====
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    const scrolled = window.pageYOffset;
    
    if (header) {
        if (scrolled > 100) {
            header.style.background = 'rgba(255, 248, 240, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(255, 159, 122, 0.1)';
        } else {
            header.style.background = 'rgba(255, 248, 240, 0.95)';
            header.style.boxShadow = 'none';
        }
    }
    
    // 패럴랙스 효과
    if (hero && heroContent) {
        const rate = scrolled * -0.5;
        const opacity = Math.max(0, 1 - scrolled / (hero.offsetHeight * 0.8));
        
        heroContent.style.transform = `translateY(${rate}px)`;
        heroContent.style.opacity = opacity;
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});