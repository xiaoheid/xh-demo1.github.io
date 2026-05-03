/**
 * PetVet Pharma - Main Entry Point
 * Handles general functionality and interactions
 */

class MainController {
    constructor() {
        this.init();
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    setup() {
        this.smoothScroll();
        this.productFilter();
        this.ctaButtons();
        this.parallaxEffect();
        this.textEffects();
    }

    // ==================== Smooth Scroll ====================
    smoothScroll() {
        // CTA 滚动按钮
        const ctaBtn = document.querySelector('.hero-cta .btn-primary');
        if (ctaBtn) {
            ctaBtn.addEventListener('click', () => {
                const originSection = document.getElementById('origin');
                if (originSection) {
                    originSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        }

        // 滚动指示器点击
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            scrollIndicator.addEventListener('click', () => {
                const originSection = document.getElementById('origin');
                if (originSection) {
                    originSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        }
    }

    // ==================== Product Filter ====================
    productFilter() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const productCards = document.querySelectorAll('.product-card');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // 更新按钮状态
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const category = btn.dataset.category;

                productCards.forEach(card => {
                    const cardCategory = card.dataset.category;

                    if (category === 'all' || cardCategory === category) {
                        gsap.to(card, {
                            opacity: 1,
                            scale: 1,
                            duration: 0.4,
                            ease: 'power2.out'
                        });
                        card.style.display = 'block';
                    } else {
                        gsap.to(card, {
                            opacity: 0,
                            scale: 0.8,
                            duration: 0.3,
                            ease: 'power2.in',
                            onComplete: () => {
                                card.style.display = 'none';
                            }
                        });
                    }
                });
            });
        });
    }

    // ==================== CTA Buttons ====================
    ctaButtons() {
        // 商务合作按钮
        const contactBtn = document.querySelector('.contact-section .btn-primary');
        if (contactBtn) {
            contactBtn.addEventListener('click', () => {
                // 这里可以添加表单弹窗或邮件链接
                // 示例：mailto 链接
                const email = 'contact@petvetpharma.com';
                window.location.href = `mailto:${email}?subject=商务合作咨询`;
            });
        }
    }

    // ==================== Parallax Effect ====================
    parallaxEffect() {
        // 为特定元素添加视差效果
        gsap.utils.toArray('.section-header').forEach(header => {
            gsap.to(header, {
                y: -30,
                ease: 'none',
                scrollTrigger: {
                    trigger: header.parentElement,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                }
            });
        });

        // 研究区域的视差
        const highlightVisual = document.querySelector('.highlight-visual');
        if (highlightVisual) {
            gsap.to(highlightVisual, {
                y: -20,
                ease: 'none',
                scrollTrigger: {
                    trigger: '.research-highlight',
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                }
            });
        }
    }

    // ==================== Text Effects ====================
    textEffects() {
        // 标题 hover 效果 - 渐变流动
        const titles = document.querySelectorAll('.section-title');
        titles.forEach(title => {
            title.addEventListener('mouseenter', () => {
                gsap.to(title, {
                    backgroundPosition: '200% center',
                    duration: 1,
                    ease: 'none'
                });
            });

            title.addEventListener('mouseleave', () => {
                gsap.to(title, {
                    backgroundPosition: '0% center',
                    duration: 1,
                    ease: 'none'
                });
            });
        });

        // 引用文字打字机效果
        const quoteBlock = document.querySelector('.vision-quote blockquote');
        if (quoteBlock) {
            ScrollTrigger.create({
                trigger: quoteBlock,
                start: 'top 85%',
                onEnter: () => {
                    const text = quoteBlock.innerHTML;
                    quoteBlock.innerHTML = '';

                    let i = 0;
                    const typeWriter = () => {
                        if (i < text.length) {
                            // 处理 HTML 标签
                            if (text.charAt(i) === '<') {
                                const tagEnd = text.indexOf('>', i);
                                quoteBlock.innerHTML += text.substring(i, tagEnd + 1);
                                i = tagEnd + 1;
                            } else {
                                quoteBlock.innerHTML += text.charAt(i);
                                i++;
                            }
                            setTimeout(typeWriter, 30);
                        }
                    };
                    typeWriter();
                },
                onLeaveBack: () => {
                    quoteBlock.innerHTML = quoteBlock.dataset.original || '';
                }
            });

            // 保存原始内容
            quoteBlock.dataset.original = quoteBlock.innerHTML;
        }
    }
}

// ==================== Utility Functions ====================

// 检测是否为移动设备
function isMobile() {
    return window.innerWidth < 768;
}

// 检测是否支持 reduced-motion
function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// ==================== Performance Optimization ====================

// 移动端优化 - 减少动画复杂度
if (isMobile()) {
    // 禁用某些复杂动画
    document.documentElement.classList.add('mobile-optimize');
}

// Reduced motion 优化
if (prefersReducedMotion()) {
    document.documentElement.classList.add('reduced-motion');
}

// ==================== Initialize ====================
new MainController();

// 页面加载完成后的处理
window.addEventListener('load', () => {
    // 移除加载状态（如果有）
    document.body.classList.remove('loading');

    // 确保所有动画已初始化
    ScrollTrigger.refresh();
});

// 窗口大小变化时刷新
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh();
    }, 250);
});