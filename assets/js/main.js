document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle Logic
    const themeToggles = document.querySelectorAll('#theme-toggle, #theme-toggle-mobile');
    const htmlElement = document.documentElement;
    const sidebar = document.getElementById('sidebar');
    const mobileMenu = document.getElementById('mobile-menu');
    
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

    const updateRtlButtons = (isRtl) => {
        rtlToggles.forEach(btn => {
            btn.innerText = isRtl ? 'LTR' : 'RTL';
        });
    };

    const savedRtl = localStorage.getItem('rtl') === 'true';
    if (savedRtl) {
        htmlElement.setAttribute('dir', 'rtl');
        updateRtlButtons(true);
        if (sidebar) {
            sidebar.classList.add('translate-x-full');
            sidebar.classList.remove('-translate-x-full');
        }
    } else {
        htmlElement.setAttribute('dir', 'ltr');
        updateRtlButtons(false);
        if (sidebar) {
            sidebar.classList.add('-translate-x-full');
            sidebar.classList.remove('translate-x-full');
        }
    }

    rtlToggles.forEach(btn => {
        btn.addEventListener('click', () => {
            const isRtl = htmlElement.getAttribute('dir') === 'rtl';
            const newRtl = !isRtl;
            htmlElement.setAttribute('dir', newRtl ? 'rtl' : 'ltr');
            localStorage.setItem('rtl', newRtl);
            updateRtlButtons(newRtl);
            
            if (sidebar) {
                if (newRtl) {
                    sidebar.classList.add('translate-x-full');
                    sidebar.classList.remove('-translate-x-full');
                } else {
                    sidebar.classList.add('-translate-x-full');
                    sidebar.classList.remove('translate-x-full');
                }
            }
        });
    });

    // Mobile Menu Logic
    const menuBtn = document.getElementById('mobile-menu-btn');

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
                    const isRtl = htmlElement.getAttribute('dir') === 'rtl';
                    if (isRtl) {
                        sidebar.classList.add('translate-x-full');
                        sidebar.classList.remove('-translate-x-full');
                    } else {
                        sidebar.classList.add('-translate-x-full');
                        sidebar.classList.remove('translate-x-full');
                    }
                }

                // Scroll to top when switching tabs
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        });
    }

    // Sidebar Toggle (Mobile)
    const sidebarToggle = document.getElementById('sidebar-toggle');
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', () => {
            const isRtl = htmlElement.getAttribute('dir') === 'rtl';
            if (isRtl) {
                sidebar.classList.toggle('translate-x-full');
                sidebar.classList.remove('-translate-x-full');
            } else {
                sidebar.classList.toggle('-translate-x-full');
                sidebar.classList.remove('translate-x-full');
            }
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
