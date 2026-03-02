// 多語言字典 (完整合併版)
const translations = {
    'zh-cn': {
        // 导航栏
        nav_subtitle: "香港都会大学校园论坛",
        nav_home: "首页",
        nav_categories: "分类",
        nav_search: "搜索",
        nav_profile: "个人中心",
        nav_login: "登录/注册",
        toggle_btn: "简体中文",

        // 侧边栏与按钮
        side_categories: "分类导航",
        cat_all: "全部",
        cat_share: "校园分享",
        cat_help: "学习求助",
        cat_life: "生活日常",
        cat_news: "校园资讯",
        cat_qna: "提问解答",
        side_hot: "热门话题",
        hot_1: "期末考试复习资料分享",
        hot_2: "校园活动报名通知",
        hot_3: "寻找自习室搭档",
        btn_create_post: "发布帖子"
    },
    zh: {
        // 導航欄
        nav_subtitle: "香港都會大學校園論壇",
        nav_home: "首頁",
        nav_categories: "分類",
        nav_search: "搜索",
        nav_profile: "個人中心",
        nav_login: "登錄/註冊",
        toggle_btn: "繁體中文",

        // 側邊欄與按鈕
        side_categories: "分類導航",
        cat_all: "全部",
        cat_share: "校園分享",
        cat_help: "學習求助",
        cat_life: "生活日常",
        cat_news: "校園資訊",
        cat_qna: "提問解答",
        side_hot: "熱門話題",
        hot_1: "期末考試複習資料分享",
        hot_2: "校園活動報名通知",
        hot_3: "尋找自習室搭檔",
        btn_create_post: "發布帖子"
    },
    en: {
        // Navigation
        nav_subtitle: "HKMU Campus Forum",
        nav_home: "Home",
        nav_categories: "Categories",
        nav_search: "Search",
        nav_profile: "Profile",
        nav_login: "Login / Register",
        toggle_btn: "English",

        // Sidebar & Buttons
        side_categories: "Categories",
        cat_all: "All",
        cat_share: "Campus Share",
        cat_help: "Study Help",
        cat_life: "Daily Life",
        cat_news: "Campus News",
        cat_qna: "Q&A",
        side_hot: "Hot Topics",
        hot_1: "Final Exam Review Materials",
        hot_2: "Campus Activity Registration",
        hot_3: "Study Room Partner Search",
        btn_create_post: "Create Post"
    }
};

let currentLang = 'zh'; // 当前语言状态
// DOM元素选择
const loginBtn = document.getElementById('login-btn');
const loginModal = document.getElementById('login-modal');
const createPostBtn = document.getElementById('create-post');
const postModal = document.getElementById('post-modal');
const closeButtons = document.querySelectorAll('.close');
const tabBtns = document.querySelectorAll('.tab-btn');
const filterBtns = document.querySelectorAll('.filter-btn');
const actionBtns = document.querySelectorAll('.action-btn');

// 模态框控制
function openModal(modal) {
    modal.style.display = 'block';
}

function closeModal(modal) {
    modal.style.display = 'none';
}

// 登录/注册按钮点击事件
if (loginBtn) {
    loginBtn.addEventListener('click', openLoginModal);
}

// 发布帖子按钮点击事件
if (createPostBtn) {
    createPostBtn.addEventListener('click', () => {
        openModal(postModal);
    });
}

// 关闭按钮点击事件
closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal');
        closeModal(modal);
    });
});

// 点击模态框外部关闭
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        closeModal(e.target);
    }
});

// 标签页切换
if (tabBtns.length > 0) {
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // 移除所有标签页按钮的active类
            tabBtns.forEach(b => b.classList.remove('active'));
            // 添加当前按钮的active类
            btn.classList.add('active');
            
            // 隐藏所有标签页内容
            const tabContents = document.querySelectorAll('.tab-content');
            tabContents.forEach(content => content.style.display = 'none');
            
            // 显示当前标签页内容
            const tabId = btn.getAttribute('data-tab');
            document.getElementById(`${tabId}-tab`).style.display = 'block';
        });
    });
}

