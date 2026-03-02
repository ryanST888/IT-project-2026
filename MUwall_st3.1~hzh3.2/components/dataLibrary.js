// components/dataLibrary.js

// 1. 多语言字典 (完整合并版)
const translations = {
    'zh-cn': {
        nav_subtitle: "香港都会大学校园论坛", nav_home: "首页", nav_categories: "分类", nav_search: "搜索", nav_profile: "个人中心", nav_login: "登录/注册", toggle_btn: "简体中文",
        side_categories: "分类导航", cat_all: "全部", cat_share: "校园分享", cat_help: "学习求助", cat_life: "生活日常", cat_news: "校园资讯", cat_qna: "提问解答", side_hot: "热门话题", hot_1: "期末考试复习资料分享", hot_2: "校园活动报名通知", hot_3: "寻找自习室搭档", btn_create_post: "发布帖子"
    },
    zh: {
        nav_subtitle: "香港都會大學校園論壇", nav_home: "首頁", nav_categories: "分類", nav_search: "搜索", nav_profile: "個人中心", nav_login: "登錄/註冊", toggle_btn: "繁體中文",
        side_categories: "分類導航", cat_all: "全部", cat_share: "校園分享", cat_help: "學習求助", cat_life: "生活日常", cat_news: "校園資訊", cat_qna: "提問解答", side_hot: "熱門話題", hot_1: "期末考試複習資料分享", hot_2: "校園活動報名通知", hot_3: "尋找自習室搭档", btn_create_post: "發布帖子"
    },
    en: {
        nav_subtitle: "HKMU Campus Forum", nav_home: "Home", nav_categories: "Categories", nav_search: "Search", nav_profile: "Profile", nav_login: "Login / Register", toggle_btn: "English",
        side_categories: "Categories", cat_all: "All", cat_share: "Campus Share", cat_help: "Study Help", cat_life: "Daily Life", cat_news: "Campus News", cat_qna: "Q&A", side_hot: "Hot Topics", hot_1: "Final Exam Review Materials", hot_2: "Campus Activity Registration", hot_3: "Study Room Partner Search", btn_create_post: "Create Post"
    }
};

let currentLang = 'zh'; // 当前语言状态

// 2. 核心数据结构 (Lecture 6 - Object Constructors)
function User(username, userBio) {
    this.username = username;
    this.bio = userBio;
}

function Post(title, category, content, author) {
    this.title = title;
    this.category = category;
    this.content = content;
    this.author = author;
    this.timestamp = new Date();
}

// 3. 全局数据存储 (Lecture 3 - Arrays)
var muwallPosts = new Array();
var currentUserObj = new User("小明同学", "Data Science & Artificial Intelligence major at HKMU.");