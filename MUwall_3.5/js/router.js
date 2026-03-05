// js/router.js

// 页面路由功能
function showView(viewId) {
    // 隐藏所有视图
    document.querySelectorAll('.content-container > section').forEach(section => {
        section.style.display = 'none';
    });
    
    // 显示指定视图
    const view = document.getElementById(viewId);
    if (view) {
        // 对于home-view，使用block显示
        if (viewId === 'home-view') {
            view.style.display = 'block';
            // 重新渲染首页帖子列表，确保评论和点赞数同步
            renderPosts([...muwallPosts].sort((a, b) => b.timestamp - a.timestamp), 'home-view .post-list');
        } else if (viewId === 'categories-view') {
            view.style.display = 'block';
            // 重新渲染分类页面帖子列表，确保评论和点赞数同步
            filterPostsByCategory('all');
        } else if (viewId === 'search-view') {
            view.style.display = 'block';
            // 绑定搜索页面的搜索事件
            const searchInput = document.getElementById('search-input');
            const searchBtn = document.getElementById('search-btn');
            if (searchInput && searchBtn) {
                // 先移除现有的事件监听器，避免重复绑定
                searchBtn.replaceWith(searchBtn.cloneNode(true));
                searchInput.replaceWith(searchInput.cloneNode(true));
                
                // 获取新的元素
                const newSearchInput = document.getElementById('search-input');
                const newSearchBtn = document.getElementById('search-btn');
                
                newSearchBtn.addEventListener('click', () => {
                    const newKeyword = newSearchInput.value.trim();
                    if (newKeyword) {
                        performSearch(newKeyword);
                    }
                });
                newSearchInput.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        const newKeyword = newSearchInput.value.trim();
                        if (newKeyword) {
                            performSearch(newKeyword);
                        }
                    }
                });
            }
        } else if (viewId === 'profile-view') {
            view.style.display = 'block';
            // 重新渲染个人中心页面帖子列表，确保评论和点赞数同步
            loadProfilePosts();
            loadProfileComments();
            
            // 绑定个人中心标签切换事件
            const profileTabs = document.querySelectorAll('.profile-tab');
            profileTabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    profileTabs.forEach(t => t.classList.remove('active'));
                    tab.classList.add('active');
                    
                    const tabName = tab.getAttribute('data-tab');
                    document.querySelectorAll('.tab-panel').forEach(panel => {
                        panel.style.display = 'none';
                        panel.classList.remove('active');
                    });
                    document.getElementById(`${tabName}-tab`).style.display = 'block';
                    document.getElementById(`${tabName}-tab`).classList.add('active');
                });
            });
        } else {
            view.style.display = 'block';
        }
    }
    
    // 更新导航栏活动状态
    document.querySelectorAll('.navbar-menu a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${viewId.replace('-view', '')}`) {
            link.classList.add('active');
        }
    });
}

