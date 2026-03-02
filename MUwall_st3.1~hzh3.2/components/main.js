// components/main.js

window.addEventListener('DOMContentLoaded', () => {
    console.log('DOM已加载, MUwall系统启动...');
    
    // 1. 初始化导航与多语言 (Calls function from router.js)
    if (typeof initRouter === 'function') {
        initRouter();
    }

    // 2. 模拟登录状态 (Calls function from components.js)
    if (typeof simulateLogin === 'function') {
        simulateLogin(); 
    }

    // 3. 绑定静态UI事件 (Calls functions from components.js)
    if (typeof bindCommentToggleEvents === 'function') {
        bindCommentToggleEvents();
        bindReplyEvents();
        bindLikeEvents();
    }
});