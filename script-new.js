// 통합된 스크립트 - 중복 제거하여 재작성

// ===== 아늑한 펜션 로더 =====
let loadingProgress = 0;
const progressFill = document.querySelector('.progress-fill');
const progressText = document.querySelector('.progress-text');

// 로딩 진행률 시뮬레이션
const updateProgress = () => {
    if (loadingProgress < 100) {
        loadingProgress += Math.random() * 15 + 5; // 5-20% 씩 증가
        if (loadingProgress > 100) loadingProgress = 100;
        
        if (progressFill) progressFill.style.width = loadingProgress + '%';
        if (progressText) progressText.textContent = Math.round(loadingProgress) + '%';
        
        setTimeout(updateProgress, 200 + Math.random() * 300); // 200-500ms 간격
    } else {
        completeLoading();
    }
};

const completeLoading = () => {
    setTimeout(() => {
        const loader = document.querySelector('.page-loader');
        if (loader) {
            loader.classList.add('fade-out');
            setTimeout(() => {
                loader.remove();
            }, 1200);
        }
    }, 800);
};

// 페이지 로드 시작
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(updateProgress, 500); // 0.5초 후 로딩 시작
});

// 페이지 완전 로드 시 100% 완료
window.addEventListener('load', () => {
    loadingProgress = 100;
    if (progressFill) progressFill.style.width = '100%';
    if (progressText) progressText.textContent = '100%';
    setTimeout(completeLoading, 500);
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
    
    // ===== 고급 애니메이션 시스템 초기화 =====
    initScrollAnimations();
    init3DEffects();
    initMicroInteractions();
    initParallaxEffects();
    initAdvancedHoverEffects();
    initStaggerAnimations();
    initTextRevealAnimations();
    initPageLoadAnimations();
    optimizeAnimations();
    
    // ===== 기존 기능들 유지 =====
    
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
                const img = item.querySelector('img');
                if (img) {
                    modalImage.src = img.src;
                    modalImage.alt = img.alt;
                    galleryModal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            });
        });

        if (modalClose) {
            modalClose.addEventListener('click', () => {
                galleryModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        }

        galleryModal.addEventListener('click', (e) => {
            if (e.target === galleryModal) {
                galleryModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // ===== 예약 시스템 =====
    const bookingForm = document.getElementById('bookingForm');
    const roomTypeSelect = document.getElementById('roomType');
    const checkinInput = document.getElementById('checkin');
    const checkoutInput = document.getElementById('checkout');
    const guestCountElement = document.getElementById('guestCount');
    const increaseGuestsBtn = document.getElementById('increaseGuests');
    const decreaseGuestsBtn = document.getElementById('decreaseGuests');
    const optionCheckboxes = document.querySelectorAll('.option-checkbox');
    const roomPriceElement = document.getElementById('roomPrice');
    const optionPriceElement = document.getElementById('optionPrice');
    const nightCountElement = document.getElementById('nightCount');
    const totalPriceElement = document.getElementById('totalPrice');

    let guestCount = 2;

    // 게스트 카운터
    if (increaseGuestsBtn && decreaseGuestsBtn && guestCountElement) {
        increaseGuestsBtn.addEventListener('click', () => {
            if (guestCount < 8) {
                guestCount++;
                guestCountElement.textContent = guestCount;
                updateBookingPrice();
            }
        });

        decreaseGuestsBtn.addEventListener('click', () => {
            if (guestCount > 1) {
                guestCount--;
                guestCountElement.textContent = guestCount;
                updateBookingPrice();
            }
        });
    }

    // 체크아웃 날짜 자동 설정
    if (checkinInput && checkoutInput) {
        checkinInput.addEventListener('change', () => {
            const checkinDate = new Date(checkinInput.value);
            const checkoutDate = new Date(checkinDate);
            checkoutDate.setDate(checkoutDate.getDate() + 1);
            
            const checkoutString = checkoutDate.toISOString().split('T')[0];
            checkoutInput.value = checkoutString;
            checkoutInput.min = checkoutString;
            
            updateBookingPrice();
        });

        checkoutInput.addEventListener('change', updateBookingPrice);
    }

    // 객실 타입 변경
    if (roomTypeSelect) {
        roomTypeSelect.addEventListener('change', updateBookingPrice);
    }

    // 추가 옵션 변경
    optionCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateBookingPrice);
    });

    // 가격 계산 함수
    const updateBookingPrice = () => {
        let roomPrice = 0;
        let optionPrice = 0;
        let nights = 0;

        // 객실 가격 계산
        if (roomTypeSelect && roomTypeSelect.value) {
            const selectedOption = roomTypeSelect.options[roomTypeSelect.selectedIndex];
            roomPrice = parseInt(selectedOption.getAttribute('data-price')) || 0;
        }

        // 숙박 일수 계산
        if (checkinInput && checkoutInput && checkinInput.value && checkoutInput.value) {
            const checkin = new Date(checkinInput.value);
            const checkout = new Date(checkoutInput.value);
            const diffTime = Math.abs(checkout - checkin);
            nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        }

        // 추가 옵션 가격 계산
        optionCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                const price = parseInt(checkbox.getAttribute('data-price')) || 0;
                if (checkbox.id === 'breakfast') {
                    optionPrice += price * guestCount;
                } else if (checkbox.id === 'pet') {
                    optionPrice += price * guestCount;
                } else {
                    optionPrice += price;
                }
            }
        });

        // 총 가격 계산
        const totalPrice = (roomPrice * nights) + optionPrice;

        // UI 업데이트
        if (roomPriceElement) roomPriceElement.textContent = roomPrice.toLocaleString() + '원';
        if (optionPriceElement) optionPriceElement.textContent = optionPrice.toLocaleString() + '원';
        if (nightCountElement) nightCountElement.textContent = nights + '박';
        if (totalPriceElement) totalPriceElement.textContent = totalPrice.toLocaleString() + '원';
    };

    // 폼 제출
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // 예약 확인 모달 표시
            const bookingModal = document.getElementById('bookingModal');
            const bookingSummary = document.getElementById('bookingSummary');
            
            if (bookingModal && bookingSummary) {
                // 예약 정보 요약 생성
                const summaryHTML = `
                    <div class="summary-item">
                        <strong>체크인:</strong> ${checkinInput.value}
                    </div>
                    <div class="summary-item">
                        <strong>체크아웃:</strong> ${checkoutInput.value}
                    </div>
                    <div class="summary-item">
                        <strong>객실:</strong> ${roomTypeSelect.options[roomTypeSelect.selectedIndex].text}
                    </div>
                    <div class="summary-item">
                        <strong>투숙 인원:</strong> ${guestCount}명
                    </div>
                    <div class="summary-item">
                        <strong>총 결제 금액:</strong> ${totalPriceElement.textContent}
                    </div>
                `;
                
                bookingSummary.innerHTML = summaryHTML;
                bookingModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    }

    // ===== 후기 슬라이더 =====
    const testimonialsTrack = document.getElementById('testimonialsTrack');
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const testimonialPrev = document.getElementById('testimonialPrev');
    const testimonialNext = document.getElementById('testimonialNext');
    const testimonialDots = document.getElementById('testimonialsDots');

    let currentTestimonial = 0;

    if (testimonialItems.length > 0) {
        // 닷 인디케이터 생성
        if (testimonialDots) {
            testimonialItems.forEach((_, index) => {
                const dot = document.createElement('button');
                dot.classList.add('testimonial-dot');
                if (index === 0) dot.classList.add('active');
                dot.addEventListener('click', () => goToTestimonial(index));
                testimonialDots.appendChild(dot);
            });
        }

        function updateTestimonials() {
            testimonialItems.forEach((item, index) => {
                item.classList.remove('active');
                if (index === currentTestimonial) {
                    item.classList.add('active');
                }
            });

            // 닷 업데이트
            const dots = document.querySelectorAll('.testimonial-dot');
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentTestimonial);
            });
        }

        function goToTestimonial(index) {
            currentTestimonial = index;
            updateTestimonials();
        }

        function nextTestimonial() {
            currentTestimonial = (currentTestimonial + 1) % testimonialItems.length;
            updateTestimonials();
        }

        function prevTestimonial() {
            currentTestimonial = (currentTestimonial - 1 + testimonialItems.length) % testimonialItems.length;
            updateTestimonials();
        }

        // 네비게이션 버튼 이벤트
        if (testimonialNext) {
            testimonialNext.addEventListener('click', nextTestimonial);
        }
        if (testimonialPrev) {
            testimonialPrev.addEventListener('click', prevTestimonial);
        }

        // 자동 슬라이드
        setInterval(nextTestimonial, 5000);
    }

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

    // ===== 백투탑 버튼 =====
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
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
    
    // 강화된 패럴랙스 효과
    if (hero && heroContent) {
        const rate = scrolled * -0.7;
        const opacity = Math.max(0, 1 - scrolled / (hero.offsetHeight * 0.6));
        const scale = Math.max(0.95, 1 - scrolled / (hero.offsetHeight * 2));
        
        heroContent.style.transform = `translateY(${rate}px) scale(${scale})`;
        heroContent.style.opacity = opacity;
        hero.style.transform = `translateY(${scrolled * 0.4}px)`;
    }
    
    // 섹션별 패럴랙스
    const sections = document.querySelectorAll('.features, .about, .gallery');
    sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const speed = 0.1 + (index * 0.05);
        
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            const yPos = -(scrolled * speed);
            section.style.transform = `translateY(${yPos}px)`;
        }
    });
    
    // 맨 위로 버튼 표시/숨기기
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        if (scrolled > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }
});

