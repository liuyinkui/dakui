let lastScrollY = window.scrollY;
const nav = document.querySelector('nav');

// 页面加载时显示导航
if (nav) nav.classList.remove('nav-hidden');

// 控制导航背景显示
window.addEventListener('scroll', () => {
    if (!nav) return;
    
    // 控制导航背景显示
    if (window.scrollY > 100) {
        nav.classList.add('nav-visible');
    } else {
        nav.classList.remove('nav-visible');
    }
    
    // 控制导航显示/隐藏
    if (window.scrollY > lastScrollY) {
        // 向下滚动，隐藏导航
        nav.classList.add('nav-hidden');
    } else if (window.scrollY < lastScrollY) {
        // 向上滚动，显示导航
        nav.classList.remove('nav-hidden');
    }
    lastScrollY = window.scrollY;
});

// 移动端菜单开关
const navToggle = document.querySelector('.nav-toggle');
const mobileNavMenu = document.querySelector('.mobile-nav-menu');
const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
const mobileNavClose = document.querySelector('.mobile-nav-close');

function closeMobileNav() {
    document.body.classList.remove('mobile-nav-open');
}
function openMobileNav() {
    document.body.classList.add('mobile-nav-open');
}
if (navToggle && mobileNavMenu && mobileNavOverlay) {
    navToggle.addEventListener('click', () => {
        if (document.body.classList.contains('mobile-nav-open')) {
            closeMobileNav();
        } else {
            openMobileNav();
        }
    });
    mobileNavOverlay.addEventListener('click', closeMobileNav);
    // 点击菜单内链接也关闭菜单
    mobileNavMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMobileNav);
    });
}
if (mobileNavClose) {
    mobileNavClose.addEventListener('click', closeMobileNav);
}

// 自定义圆形鼠标指针
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
document.body.appendChild(cursor);

// 视频轮播功能
let currentVideoIndex = 0;
const totalVideos = 3;
let isInHeroSection = true;
let scrollCount = 0;
const heroSection = document.querySelector('.hero');

function switchVideo(direction = 'next') {
    const videos = document.querySelectorAll('.hero-video');
    const currentVideoSpan = document.querySelector('.current-video');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    // 隐藏当前视频
    videos[currentVideoIndex].classList.remove('active');
    videos[currentVideoIndex].pause();
    
    // 根据方向切换视频
    if (direction === 'next') {
        currentVideoIndex = (currentVideoIndex + 1) % totalVideos;
    } else {
        currentVideoIndex = currentVideoIndex === 0 ? totalVideos - 1 : currentVideoIndex - 1;
    }
    
    // 显示新视频
    videos[currentVideoIndex].classList.add('active');
    videos[currentVideoIndex].play();
    
    // 更新指示器
    if (currentVideoSpan) {
        currentVideoSpan.textContent = currentVideoIndex + 1;
    }
    
    // 更新按钮状态
    updateButtonStates();
}

function updateButtonStates() {
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    // 这里可以根据需要禁用按钮，比如在第一个视频时禁用prev按钮
    // 目前保持所有按钮可用，实现循环切换
}

// 添加按钮点击事件
document.addEventListener('DOMContentLoaded', () => {
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            switchVideo('prev');
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            switchVideo('next');
        });
    }
    
    // 初始化按钮状态
    updateButtonStates();
});

// 监听滚轮事件
window.addEventListener('wheel', (e) => {
    if (!heroSection) return;
    
    const heroRect = heroSection.getBoundingClientRect();
    const isInHero = heroRect.top <= 0 && heroRect.bottom >= window.innerHeight;
    
    if (isInHero && e.deltaY > 0) {
        // 向下滚动
        e.preventDefault();
        scrollCount++;
        
        if (scrollCount <= totalVideos - 1) {
            switchVideo('next');
        } else {
            // 允许继续向下滚动到页面其他部分
            isInHeroSection = false;
        }
    }
});

// 监听滚动事件，重置状态
window.addEventListener('scroll', () => {
    if (!heroSection) return;
    
    const heroRect = heroSection.getBoundingClientRect();
    if (heroRect.top > 0) {
        // 回到hero区域顶部时重置
        isInHeroSection = true;
        scrollCount = 0;
        currentVideoIndex = 0;
        
        const videos = document.querySelectorAll('.hero-video');
        const currentVideoSpan = document.querySelector('.current-video');
        
        // 重置到第一个视频
        videos.forEach((video, index) => {
            if (index === 0) {
                video.classList.add('active');
                video.play();
            } else {
                video.classList.remove('active');
                video.pause();
            }
        });
        
        if (currentVideoSpan) {
            currentVideoSpan.textContent = '1';
        }
    }
});

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});
// 可选：在鼠标移出窗口时隐藏指针
window.addEventListener('mouseout', () => {
    cursor.style.opacity = 0;
});
window.addEventListener('mouseover', () => {
    cursor.style.opacity = 1;
});

// 鼠标经过可交互元素时指针放大
const hoverTargets = document.querySelectorAll('a, button, img, input, .work-item');
hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('cursor-large');
    });
    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('cursor-large');
    });
}); 