// 渲染帖子列表
function renderPosts(posts, containerId) {
    let container;
    
    // 检查是否是复合选择器
    if (containerId.includes(' ')) {
        container = document.querySelector(containerId);
    } else {
        container = document.getElementById(containerId);
    }
    
    if (!container) return;
    
    container.innerHTML = '';
    
    if (posts.length === 0) {
        container.innerHTML = `<div class="no-posts" data-i18n="search_no_results">${translations[currentLang].search_no_results}</div>`;
        return;
    }
    
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'post';
        // 构建评论列表HTML
        let commentsHTML = '';
        post.comments.forEach(comment => {
            commentsHTML += `
                <div class="comment">
                    <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=user%20avatar%20portrait%20friendly&image_size=square" alt="头像">
                    <div class="comment-content">
                        <h5>${comment.author}</h5>
                        <span class="comment-time">${comment.timestamp.toLocaleTimeString()}</span>
                        <p>${comment.text}</p>
                    </div>
                </div>
            `;
        });

        // 获取分类的多语言显示名称
        let categoryName = post.category;
        switch (post.category) {
            case '校园分享':
                categoryName = translations[currentLang].cat_share;
                break;
            case '学习求助':
                categoryName = translations[currentLang].cat_help;
                break;
            case '生活日常':
                categoryName = translations[currentLang].cat_life;
                break;
            case '校园资讯':
                categoryName = translations[currentLang].cat_news;
                break;
            case '提问解答':
                categoryName = translations[currentLang].cat_qna;
                break;
        }

        postElement.innerHTML = `
            <div class="post-header">
                <div class="user-info">
                    <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=user%20avatar%20portrait%20friendly&image_size=square" alt="头像">
                    <div>
                        <h4>${post.author}</h4>
                        <span>${formatTime(post.timestamp)} · ${categoryName}</span>
                    </div>
                </div>
            </div>
            <div class="post-content">
                <h3>${post.title}</h3>
                <p>${post.content}</p>
            </div>
            <div class="post-actions">
                <button class="action-btn"><i class="fas fa-thumbs-up"></i> <span>${post.likes}</span></button>
                <button class="action-btn"><i class="fas fa-comment"></i> <span>${post.comments.length}</span></button>
            </div>
            <div class="post-comments" style="display: none;">
                ${commentsHTML}
                <div class="comment-input">
                    <input type="text" placeholder="${translations[currentLang].comment_placeholder}" data-i18n="comment_placeholder">
                    <button data-i18n="comment_send">${translations[currentLang].comment_send}</button>
                </div>
            </div>
        `;
        container.appendChild(postElement);
    });
    
    // 绑定交互事件
    if (typeof bindInteractionEvents === 'function') {
        bindInteractionEvents();
    }
}

// 格式化时间
function formatTime(timestamp) {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 1) return translations[currentLang].time_just;
    if (minutes < 60) return `${minutes}${translations[currentLang].time_minute}`;
    if (hours < 24) return `${hours}${translations[currentLang].time_hour}`;
    if (days < 7) return `${days}${translations[currentLang].time_day}`;
    return timestamp.toLocaleDateString();
}

function initRouter() {
    // 语言切换下拉菜单逻辑
    const langToggleBtn = document.getElementById('lang-toggle');
    const langDropdown = document.getElementById('lang-dropdown');
    
    // 统一的语言切换函数
    function switchLanguage(lang) {
        currentLang = lang;
        langToggleBtn.textContent = translations[currentLang].toggle_btn;
        document.documentElement.lang = currentLang === 'zh-cn' ? 'zh-CN' : currentLang === 'zh' ? 'zh-TW' : 'en';
        
        // 翻译所有带有data-i18n属性的元素
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[currentLang][key]) {
                element.textContent = translations[currentLang][key];
            }
        });
        
        // 翻译输入框占位符
        document.querySelectorAll('input[data-i18n], textarea[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[currentLang][key]) {
                element.placeholder = translations[currentLang][key];
            }
        });
        
        // 翻译select选项
        document.querySelectorAll('option[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[currentLang][key]) {
                element.textContent = translations[currentLang][key];
            }
        });
    }
    
    if (langToggleBtn && langDropdown) {
        const langOptions = langDropdown.querySelectorAll('a[data-lang]');
        langOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                e.preventDefault();
                const lang = e.target.getAttribute('data-lang');
                switchLanguage(lang);
            });
        });
    }
    
    // 初始化语言
    switchLanguage(currentLang);

    // 搜索功能
    const searchBox = document.querySelector('.search-box input');
    const searchButton = document.querySelector('.search-box button');
    if (searchButton && searchBox) {
        searchButton.addEventListener('click', () => {
            const keyword = searchBox.value.trim();
            if (keyword) {
                performSearch(keyword);
            }
        });
        searchBox.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const keyword = searchBox.value.trim();
                if (keyword) {
                    performSearch(keyword);
                }
            }
        });
    }

    // 左侧分类导航
    const categoryLinks = document.querySelectorAll('.fixed-sidebar ul li a');
    categoryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            categoryLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // 分类筛选
            const categoryText = link.querySelector('span').textContent;
            showView('categories-view');
            filterPostsByCategory(categoryText === '全部' ? 'all' : categoryText);
        });
    });

    // 顶部最新/热门筛选
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // 刷新首页帖子
            if (btn.textContent === '最新') {
                renderPosts([...muwallPosts].sort((a, b) => b.timestamp - a.timestamp), 'home-view .post-list');
            } else if (btn.textContent === '热门') {
                renderPosts([...muwallPosts].sort((a, b) => b.likes - a.likes), 'home-view .post-list');
            }
        });
    });

    // 分类页面标签点击事件
    const categoryTabs = document.querySelectorAll('.category-tab');
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            categoryTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            const category = tab.getAttribute('data-category');
            filterPostsByCategory(category);
        });
    });

    // 导航栏点击事件
    const navLinks = document.querySelectorAll('.navbar-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const href = link.getAttribute('href');
            if (href === '#') {
                showView('home-view');
            } else if (href === '#categories') {
                showView('categories-view');
            } else if (href === '#search') {
                showView('search-view');
            } else if (href === '#profile') {
                showView('profile-view');
            }
        });
    });
}

