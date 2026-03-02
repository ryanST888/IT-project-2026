// components/router.js

function initRouter() {
    // ====== 语言切换引擎 ======
    const langToggleBtn = document.getElementById('lang-toggle');
    if (langToggleBtn) {
        langToggleBtn.addEventListener('click', () => {
            currentLang = currentLang === 'zh' ? 'en' : 'zh';
            langToggleBtn.textContent = translations[currentLang].toggle_btn;
            document.documentElement.lang = currentLang === 'zh' ? 'en' : 'zh-CN';

            document.querySelectorAll('[data-i18n]').forEach(element => {
                const key = element.getAttribute('data-i18n');
                if (translations[currentLang][key]) {
                    element.textContent = translations[currentLang][key];
                }
            });
        });
    }

    // ====== 單頁應用視圖路由器 (SPA View Router) ======
    const views = {
        home: document.querySelector('.content'), 
        categories: document.getElementById('categories-view'),
        search: document.getElementById('search-view'),
        profile: document.getElementById('profile-view')
    };

    const links = {
        home: document.querySelector('a[data-i18n="nav_home"]'),
        categories: document.querySelector('a[data-i18n="nav_categories"]'),
        search: document.querySelector('a[data-i18n="nav_search"]'),
        profile: document.querySelector('a[data-i18n="nav_profile"]')
    };

    function switchView(targetViewName) {
        Object.values(views).forEach(view => { if (view) view.style.display = 'none'; });
        Object.values(links).forEach(link => { if (link) link.classList.remove('active'); });

        if (views[targetViewName]) views[targetViewName].style.display = 'block';
        if (links[targetViewName]) links[targetViewName].classList.add('active');
    }

    if (links.home) links.home.addEventListener('click', (e) => { e.preventDefault(); switchView('home'); });
    if (links.categories) links.categories.addEventListener('click', (e) => { e.preventDefault(); switchView('categories'); });
    if (links.search) links.search.addEventListener('click', (e) => { e.preventDefault(); switchView('search'); });
    if (links.profile) links.profile.addEventListener('click', (e) => { e.preventDefault(); switchView('profile'); });
}