// ===== 맨 위로 버튼 클릭 이벤트 =====
document.addEventListener('DOMContentLoaded', () => {
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});

// ===== 고급 애니메이션 시스템 =====

// 스크롤 트리거 애니메이션
const initScrollAnimations = () => {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // 요소별 애니메이션 클래스 적용
                if (entry.target.classList.contains('feature-card')) {
                    entry.target.classList.add('animate-fade-up');
                } else if (entry.target.classList.contains('gallery-item')) {
                    entry.target.classList.add('animate-scale-in');
                } else if (entry.target.classList.contains('stat-item')) {
                    entry.target.classList.add('animate-zoom-in');
                } else if (entry.target.classList.contains('testimonial-item')) {
                    entry.target.classList.add('animate-slide-up');
                }
            }
        });
    }, observerOptions);

    // 애니메이션 대상 요소들 관찰
    const animateElements = document.querySelectorAll('.feature-card, .gallery-item, .stat-item, .testimonial-item, .animate-on-scroll');
    animateElements.forEach(element => {
        observer.observe(element);
    });
};

// 3D 마우스 추적 효과
const init3DEffects = () => {
    const cards = document.querySelectorAll('.feature-card, .gallery-item, .stat-item');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 15;
            const rotateY = (centerX - x) / 15;
            
            card.style.transform = `
                perspective(1000px) 
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg) 
                translateY(-8px) 
                scale(1.02)
            `;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)';
        });
    });
};