// 分类筛选
function filterPostsByCategory(category) {
    let filteredPosts = muwallPosts;
    if (category !== 'all') {
        filteredPosts = muwallPosts.filter(post => post.category === category);
    }
    renderPosts(filteredPosts, 'category-posts');
    
    // 更新顶部分类标签页的选中状态
    const categoryTabs = document.querySelectorAll('.category-tab');
    categoryTabs.forEach(tab => {
        tab.classList.remove('active');
        if (tab.getAttribute('data-category') === category) {
            tab.classList.add('active');
        }
    });
}

// 搜索功能
function performSearch(keyword) {
    const searchResults = muwallPosts.filter(post => 
        post.title.includes(keyword) || post.content.includes(keyword)
    );
    showView('search-view');
    
    // 获取搜索容器和结果列表
    const searchContainer = document.querySelector('#search-view .search-container');
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const searchResultsContainer = document.getElementById('search-results');
    
    // 更新搜索输入框的值
    if (searchInput) {
        searchInput.value = keyword;
    }
    
    // 重新绑定搜索事件
    if (searchInput && searchBtn) {
        // 先移除现有的事件监听器，避免重复绑定
        searchBtn.replaceWith(searchBtn.cloneNode(true));
        searchInput.replaceWith(searchInput.cloneNode(true));
        
        // 获取新的元素
        const newSearchInput = document.getElementById('search-input');
        const newSearchBtn = document.getElementById('search-btn');
        
        newSearchBtn.addEventListener('click', () => {
            const newKeyword = newSearchInput.value.trim();
            if (newKeyword) {
                performSearch(newKeyword);
            }
        });
        newSearchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const newKeyword = newSearchInput.value.trim();
                if (newKeyword) {
                    performSearch(newKeyword);
                }
            }
        });
    }
    
    // 渲染搜索结果
    if (searchResultsContainer) {
        renderPosts(searchResults, 'search-results');
    }
}

// 加载个人中心帖子
function loadProfilePosts() {
    // 模拟当前用户
    const currentUser = '小明同学';
    const userPosts = muwallPosts.filter(post => post.author === currentUser);
    renderPosts(userPosts, 'profile-post-list');
}

// 加载个人中心评论
function loadProfileComments() {
    // 模拟当前用户
    const currentUser = '小明同学';
    const userComments = [];
    
    // 遍历所有帖子，收集用户的评论
    muwallPosts.forEach(post => {
        post.comments.forEach(comment => {
            if (comment.author === currentUser) {
                userComments.push({
                    post: post,
                    comment: comment
                });
            }
        });
    });
    
    const commentList = document.getElementById('profile-comment-list');
    if (commentList) {
        commentList.innerHTML = '';
        
        if (userComments.length === 0) {
            commentList.innerHTML = `<div class="no-comments" data-i18n="profile_no_comments">${translations[currentLang].profile_no_comments}</div>`;
            return;
        }
        
        userComments.forEach(item => {
            const commentDiv = document.createElement('div');
            commentDiv.className = 'profile-comment';
            commentDiv.innerHTML = `
                <div class="comment-post-info">
                    <h4><a href="#">${item.post.title}</a></h4>
                    <span>${item.comment.timestamp.toLocaleString()}</span>
                </div>
                <div class="comment-content">
                    <p>${item.comment.text}</p>
                </div>
                <div class="comment-actions">
                    <button class="btn-secondary">回复</button>
                    <button class="btn-danger">删除</button>
                </div>
            `;
            commentList.appendChild(commentDiv);
        });
    }
}