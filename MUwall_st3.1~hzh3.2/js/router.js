// js/router.js

function initRouter() {
    // 语言切换下拉菜单逻辑
    const langToggleBtn = document.getElementById('lang-toggle');
    const langDropdown = document.getElementById('lang-dropdown');
    
    if (langToggleBtn && langDropdown) {
        const langOptions = langDropdown.querySelectorAll('a[data-lang]');
        langOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                e.preventDefault();
                currentLang = e.target.getAttribute('data-lang');
                langToggleBtn.textContent = translations[currentLang].toggle_btn;
                document.documentElement.lang = currentLang === 'zh-cn' ? 'zh-CN' : currentLang === 'zh' ? 'zh-TW' : 'en';
                
                document.querySelectorAll('[data-i18n]').forEach(element => {
                    const key = element.getAttribute('data-i18n');
                    if (translations[currentLang][key]) {
                        element.textContent = translations[currentLang][key];
                    }
                });
            });
        });
    }

    // 搜索功能
    const searchBox = document.querySelector('.search-box input');
    const searchButton = document.querySelector('.search-box button');
    if (searchButton && searchBox) {
        searchButton.addEventListener('click', () => alert(`搜索: ${searchBox.value.trim()}`));
        searchBox.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') alert(`搜索: ${searchBox.value.trim()}`);
        });
    }

    // 左侧分类导航
    const categoryLinks = document.querySelectorAll('.sidebar ul li a');
    categoryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            categoryLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // 顶部最新/热门筛选
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
}