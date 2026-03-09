// js/dataLibrary.js

// 1. 多语言字典
let currentLang = 'zh-cn';
const translations = {
    'zh-cn': {
        nav_subtitle: "香港都会大学校园论坛", nav_home: "首页", nav_categories: "分类", nav_search: "搜索", nav_profile: "个人中心", nav_login: "登录/注册", toggle_btn: "简体中文",
        side_categories: "分类导航", cat_all: "全部", cat_share: "校园分享", cat_help: "学习求助", cat_life: "生活日常", cat_news: "校园资讯", cat_qna: "提问解答", side_hot: "热门话题", hot_1: "期末考试复习资料分享", hot_2: "校园活动报名通知", hot_3: "寻找自习室搭档", btn_create_post: "发布帖子",
        profile_my_posts: "我的帖子", profile_my_comments: "我的评论", profile_edit: "编辑资料", profile_back_home: "返回首页", profile_logout: "退出登录", profile_no_comments: "暂无评论",
        search_results: "搜索结果", search_placeholder: "搜索帖子...", search_no_results: "暂无相关帖子", search_input_placeholder: "请输入关键词搜索",
        category_title: "分类",
        user_info: "用户信息", user_not_logged_in: "登录后查看个人信息", user_login: "登录", user_welcome: "欢迎回来！", user_profile: "个人中心",
        post_title: "帖子标题", post_category: "帖子分类", post_content: "帖子内容", post_publish: "发布",
        comment_placeholder: "写下你的评论...", comment_send: "发送",
        filter_latest: "最新", filter_hot: "热门",
        login: "登录", register: "注册", login_title: "用户登录", register_title: "用户注册",
        form_username: "账号", form_password: "密码", form_confirm_password: "确认密码", form_identity: "身份", form_student: "学生", form_teacher: "教师",
        modal_login: "登录", modal_register: "注册",
        time_just: "刚刚", time_minute: "分钟前", time_hour: "小时前", time_day: "天前", post_delete: "删除"
    },
    zh: {
        nav_subtitle: "香港都會大學校園論壇", nav_home: "首頁", nav_categories: "分類", nav_search: "搜索", nav_profile: "個人中心", nav_login: "登錄/註冊", toggle_btn: "繁體中文",
        side_categories: "分類導航", cat_all: "全部", cat_share: "校園分享", cat_help: "學習求助", cat_life: "生活日常", cat_news: "校園資訊", cat_qna: "提問解答", side_hot: "熱門話題", hot_1: "期末考試複習資料分享", hot_2: "校園活動報名通知", hot_3: "尋找自習室搭档", btn_create_post: "發布帖子",
        profile_my_posts: "我的帖子", profile_my_comments: "我的評論", profile_edit: "編輯資料", profile_back_home: "返回首頁", profile_logout: "退出登錄", profile_no_comments: "暫無評論",
        search_results: "搜索結果", search_placeholder: "搜索帖子...", search_no_results: "暫無相關帖子", search_input_placeholder: "請輸入關鍵詞搜索",
        category_title: "分類",
        user_info: "用戶信息", user_not_logged_in: "登錄後查看個人信息", user_login: "登錄", user_welcome: "歡迎回來！", user_profile: "個人中心",
        post_title: "帖子標題", post_category: "帖子分類", post_content: "帖子內容", post_publish: "發布",
        comment_placeholder: "寫下你的評論...", comment_send: "發送",
        filter_latest: "最新", filter_hot: "熱門",
        login: "登錄", register: "註冊", login_title: "用戶登錄", register_title: "用戶註冊",
        form_username: "帳號", form_password: "密碼", form_confirm_password: "確認密碼", form_identity: "身份", form_student: "學生", form_teacher: "教師",
        modal_login: "登錄", modal_register: "註冊",
        time_just: "剛剛", time_minute: "分鐘前", time_hour: "小時前", time_day: "天前", post_delete: "刪除"
    },
    en: {
        nav_subtitle: "HKMU Campus Forum", nav_home: "Home", nav_categories: "Categories", nav_search: "Search", nav_profile: "Profile", nav_login: "Login / Register", toggle_btn: "English",
        side_categories: "Categories", cat_all: "All", cat_share: "Campus Share", cat_help: "Study Help", cat_life: "Daily Life", cat_news: "Campus News", cat_qna: "Q&A", side_hot: "Hot Topics", hot_1: "Final Exam Review Materials", hot_2: "Campus Activity Registration", hot_3: "Study Room Partner Search", btn_create_post: "Create Post",
        profile_my_posts: "My Posts", profile_my_comments: "My Comments", profile_edit: "Edit Profile", profile_back_home: "Back to Home", profile_logout: "Logout", profile_no_comments: "No comments yet",
        search_results: "Search Results", search_placeholder: "Search posts...", search_no_results: "No related posts", search_input_placeholder: "Please enter keywords to search",
        category_title: "Categories",
        user_info: "User Info", user_not_logged_in: "Login to view personal information", user_login: "Login", user_welcome: "Welcome back!", user_profile: "Profile",
        post_title: "Post Title", post_category: "Post Category", post_content: "Post Content", post_publish: "Publish",
        comment_placeholder: "Write your comment...", comment_send: "Send",
        filter_latest: "Latest", filter_hot: "Hot",
        login: "Login", register: "Register", login_title: "User Login", register_title: "User Registration",
        form_username: "Username", form_password: "Password", form_confirm_password: "Confirm Password", form_identity: "Identity", form_student: "Student", form_teacher: "Teacher",
        modal_login: "Login", modal_register: "Register",
        time_just: "Just now", time_minute: "minutes ago", time_hour: "hours ago", time_day: "days ago", post_delete: "Delete"
    }
};

// 2. 核心数据结构 (Lecture 6 Requirement)
function Comment(authorName, commentText) {
    this.author = authorName;
    this.text = commentText;
    this.timestamp = new Date();
    this.likes = 0;
    this.addLike = function() { this.likes++; };
}

function Post(postTitle, postCategory, postContent, authorName) {
    this.title = postTitle;
    this.category = postCategory;
    this.content = postContent;
    this.author = authorName;
    this.timestamp = new Date();
    this.likes = 0;
    this.id = Date.now().toString() + Math.random().toString(36).substring(2, 9);
    this.comments = new Array(); // Lecture 3 Requirement
    this.addLike = function() { this.likes++; };
    this.addComment = function(newCommentObject) {
        this.comments[this.comments.length] = newCommentObject;
    };
}

// 3. 全局数据库 (Lecture 3 Requirement)
function loadMuwallPosts() {
    const saved = localStorage.getItem('muwallPostsStore');
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            return parsed.map(p => {
                let post = new Post(p.title, p.category, p.content, p.author);
                post.timestamp = new Date(p.timestamp);
                post.likes = p.likes;
                post.id = p.id || (Date.now().toString() + Math.random().toString(36).substring(2, 9));
                post.comments = (p.comments || []).map(c => {
                    let comment = new Comment(c.author, c.text);
                    comment.timestamp = new Date(c.timestamp);
                    comment.likes = c.likes;
                    return comment;
                });
                return post;
            });
        } catch(e) {
            console.error('Failed to parse posts from localStorage', e);
        }
    }
    return new Array();
}

function saveMuwallPosts() {
    localStorage.setItem('muwallPostsStore', JSON.stringify(muwallPosts));
}

var muwallPosts = loadMuwallPosts();