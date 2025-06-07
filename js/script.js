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

/* ======================
   侧边栏功能
   ====================== */

// 打开侧边栏
function openSidebar() {
    sidebar.classList.add('active');
    sidebarOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// 关闭侧边栏
function closeSidebar() {
    sidebar.classList.remove('active');
    sidebarOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

// 点击按钮切换侧边栏
sidebarToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    if (sidebar.classList.contains('active')) {
        closeSidebar();
    } else {
        openSidebar();
    }
});

// 点击遮罩层关闭侧边栏
sidebarOverlay.addEventListener('click', closeSidebar);

// 阻止侧边栏内部点击事件冒泡
sidebar.addEventListener('click', (e) => {
    e.stopPropagation();
});

// 窗口大小变化时重置侧边栏
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        closeSidebar();
    }
});

/* ======================
   导航菜单功能
   ====================== */

// 点击菜单按钮切换导航栏
menuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    navLinks.classList.toggle('active');
    
    // 如果侧边栏是打开的，先关闭它
    if (sidebar.classList.contains('active')) {
        closeSidebar();
    }
});

// 点击页面其他位置关闭导航栏
document.addEventListener('click', (e) => {
    if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
    }
});

/* ======================
   PDF查看功能
   ====================== */

function showPdf(pdfUrl) {
    pdfViewer.querySelector('iframe').src = pdfUrl;
    pdfViewer.classList.add('active');
    pdfViewer.scrollIntoView({ behavior: 'smooth' });
    
    // 移动端下关闭侧边栏
    if (window.innerWidth <= 768 && sidebar.classList.contains('active')) {
        closeSidebar();
    }
}

// PDF链接点击事件
pdfLink1.addEventListener('click', (e) => {
    e.preventDefault();
    showPdf('./LaTeX/Wfun.pdf');
});

pdfLink2.addEventListener('click', (e) => {
    e.preventDefault();
    showPdf('sample2.pdf');
});

/* ======================
   其他功能
   ====================== */

// 平滑滚动（用于锚点链接）
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
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