// 筛选按钮点击事件
if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // 这里可以添加筛选逻辑
            console.log('筛选方式:', btn.textContent);
        });
    });
}

// 帖子操作按钮点击事件
if (actionBtns.length > 0) {
    actionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const action = btn.querySelector('i').classList[1];
            const countElement = btn.querySelector('span');
            
            if (action === 'fa-thumbs-up') {
                // 点赞功能
                if (btn.classList.contains('liked')) {
                    btn.classList.remove('liked');
                    countElement.textContent = parseInt(countElement.textContent) - 1;
                } else {
                    btn.classList.add('liked');
                    countElement.textContent = parseInt(countElement.textContent) + 1;
                }
            } else if (action === 'fa-comment') {
                // 评论功能
                const post = btn.closest('.post');
                const commentsSection = post.querySelector('.post-comments');
                commentsSection.style.display = commentsSection.style.display === 'none' ? 'block' : 'block';
            } else if (action === 'fa-share') {
                // 分享功能
                alert('分享功能已触发');
            }
        });
    });
}

// 评论发送按钮点击事件
const commentButtons = document.querySelectorAll('.comment-input button');
commentButtons.forEach(button => {
    button.addEventListener('click', () => {
        const input = button.previousElementSibling;
        const commentText = input.value.trim();
        const post = button.closest('.post');
        const commentsSection = post.querySelector('.post-comments');
        const commentList = commentsSection.querySelector('.comment-list') || commentsSection;
        
        if (commentText) {
            // 创建新评论元素
            const newComment = document.createElement('div');
            newComment.className = 'comment';
            newComment.innerHTML = `
                <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=user%20avatar%20portrait%20friendly&image_size=square" alt="用户头像">
                <div class="comment-content">
                    <h5>当前用户</h5>
                    <span class="comment-time">刚刚</span>
                    <p>${commentText}</p>
                    <div class="comment-actions">
                        <button class="reply-btn">回复</button>
                        <button class="like-btn">点赞</button>
                        <span class="like-count">0</span>
                    </div>
                    <div class="reply-input" style="display: none;">
                        <input type="text" placeholder="回复评论...">
                        <button>发送</button>
                    </div>
                    <div class="replies" style="display: none;"></div>
                </div>
            `;
            
            // 插入新评论到评论列表
            const commentInput = commentsSection.querySelector('.comment-input');
            commentsSection.insertBefore(newComment, commentInput);
            
            // 清空输入框
            input.value = '';
            
            // 绑定回复按钮事件
            bindReplyEvents();
            
            // 绑定点赞按钮事件
            bindLikeEvents();
        }
    });
});

// 绑定回复按钮事件
function bindReplyEvents() {
    const replyBtns = document.querySelectorAll('.reply-btn');
    replyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const replyInput = btn.closest('.comment-content').querySelector('.reply-input');
            replyInput.style.display = replyInput.style.display === 'none' ? 'flex' : 'none';
            
            // 绑定回复发送按钮事件
            const replySendBtn = replyInput.querySelector('button');
            replySendBtn.addEventListener('click', () => {
                const input = replyInput.querySelector('input');
                const replyText = input.value.trim();
                const commentContent = btn.closest('.comment-content');
                const repliesContainer = commentContent.querySelector('.replies');
                const targetUserName = commentContent.querySelector('h5').textContent;
                
                if (replyText) {
                    // 创建新回复元素
                    const newReply = document.createElement('div');
                    newReply.className = 'comment reply';
                    newReply.innerHTML = `
                        <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=user%20avatar%20portrait%20friendly&image_size=square" alt="用户头像">
                        <div class="comment-content">
                            <h5>当前用户</h5>
                            <span class="comment-time">刚刚</span>
                            <p><span class="reply-to">回复 ${targetUserName}：</span>${replyText}</p>
                            <div class="comment-actions">
                                <button class="reply-btn">回复</button>
                                <button class="like-btn">点赞</button>
                                <span class="like-count">0</span>
                            </div>
                            <div class="reply-input" style="display: none;">
                                <input type="text" placeholder="回复评论...">
                                <button>发送</button>
                            </div>
                            <div class="replies" style="display: none;"></div>
                        </div>
                    `;
                    
                    // 显示回复容器并插入新回复
                    repliesContainer.style.display = 'block';
                    repliesContainer.appendChild(newReply);
                    
                    // 清空输入框并隐藏
                    input.value = '';
                    replyInput.style.display = 'none';
                    
                    // 重新绑定回复按钮事件，确保新回复也可以被回复
                    bindReplyEvents();
                    // 绑定新回复的点赞按钮事件
                    bindLikeEvents();
                }
            });
        });
    });
}

