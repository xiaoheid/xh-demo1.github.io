/**
 * PetVet Pharma - GSAP Scroll Animations
 * Professional scroll-triggered animations for immersive storytelling
 */

// 注册 ScrollTrigger 插件
gsap.registerPlugin(ScrollTrigger);

class AnimationController {
    constructor() {
        this.init();
    }

    init() {
        // 等待 DOM 加载完成
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupAnimations());
        } else {
            this.setupAnimations();
        }
    }

    setupAnimations() {
        this.heroAnimations();
        this.timelineAnimations();
        this.breakthroughAnimations();
        this.productAnimations();
        this.visionAnimations();
        this.scrollProgress();
        this.sectionNav();
    }

    // ==================== Hero Section Animations ====================
    heroAnimations() {
        // Logo 动画
        gsap.from('.hero-logo .logo-icon', {
            opacity: 0,
            scale: 0.5,
            duration: 1,
            ease: 'power2.out'
        });

        // 标题字符逐个入场
        gsap.to('.hero-title .char', {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.05,
            ease: 'power2.out',
            delay: 0.5
        });

        // 副标题淡入
        gsap.to('.hero-subtitle', {
            opacity: 1,
            duration: 0.8,
            delay: 1.2,
            ease: 'power2.out'
        });

        // CTA 按钮
        gsap.to('.hero-cta', {
            opacity: 1,
            duration: 0.8,
            delay: 1.5,
            ease: 'power2.out'
        });

        // 滚动指示器
        gsap.from('.scroll-indicator', {
            opacity: 0,
            y: 20,
            duration: 0.5,
            delay: 2,
            ease: 'power2.out'
        });
    }

    // ==================== Timeline Animations ====================
    timelineAnimations() {
        // 时间线线条生长
        gsap.from('.timeline-line', {
            scaleY: 0,
            duration: 1.5,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.timeline',
                start: 'top 80%',
                end: 'bottom 60%',
                scrub: 1
            }
        });

        // 时间节点入场
        gsap.utils.toArray('.timeline-item').forEach((item, i) => {
            const isEven = i % 2 === 1;

            gsap.to(item, {
                opacity: 1,
                x: 0,
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: item,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            });

            // 标记点脉冲效果
            const marker = item.querySelector('.timeline-marker');
            gsap.from(marker, {
                scale: 0,
                opacity: 0,
                duration: 0.5,
                ease: 'back.out(1.7)',
                scrollTrigger: {
                    trigger: item,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            });
        });

        // 数字计数动画
        this.counterAnimations('.stat-number', '.stats-row');
    }

    // ==================== Breakthrough Animations ====================
    breakthroughAnimations() {
        // 卡片交错入场
        gsap.utils.toArray('.breakthrough-card').forEach((card, i) => {
            gsap.to(card, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                delay: i * 0.1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.breakthrough-grid',
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            });
        });

        // 研究亮点区域
        gsap.from('.research-highlight', {
            opacity: 0,
            y: 50,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.research-highlight',
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        });

        // 计数动画
        this.counterAnimations('.h-stat-value', '.highlight-stats');
    }

    // ==================== Product Animations ====================
    productAnimations() {
        // 产品卡片入场
        gsap.utils.toArray('.product-card').forEach((card, i) => {
            gsap.to(card, {
                opacity: 1,
                y: 0,
                duration: 0.5,
                delay: i * 0.05,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.products-grid',
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            });
        });

        // 产品卡片 hover 效果增强 - 3D 倾斜
        const cards = document.querySelectorAll('.product-card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 20;
                const rotateY = -(x - centerX) / 20;

                gsap.to(card, {
                    rotateX: rotateX,
                    rotateY: rotateY,
                    duration: 0.3,
                    ease: 'power2.out',
                    transformPerspective: 1000
                });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    rotateX: 0,
                    rotateY: 0,
                    duration: 0.5,
                    ease: 'power2.out'
                });
            });
        });
    }

    // ==================== Vision Animations ====================
    visionAnimations() {
        // 引用区域
        gsap.from('.vision-quote', {
            opacity: 0,
            x: -50,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.vision-quote',
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        });

        // 价值观图标
        gsap.utils.toArray('.value-item').forEach((item, i) => {
            gsap.from(item, {
                opacity: 0,
                y: 20,
                duration: 0.5,
                delay: i * 0.15,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.vision-values',
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            });
        });

        // 联系区域
        gsap.from('.contact-section', {
            opacity: 0,
            x: 50,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.contact-section',
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        });
    }

    // ==================== Counter Animations ====================
    counterAnimations(selector, trigger) {
        gsap.utils.toArray(selector).forEach(counter => {
            const target = parseInt(counter.dataset.target);

            ScrollTrigger.create({
                trigger: trigger,
                start: 'top 85%',
                onEnter: () => {
                    gsap.to(counter, {
                        innerHTML: target,
                        duration: 2,
                        snap: { innerHTML: 1 },
                        ease: 'power2.out'
                    });
                },
                onLeaveBack: () => {
                    counter.innerHTML = '0';
                }
            });
        });
    }

    // ==================== Scroll Progress ====================
    scrollProgress() {
        gsap.to('.scroll-progress-bar', {
            width: '100%',
            ease: 'none',
            scrollTrigger: {
                trigger: 'body',
                start: 'top top',
                end: 'bottom bottom',
                scrub: 0.3
            }
        });
    }

    // ==================== Section Navigation ====================
    sectionNav() {
        const sections = ['hero', 'origin', 'breakthrough', 'products', 'vision'];
        const navDots = document.querySelectorAll('.nav-dot');

        sections.forEach((sectionId, i) => {
            ScrollTrigger.create({
                trigger: `#${sectionId}`,
                start: 'top center',
                end: 'bottom center',
                onEnter: () => this.updateNavDot(navDots, i),
                onEnterBack: () => this.updateNavDot(navDots, i)
            });

            // 点击导航跳转
            navDots[i].addEventListener('click', () => {
                gsap.to(window, {
                    scrollTo: `#${sectionId}`,
                    duration: 1,
                    ease: 'power2.inOut'
                });
            });
        });
    }

    updateNavDot(dots, activeIndex) {
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === activeIndex);
        });
    }
}

// 初始化动画控制器
new AnimationController();