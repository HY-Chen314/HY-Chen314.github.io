// 侧边栏相关元素
const sidebarToggle = document.getElementById('sidebarToggle');
const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');

// 导航菜单相关元素
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

// 状态变量
let isSidebarOpen = false;
let isNavOpen = false;

/* ======================
增强的互斥禁用功能
====================== */

function openSidebar() {
 // 关闭导航菜单如果它是打开的
 if (isNavOpen) {
     closeNav();
 }
 
 sidebar.classList.add('active');
 sidebarOverlay.classList.add('active');
 document.body.style.overflow = 'hidden';
 isSidebarOpen = true;
 
 // 禁用菜单按钮
 menuToggle.disabled = true;
 menuToggle.classList.add('disabled');
}

function closeSidebar() {
 sidebar.classList.remove('active');
 sidebarOverlay.classList.remove('active');
 document.body.style.overflow = '';
 isSidebarOpen = false;
 
 // 启用菜单按钮
 menuToggle.disabled = false;
 menuToggle.classList.remove('disabled');
}

function openNav() {
 // 关闭侧边栏如果它是打开的
 document.body.classList.add('menu-open');
 if (isSidebarOpen) {
     closeSidebar();
 }
 
 navLinks.classList.add('active');
 isNavOpen = true;
 
 // 禁用侧边栏按钮
 sidebarToggle.disabled = true;
 sidebarToggle.classList.add('disabled');
}

function closeNav() {
 navLinks.classList.remove('active');
 document.body.classList.remove('menu-open');
 isNavOpen = false;
 
 // 启用侧边栏按钮
 sidebarToggle.disabled = false;
 sidebarToggle.classList.remove('disabled');
 // 在禁用按钮时也要设置 aria-disabled
button.disabled = true;
button.setAttribute('aria-disabled', 'true');

// 启用时
button.disabled = false;
button.setAttribute('aria-disabled', 'false');
}
/* ======================
   按钮事件处理
   ====================== */

// 侧边栏按钮点击
sidebarToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    if (isSidebarOpen) {
        closeSidebar();
    } else {
        openSidebar();
    }
});

// 菜单按钮点击
menuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    if (isNavOpen) {
        closeNav();
    } else {
        openNav();
    }
});

// 点击遮罩层关闭侧边栏
sidebarOverlay.addEventListener('click', closeSidebar);

// 点击页面其他区域关闭导航菜单
document.addEventListener('click', (e) => {
    if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
        closeNav();
    }
});

// 侧边栏内部点击不冒泡
sidebar.addEventListener('click', (e) => {
    e.stopPropagation();
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
// 移动端按钮控制（确保在DOM加载后执行）
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.sidebar-toggle, .menu-toggle');
    
    buttons.forEach(button => {
        // 添加触摸反馈
        button.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        button.addEventListener('touchend', function() {
            this.style.transform = '';
        });
    });
});