// 绑定点赞按钮事件
function bindLikeEvents() {
    const likeBtns = document.querySelectorAll('.like-btn');
    likeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const likeCount = btn.nextElementSibling;
            if (btn.classList.contains('liked')) {
                btn.classList.remove('liked');
                likeCount.textContent = parseInt(likeCount.textContent) - 1;
            } else {
                btn.classList.add('liked');
                likeCount.textContent = parseInt(likeCount.textContent) + 1;
            }
        });
    });
}

// 绑定评论展开/收起事件
function bindCommentToggleEvents() {
    const commentBtns = document.querySelectorAll('.action-btn');
    commentBtns.forEach(btn => {
        if (btn.querySelector('i').classList.contains('fa-comment')) {
            btn.addEventListener('click', () => {
                const post = btn.closest('.post');
                const commentsSection = post.querySelector('.post-comments');
                commentsSection.style.display = commentsSection.style.display === 'none' ? 'block' : 'none';
            });
        }
    });
}

// 表单提交事件
const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = loginForm.querySelector('input[type="text"]').value;
        const password = loginForm.querySelector('input[type="password"]').value;
        
        if (username && password) {
            // 这里可以添加登录逻辑
            console.log('登录信息:', { username, password });
            closeModal(loginModal);
            alert('登录成功');
            
            // 更新用户信息显示
            updateUserInfo(username);
        } else {
            alert('请填写账号和密码');
        }
    });
}

const registerForm = document.getElementById('register-form');
if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = registerForm.querySelectorAll('input[type="text"]')[0].value;
        const password = registerForm.querySelectorAll('input[type="password"]')[0].value;
        const confirmPassword = registerForm.querySelectorAll('input[type="password"]')[1].value;
        const role = registerForm.querySelector('select').value;
        
        if (!username || !password) {
            alert('请填写账号和密码');
            return;
        }
        
        if (password !== confirmPassword) {
            alert('两次输入的密码不一致');
            return;
        }
        
        // 这里可以添加注册逻辑
        console.log('注册信息:', { username, password, role });
        closeModal(loginModal);
        alert('注册成功');
        
        // 更新用户信息显示
        updateUserInfo(username);
    });
}

