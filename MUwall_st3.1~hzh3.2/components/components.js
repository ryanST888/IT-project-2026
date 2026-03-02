// components/components.js

const loginBtn = document.getElementById('login-btn');
const loginModal = document.getElementById('login-modal');
const createPostBtn = document.getElementById('create-post');
const postModal = document.getElementById('post-modal');
const closeButtons = document.querySelectorAll('.close');

function openModal(modal) { if(modal) modal.style.display = 'block'; }
function closeModal(modal) { if(modal) modal.style.display = 'none'; }

if (loginBtn) loginBtn.addEventListener('click', () => openModal(loginModal));
if (createPostBtn) createPostBtn.addEventListener('click', () => openModal(postModal));

closeButtons.forEach(button => {
    button.addEventListener('click', () => closeModal(button.closest('.modal')));
});

window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) closeModal(e.target);
});

function bindReplyEvents() {
    // (Paste your existing bindReplyEvents logic here)
}

function bindLikeEvents() {
    // (Paste your existing bindLikeEvents logic here)
}

function bindCommentToggleEvents() {
    // (Paste your existing bindCommentToggleEvents logic here)
}

function updateUserInfo(username) {
    const userCard = document.querySelector('.user-card');
    if (userCard) {
        userCard.innerHTML = `
            <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=user%20avatar%20portrait%20friendly&image_size=square" alt="用户头像">
            <h4>${username}</h4>
            <p>欢迎回来！</p>
        `;
    }
}

function simulateLogin() {
    updateUserInfo(currentUserObj.username); // Uses the object from dataLibrary.js
}

// Post Form Submission Logic
const postForm = document.getElementById('post-form');
if (postForm) {
    postForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = postForm.querySelector('input[type="text"]').value;
        const categorySelect = postForm.querySelector('select');
        const categoryText = categorySelect.options[categorySelect.selectedIndex].text;
        const content = postForm.querySelector('textarea').value;
        
        if (title && content) {
            // Instantiating the object (Lecture 6)
            const newForumPost = new Post(title, categoryText, content, currentUserObj.username);
            muwallPosts.push(newForumPost); // Saving to Array (Lecture 3)
            
            // UI rendering logic...
            alert('帖子发布成功！');
            postForm.reset();
            closeModal(postModal);
        }
    });
}