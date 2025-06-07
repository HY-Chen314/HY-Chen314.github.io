// 侧边栏相关元素
const sidebarToggle = document.getElementById('sidebarToggle');
const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');

// 导航菜单相关元素
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

// PDF查看器相关元素
const pdfViewer = document.getElementById('pdfViewer');
const pdfLink1 = document.getElementById('pdfLink1');
const pdfLink2 = document.getElementById('pdfLink2');

// 互斥锁变量
let isSidebarOpen = false;
let isNavOpen = false;

/* ======================
   侧边栏功能
   ====================== */

function openSidebar() {
    sidebar.classList.add('active');
    sidebarOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    isSidebarOpen = true;
}

function closeSidebar() {
    sidebar.classList.remove('active');
    sidebarOverlay.classList.remove('active');
    document.body.style.overflow = '';
    isSidebarOpen = false;
}

sidebarToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    if (isSidebarOpen) {
        closeSidebar();
    } else {
        openSidebar();
    }
});

sidebarOverlay.addEventListener('click', closeSidebar);

sidebar.addEventListener('click', (e) => {
    e.stopPropagation();
});

/* ======================
   导航菜单功能
   ====================== */

function openNav() {
    // 关闭侧边栏如果它是打开的
    if (isSidebarOpen) {
        closeSidebar();
    }
    
    navLinks.classList.add('active');
    isNavOpen = true;
}

function closeNav() {
    navLinks.classList.remove('active');
    isNavOpen = false;
}

menuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    if (isNavOpen) {
        closeNav();
    } else {
        openNav();
    }
});

document.addEventListener('click', (e) => {
    if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
        closeNav();
    }
});

/* ======================
   PDF查看功能
   ====================== */

function showPdf(pdfUrl) {
    pdfViewer.querySelector('iframe').src = pdfUrl;
    pdfViewer.classList.add('active');
    pdfViewer.scrollIntoView({ behavior: 'smooth' });
    
    // 如果是移动端且侧边栏打开，则关闭它
    if (window.innerWidth <= 768 && isSidebarOpen) {
        closeSidebar();
    }
}

pdfLink1.addEventListener('click', (e) => {
    e.preventDefault();
    showPdf('./LaTeX/Wfun.pdf');
});

pdfLink2.addEventListener('click', (e) => {
    e.preventDefault();
    showPdf('sample2.pdf');
});

/* ======================
   窗口大小变化处理
   ====================== */

window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        // 在桌面端强制关闭所有移动菜单
        closeSidebar();
        closeNav();
    }
});

/* ======================
   其他功能
   ====================== */

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// 页面加载动画
document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.hero-content h1, .hero-content p, .article-card');
    elements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
});