const postForm = document.getElementById('post-form');
if (postForm) {
    postForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = postForm.querySelector('input[type="text"]').value;
        const categorySelect = postForm.querySelector('select');
        const category = categorySelect.value;
        const categoryText = categorySelect.options[categorySelect.selectedIndex].text;
        const content = postForm.querySelector('textarea').value;
        const files = postForm.querySelector('input[type="file"]').files;
        
        if (title && content) {
            // 创建新帖子元素
            const newPost = document.createElement('div');
            newPost.className = 'post';
            newPost.innerHTML = `
                <div class="post-header">
                    <div class="user-info">
                        <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=user%20avatar%20portrait%20friendly&image_size=square" alt="用户头像">
                        <div>
                            <h4>当前用户</h4>
                            <span>刚刚 · ${categoryText}</span>
                        </div>
                    </div>
                </div>
                <div class="post-content">
                    <h3>${title}</h3>
                    <p>${content}</p>
                    ${files.length > 0 ? `<div class="post-images">
                        <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=campus%20life%20student%20activity&image_size=landscape_4_3" alt="帖子图片">
                    </div>` : ''}
                </div>
                <div class="post-actions">
                    <button class="action-btn"><i class="fas fa-thumbs-up"></i> <span>0</span></button>
                    <button class="action-btn"><i class="fas fa-comment"></i> <span>0</span></button>
                    <button class="action-btn"><i class="fas fa-share"></i> <span>分享</span></button>
                </div>
                <div class="post-comments" style="display: none;">
                    <div class="comment-input">
                        <input type="text" placeholder="写下你的评论...">
                        <button>发送</button>
                    </div>
                </div>
            `;
            
            // 插入新帖子到帖子列表顶部
            const postList = document.querySelector('.post-list');
            postList.insertBefore(newPost, postList.firstChild);
            
            // 清空表单
            postForm.reset();
            
            // 关闭模态框
            closeModal(postModal);
            
            // 绑定新帖子的事件
            bindCommentToggleEvents();
            
            // 绑定新帖子的点赞和评论按钮事件
            const newPostActions = newPost.querySelectorAll('.action-btn');
            newPostActions.forEach(btn => {
                btn.addEventListener('click', () => {
                    const action = btn.querySelector('i').classList[1];
                    const countElement = btn.querySelector('span');
                    
                    if (action === 'fa-thumbs-up') {
                        // 点赞功能
                        if (btn.classList.contains('liked')) {
                            btn.classList.remove('liked');
                            countElement.textContent = parseInt(countElement.textContent) - 1;
                        } else {
                            btn.classList.add('liked');
                            countElement.textContent = parseInt(countElement.textContent) + 1;
                        }
                    } else if (action === 'fa-comment') {
                        // 评论功能
                        const post = btn.closest('.post');
                        const commentsSection = post.querySelector('.post-comments');
                        commentsSection.style.display = commentsSection.style.display === 'none' ? 'block' : 'block';
                    } else if (action === 'fa-share') {
                        // 分享功能
                        alert('分享功能已触发');
                    }
                });
            });
            
            // 绑定新帖子的评论发送按钮事件
            const newCommentButton = newPost.querySelector('.comment-input button');
            newCommentButton.addEventListener('click', () => {
                const input = newCommentButton.previousElementSibling;
                const commentText = input.value.trim();
                const post = newCommentButton.closest('.post');
                const commentsSection = post.querySelector('.post-comments');
                
                if (commentText) {
                    // 创建新评论元素
                    const newComment = document.createElement('div');
                    newComment.className = 'comment';
                    newComment.innerHTML = `
                        <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=user%20avatar%20portrait%20friendly&image_size=square" alt="用户头像">
                        <div class="comment-content">
                            <h5>当前用户</h5>
                            <span class="comment-time">刚刚</span>
                            <p>${commentText}</p>
                            <div class="comment-actions">
                                <button class="reply-btn">回复</button>
                                <button class="like-btn">点赞</button>
                                <span class="like-count">0</span>
                            </div>
                            <div class="reply-input" style="display: none;">
                                <input type="text" placeholder="回复评论...">
                                <button>发送</button>
                            </div>
                            <div class="replies" style="display: none;"></div>
                        </div>
                    `;
                    
                    // 插入新评论到评论列表
                    const commentInput = commentsSection.querySelector('.comment-input');
                    commentsSection.insertBefore(newComment, commentInput);
                    
                    // 清空输入框
                    input.value = '';
                    
                    // 绑定回复按钮事件
                    bindReplyEvents();
                    
                    // 绑定点赞按钮事件
                    bindLikeEvents();
                }
            });
            
            // 显示成功提示
            alert('帖子发布成功');
        } else {
            alert('请填写标题和内容');
        }
    });
}

// 搜索功能
const searchBox = document.querySelector('.search-box input');
const searchButton = document.querySelector('.search-box button');

if (searchButton) {
    searchButton.addEventListener('click', () => {
        const searchTerm = searchBox.value.trim();
        if (searchTerm) {
            console.log('搜索关键词:', searchTerm);
            alert(`搜索: ${searchTerm}`);
        }
    });
}