// 마이크로 인터랙션 시스템
const initMicroInteractions = () => {
    // 버튼 리플 효과
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // 폼 입력 애니메이션
    const formInputs = document.querySelectorAll('.form-input, .form-select');
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
    });

    // 카운터 애니메이션
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

    // 통계 카운터 애니메이션
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const number = entry.target;
                const text = number.textContent;
                const target = parseInt(text.replace(/[^0-9]/g, ''));
                const suffix = text.replace(/[0-9]/g, '');
                
                animateCounter(number, target, suffix);
                statsObserver.unobserve(number);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(number => {
        statsObserver.observe(number);
    });
};

// 패럴랙스 효과
const initParallaxEffects = () => {
    const parallaxElements = document.querySelectorAll('.parallax-slow, .parallax-medium, .parallax-fast');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = element.classList.contains('parallax-fast') ? 0.5 :
                         element.classList.contains('parallax-medium') ? 0.3 : 0.1;
            
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
};

// 고급 호버 효과
const initAdvancedHoverEffects = () => {
    // 카드 호버 효과
    const cards = document.querySelectorAll('.feature-card');
    cards.forEach(card => {
        card.classList.add('hover-float');
    });

    // 갤러리 아이템 호버 효과
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.classList.add('hover-glow');
    });

    // 버튼 호버 효과
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.classList.add('hover-shimmer');
    });
};

// 스태거 애니메이션
const initStaggerAnimations = () => {
    const staggerContainers = document.querySelectorAll('.features-grid, .gallery-grid, .stats-grid');
    
    staggerContainers.forEach(container => {
        const items = container.children;
        Array.from(items).forEach((item, index) => {
            item.classList.add('stagger-item');
            item.style.animationDelay = `${index * 0.1}s`;
        });
    });
};

// 텍스트 리빌 애니메이션
const initTextRevealAnimations = () => {
    const textElements = document.querySelectorAll('.hero-title, .hero-subtitle, .section-title');
    
    textElements.forEach(element => {
        element.classList.add('text-reveal');
    });
};

// 페이지 로드 애니메이션
const initPageLoadAnimations = () => {
    // 히어로 섹션 애니메이션
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroButtons = document.querySelector('.hero-buttons');
    
    if (heroTitle) {
        setTimeout(() => heroTitle.classList.add('animate-fade-up'), 500);
    }
    if (heroSubtitle) {
        setTimeout(() => heroSubtitle.classList.add('animate-fade-up'), 700);
    }
    if (heroButtons) {
        setTimeout(() => heroButtons.classList.add('animate-fade-up'), 900);
    }
};

// 애니메이션 성능 최적화
const optimizeAnimations = () => {
    // GPU 가속 활성화
    const animatedElements = document.querySelectorAll('.animate-on-scroll, .animate-on-hover, .animate-on-load');
    animatedElements.forEach(element => {
        element.style.willChange = 'transform, opacity, filter';
        element.style.backfaceVisibility = 'hidden';
        element.style.transformStyle = 'preserve-3d';
    });
};