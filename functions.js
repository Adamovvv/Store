function enableCustomDarkMode() {
    document.documentElement.style.setProperty('--tg-theme-bg-color', 'var(--custom-dark-bg-color)');
    document.documentElement.style.setProperty('--tg-theme-text-color', 'var(--custom-dark-text-color)');
    document.documentElement.style.setProperty('--tg-theme-link-color', 'var(--custom-dark-link-color)');
    document.documentElement.style.setProperty('--tg-theme-secondary-bg-color', 'var(--custom-dark-secondary-bg-color)');
    document.documentElement.style.setProperty('--tg-theme-button-color', 'var(--custom-dark-button-color)');
    document.documentElement.style.setProperty('--tg-theme-button-text-color', 'var(--custom-dark-button-text-color)');
}

// Вызов функции для активации темного режима
enableCustomDarkMode();
