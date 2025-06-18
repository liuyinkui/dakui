// 导航栏滚动效果
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// 平滑滚动
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

// 作品展示动画
const workItems = document.querySelectorAll('.work-item');
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

workItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(item);
});

// 客户评价轮播
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial-item');
const testimonialSlider = document.querySelector('.testimonials-slider');

function showTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
        testimonial.style.display = i === index ? 'block' : 'none';
    });
}

function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
}

// 自动轮播
setInterval(nextTestimonial, 5000);

// 初始化显示第一个评价
showTestimonial(0);

// 页面加载动画
document.addEventListener('DOMContentLoaded', () => {
    const hero = document.querySelector('.hero');
    hero.style.opacity = '0';
    hero.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        hero.style.transition = 'opacity 1s ease, transform 1s ease';
        hero.style.opacity = '1';
        hero.style.transform = 'translateY(0)';
    }, 100);
});

// 视差滚动效果
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax');
    
    parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// 示例项目数据
const projects = [
    {
        title: '品牌设计项目',
        description: '为某科技公司设计的品牌视觉系统',
        image: 'images/project1.jpg'
    },
    {
        title: 'UI设计项目',
        description: '移动应用界面设计',
        image: 'images/project2.jpg'
    },
    {
        title: '网页设计项目',
        description: '响应式企业网站设计',
        image: 'images/project3.jpg'
    }
];

// 动态加载项目
function loadProjects() {
    const projectGrid = document.querySelector('.project-grid');
    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.innerHTML = `
            <img src="${project.image}" alt="${project.title}">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
        `;
        projectGrid.appendChild(projectCard);
    });
}

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    loadProjects();
});
