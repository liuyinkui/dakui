// 导航栏滚动效果
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    } else {
        navbar.style.background = '#ffffff';
    }
});

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
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