if (searchBox) {
    searchBox.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const searchTerm = searchBox.value.trim();
            if (searchTerm) {
                console.log('搜索关键词:', searchTerm);
                alert(`搜索: ${searchTerm}`);
            }
        }
    });
}

// 分类导航点击事件
const categoryLinks = document.querySelectorAll('.sidebar ul li a');
categoryLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        categoryLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        
        const category = link.textContent.trim();
        console.log('选择分类:', category);
        alert(`切换到分类: ${category}`);
    });
});

// 更新用户信息显示
function updateUserInfo(username) {
    const userCard = document.querySelector('.user-card');
    if (userCard) {
        userCard.innerHTML = `
            <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=user%20avatar%20portrait%20friendly&image_size=square" alt="用户头像">
            <h4>${username}</h4>
            <p>欢迎回来！</p>
            <button class="btn-secondary" id="profile-btn">个人中心</button>
        `;
        
        // 绑定个人中心按钮事件
        const profileBtn = document.getElementById('profile-btn');
        if (profileBtn) {
            profileBtn.addEventListener('click', () => {
                alert('个人中心功能开发中');
            });
        }
    }
    
    const loginBtn = document.getElementById('login-btn');
    if (loginBtn) {
        loginBtn.textContent = '退出登录';
        loginBtn.removeEventListener('click', openLoginModal);
        loginBtn.addEventListener('click', () => {
            alert('退出登录');
            location.reload();
        });
    }
}

// 打开登录模态框
function openLoginModal() {
    openModal(loginModal);
}

// 模拟登录状态
function simulateLogin() {
    updateUserInfo('小明同学');
}

// 页面加载完成后执行
window.addEventListener('DOMContentLoaded', () => {
    console.log('页面DOM已加载');
    simulateLogin(); // 模拟用户登录，更新界面显示

    console.log('MUwall校园论坛网站加载完成');

    // ====== 把丢失的语言切换引擎加回来 ======
    const langToggleBtn = document.getElementById('lang-toggle');
    if (langToggleBtn) {
        langToggleBtn.addEventListener('click', () => {
            // 在中英之间切换
            currentLang = currentLang === 'zh' ? 'en' : 'zh';
            langToggleBtn.textContent = translations[currentLang].toggle_btn;
            document.documentElement.lang = currentLang === 'zh' ? 'en' : 'zh-CN';

            // 遍历所有带有 data-i18n 属性的元素并替换文字
            document.querySelectorAll('[data-i18n]').forEach(element => {
                const key = element.getAttribute('data-i18n');
                if (translations[currentLang][key]) {
                    element.textContent = translations[currentLang][key];
                }
            });
        });
    }
    // =====================================

    // ====== 單頁應用導航邏輯 (SPA Navigation) ======
    // ... (保留你原来写的导航代码)
});
// ====== 單頁應用導航邏輯 (SPA Navigation) ======
    const homeLink = document.querySelector('a[data-i18n="nav_home"]');
    const profileLink = document.querySelector('a[data-i18n="nav_profile"]');
    const mainFeedSection = document.querySelector('.content'); // 首頁的帖子流
    const profileSection = document.getElementById('profile-view'); // 新的個人中心

    // 點擊首頁
    if (homeLink) {
        homeLink.addEventListener('click', (e) => {
            e.preventDefault();
            
            // 處理導航欄的 active 狀態
            document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
            homeLink.classList.add('active');

            // 顯示首頁，隱藏個人中心
            profileSection.style.display = 'none';
            mainFeedSection.style.display = 'block';
        });
    }

    // 點擊個人中心
    if (profileLink) {
        profileLink.addEventListener('click', (e) => {
            e.preventDefault();
            
            document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
            profileLink.classList.add('active');

            // 隱藏首頁，顯示個人中心
            mainFeedSection.style.display = 'none';
            profileSection.style.display = 'block';

            // 這裡未來可以加入 Array 篩選邏輯 (Lecture 3)：
            // 遍歷 muwallPosts 陣列，只挑選 author === currentUserObj.username 的帖子
            // 並把它們渲染到 document.getElementById('profile-post-list') 裡面
        });
    };
