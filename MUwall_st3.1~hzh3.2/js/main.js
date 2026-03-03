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
});