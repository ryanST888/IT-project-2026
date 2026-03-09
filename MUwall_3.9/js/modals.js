// js/modals.js

function openModal(modal) { if(modal) modal.style.display = 'block'; }
function closeModal(modal) { if(modal) modal.style.display = 'none'; }

function updateUserInfo(username) {
    const userCard = document.querySelector('.user-card');
    if (userCard) {
        userCard.innerHTML = `
            <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=user%20avatar%20portrait%20friendly&image_size=square" alt="用户头像">
            <h4>${username}</h4>
            <p data-i18n="user_welcome">欢迎回来！</p>
            <button class="btn-secondary" id="profile-btn" data-i18n="user_profile">个人中心</button>
        `;
        
        // 绑定个人中心按钮点击事件
        const profileBtn = document.getElementById('profile-btn');
        if (profileBtn) {
            profileBtn.addEventListener('click', () => {
                showView('profile-view');
                loadProfilePosts();
                loadProfileComments();
            });
        }
    }
    const loginBtn = document.getElementById('login-btn');
    if (loginBtn) {
        loginBtn.textContent = '退出登录';
        loginBtn.addEventListener('click', () => location.reload());
    }
}

function initModals() {
    const loginBtn = document.getElementById('login-btn');
    const loginModal = document.getElementById('login-modal');
    const createPostBtn = document.getElementById('create-post');
    const postModal = document.getElementById('post-modal');
    const closeButtons = document.querySelectorAll('.close');

    if(loginBtn) loginBtn.addEventListener('click', () => openModal(loginModal));
    if(createPostBtn) createPostBtn.addEventListener('click', () => openModal(postModal));

    closeButtons.forEach(btn => btn.addEventListener('click', () => closeModal(btn.closest('.modal'))));
    window.addEventListener('click', (e) => { if (e.target.classList.contains('modal')) closeModal(e.target); });

    // 登录/注册 Tabs 切换
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            document.querySelectorAll('.tab-content').forEach(c => c.style.display = 'none');
            document.getElementById(`${btn.getAttribute('data-tab')}-tab`).style.display = 'block';
        });
    });

    // 表单提交模拟
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = loginForm.querySelector('input[type="text"]').value;
            if (username) {
                closeModal(loginModal);
                alert('登录成功');
                updateUserInfo(username);
            }
        });
    }
}