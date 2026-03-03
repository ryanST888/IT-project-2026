// js/posts.js

function bindInteractionEvents() {
    // 绑定点赞和评论展开
    document.querySelectorAll('.action-btn').forEach(btn => {
        // 防止重复绑定
        btn.replaceWith(btn.cloneNode(true)); 
    });
    
    document.querySelectorAll('.action-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.querySelector('i').classList[1];
            const countSpan = this.querySelector('span');
            
            if (action === 'fa-thumbs-up') {
                if (this.classList.contains('liked')) {
                    this.classList.remove('liked');
                    countSpan.textContent = parseInt(countSpan.textContent) - 1;
                } else {
                    this.classList.add('liked');
                    countSpan.textContent = parseInt(countSpan.textContent) + 1;
                }
            } else if (action === 'fa-comment') {
                const commentsSection = this.closest('.post').querySelector('.post-comments');
                commentsSection.style.display = commentsSection.style.display === 'none' ? 'block' : 'none';
            }
        });
    });

    // 绑定发送评论按钮
    document.querySelectorAll('.comment-input button').forEach(btn => {
        btn.replaceWith(btn.cloneNode(true));
    });

    document.querySelectorAll('.comment-input button').forEach(button => {
        button.addEventListener('click', function() {
            const input = this.previousElementSibling;
            const commentText = input.value.trim();
            const commentsSection = this.closest('.post-comments');
            
            if (commentText) {
                // 1. 实例化 Comment 对象 (Lecture 6)
                const currentUser = document.querySelector('.user-info h4') ? document.querySelector('.user-info h4').textContent : '游客';
                const newCommentObj = new Comment(currentUser, commentText);

                // 2. 渲染 UI
                const newCommentDiv = document.createElement('div');
                newCommentDiv.className = 'comment';
                newCommentDiv.innerHTML = `
                    <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=user%20avatar%20portrait%20friendly&image_size=square" alt="头像">
                    <div class="comment-content">
                        <h5>${newCommentObj.author}</h5>
                        <span class="comment-time">${newCommentObj.timestamp.toLocaleTimeString()}</span>
                        <p>${newCommentObj.text}</p>
                    </div>
                `;
                
                const commentInputArea = commentsSection.querySelector('.comment-input');
                commentsSection.insertBefore(newCommentDiv, commentInputArea);
                input.value = '';
            }
        });
    });
}

function initPosts() {
    bindInteractionEvents(); // 初始化现有帖子的事件

    const postForm = document.getElementById('post-form');
    if (postForm) {
        postForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const title = postForm.querySelector('input[type="text"]').value;
            const categorySelect = postForm.querySelector('select');
            const categoryText = categorySelect.options[categorySelect.selectedIndex].text;
            const content = postForm.querySelector('textarea').value;
            
            if (title && content) {
                const currentUser = document.querySelector('.user-info h4') ? document.querySelector('.user-info h4').textContent : '小明同学';
                
                // 1. 实例化真正的 Post 对象 (Lecture 6)
                const newForumPost = new Post(title, categoryText, content, currentUser);
                
                // 2. 存入全局数组 (Lecture 3)
                muwallPosts.push(newForumPost);
                
                // 3. 渲染到页面
                const newPost = document.createElement('div');
                newPost.className = 'post';
                newPost.innerHTML = `
                    <div class="post-header">
                        <div class="user-info">
                            <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=user%20avatar%20portrait%20friendly&image_size=square" alt="头像">
                            <div>
                                <h4>${newForumPost.author}</h4>
                                <span>刚刚 · ${newForumPost.category}</span>
                            </div>
                        </div>
                    </div>
                    <div class="post-content">
                        <h3>${newForumPost.title}</h3>
                        <p>${newForumPost.content}</p>
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
                
                const postList = document.querySelector('.post-list');
                postList.insertBefore(newPost, postList.firstChild);
                
                postForm.reset();
                document.getElementById('post-modal').style.display = 'none';
                
                // 重新绑定新帖子的事件
                bindInteractionEvents();
            }
        });
    }
}