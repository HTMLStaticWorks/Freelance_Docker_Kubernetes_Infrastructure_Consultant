document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle Logic
    const themeToggles = document.querySelectorAll('#theme-toggle, #theme-toggle-mobile');
    const htmlElement = document.documentElement;
    
    const updateThemeIcons = (theme) => {
        const icons = document.querySelectorAll('#theme-icon, #theme-toggle-mobile');
        icons.forEach(icon => {
            if (theme === 'light') {
                icon.innerHTML = '🌙';
            } else {
                icon.innerHTML = '☀️';
            }
        });
    };

    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
        htmlElement.classList.add('light');
        htmlElement.classList.remove('dark');
        updateThemeIcons('light');
    } else {
        htmlElement.classList.add('dark');
        htmlElement.classList.remove('light');
        updateThemeIcons('dark');
    }

    themeToggles.forEach(btn => {
        btn.addEventListener('click', () => {
            if (htmlElement.classList.contains('light')) {
                htmlElement.classList.remove('light');
                htmlElement.classList.add('dark');
                localStorage.setItem('theme', 'dark');
                updateThemeIcons('dark');
            } else {
                htmlElement.classList.add('light');
                htmlElement.classList.remove('dark');
                localStorage.setItem('theme', 'light');
                updateThemeIcons('light');
            }
        });
    });

    // RTL Toggle Logic
    const rtlToggles = document.querySelectorAll('#rtl-toggle');
    const savedRtl = localStorage.getItem('rtl') === 'true';

    if (savedRtl) {
        document.body.setAttribute('dir', 'rtl');
    }

    rtlToggles.forEach(btn => {
        btn.addEventListener('click', () => {
            const isRtl = document.body.getAttribute('dir') === 'rtl';
            document.body.setAttribute('dir', isRtl ? 'ltr' : 'rtl');
            localStorage.setItem('rtl', !isRtl);
        });
    });

    // Mobile Menu Logic
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
        
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
        });
    }

    // Active Link Highlighting
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link, #mobile-menu a');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('text-indigo-500', 'font-bold');
        }
    });

    // Dashboard Content Switching
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    const dashboardContents = document.querySelectorAll('.dashboard-content');
    const sidebar = document.getElementById('sidebar');

    if (sidebarLinks.length > 0) {
        sidebarLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('data-target');
                
                sidebarLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');

                dashboardContents.forEach(content => {
                    if (content.id === targetId) {
                        content.classList.remove('hidden');
                        content.classList.add('animate-fade-in'); // Optional animation
                    } else {
                        content.classList.add('hidden');
                        content.classList.remove('animate-fade-in');
                    }
                });

                const titleEl = document.getElementById('current-tab-title');
                if (titleEl) {
                    titleEl.innerText = link.querySelector('span').innerText;
                }

                if (window.innerWidth < 1024 && sidebar) {
                    sidebar.classList.add('-translate-x-full');
                }
            });
        });
    }

    // Sidebar Toggle (Mobile)
    const sidebarToggle = document.getElementById('sidebar-toggle');
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('-translate-x-full');
        });
    }

    // Back to Top Logic
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
