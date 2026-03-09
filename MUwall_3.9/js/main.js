// js/main.js

window.addEventListener('DOMContentLoaded', () => {
    console.log('MUwall 模块化系统启动...');
    
    // 严格控制启动顺序
    if (typeof initRouter === 'function') initRouter();
    if (typeof initModals === 'function') initModals();
    if (typeof initPosts === 'function') initPosts();
    
    // 默认模拟登录
    if (typeof updateUserInfo === 'function') {
        updateUserInfo('小明同学');
    }

    // 初始化侧边栏抽屉逻辑
    initSidebarDrawer();
});

function initSidebarDrawer() {
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const drawerSidebar = document.getElementById('drawer-sidebar');
    const sidebarOverlay = document.getElementById('sidebar-overlay');

    if (sidebarToggle && drawerSidebar && sidebarOverlay) {
        // 点击汉堡按钮打开/关闭侧边栏
        sidebarToggle.addEventListener('click', () => {
            drawerSidebar.classList.toggle('open');
            sidebarOverlay.classList.toggle('show');
        });

        // 点击遮罩层关闭侧边栏
        sidebarOverlay.addEventListener('click', () => {
            drawerSidebar.classList.remove('open');
            sidebarOverlay.classList.remove('show');
        });

        // 点击侧边栏内的链接后自动收起（仅在移动端或小屏幕需要，但为了统一体验可以加上）
        const sidebarLinks = drawerSidebar.querySelectorAll('a');
        sidebarLinks.forEach(link => {
            link.addEventListener('click', () => {
                drawerSidebar.classList.remove('open');
                sidebarOverlay.classList.remove('show');
            });
        });
    }
}