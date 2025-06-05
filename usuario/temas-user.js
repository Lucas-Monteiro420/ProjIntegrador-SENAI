/**
 * Sistema de Alternância de Temas - TrackParts
 * Script responsável por gerenciar a mudança entre tema claro e escuro
 * Agora inclui troca automática do logo
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Inicializando sistema de temas...');
    
    // Elementos do DOM
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.querySelector('.theme-icon');
    const htmlElement = document.documentElement;
    const bodyElement = document.body;
    const logoImg = document.getElementById('logo-img'); // Logo principal
    
    // Verificar se os elementos foram encontrados
    console.log('Elementos encontrados:', {
        themeToggle: !!themeToggle,
        themeIcon: !!themeIcon,
        htmlElement: !!htmlElement,
        bodyElement: !!bodyElement,
        logoImg: !!logoImg
    });
    
    // Chave para armazenamento local
    const STORAGE_KEY = 'trackparts-theme';
    
    // Configuração dos logos para cada tema
    const LOGO_CONFIG = {
        light: 'imagens/logo.png',
        dark: 'imagens/logoDark.png'
    };
    
    /**
     * Atualiza o logo baseado no tema atual
     * @param {string} theme - 'light' ou 'dark'
     */
    function updateLogo(theme) {
        if (!logoImg) {
            console.warn('Elemento logo não encontrado');
            return;
        }
        
        const logoSrc = LOGO_CONFIG[theme];
        if (!logoSrc) {
            console.warn('Configuração de logo não encontrada para tema:', theme);
            return;
        }
        
        // Verificar se o src já está correto para evitar recarregamento desnecessário
        if (logoImg.src !== logoSrc && !logoImg.src.endsWith(logoSrc)) {
            console.log('Atualizando logo para tema:', theme, '- Novo src:', logoSrc);
            
            // Aplicar uma pequena animação de fade durante a troca
            logoImg.style.opacity = '0.7';
            logoImg.style.transition = 'opacity 0.2s ease';
            
            // Trocar o logo
            logoImg.src = logoSrc;
            logoImg.alt = `TrackParts Logo - ${theme === 'dark' ? 'Modo Escuro' : 'Modo Claro'}`;
            
            // Restaurar opacidade após carregamento
            logoImg.onload = function() {
                logoImg.style.opacity = '1';
                console.log('Logo atualizado com sucesso');
            };
            
            // Fallback caso a imagem não carregue
            logoImg.onerror = function() {
                console.error('Erro ao carregar logo:', logoSrc);
                logoImg.style.opacity = '1';
                // Tentar usar o logo padrão
                logoImg.src = LOGO_CONFIG.light;
            };
        }
    }
    
    /**
     * Aplica o tema especificado
     * @param {string} theme - 'light' ou 'dark'
     */
    function applyTheme(theme) {
        console.log('Aplicando tema:', theme);
        
        // Aplicar o tema no HTML e body
        htmlElement.setAttribute('data-theme', theme);
        bodyElement.setAttribute('data-theme', theme);
        
        // Atualizar o logo
        updateLogo(theme);
        
        // Atualizar o ícone do botão
        if (themeIcon) {
            themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
            themeIcon.setAttribute('aria-label', theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro');
        }
        
        // Atualizar o título do botão
        if (themeToggle) {
            themeToggle.setAttribute('title', theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro');
            themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro');
        }
        
        // Atualizar meta theme-color para PWA
        updateMetaThemeColor(theme);
        
        // Disparar evento customizado para outros scripts
        window.dispatchEvent(new CustomEvent('themeChanged', { 
            detail: { theme: theme } 
        }));
        
        console.log('Tema aplicado com sucesso:', theme);
    }
    
    /**
     * Atualiza a cor do tema para PWA
     * @param {string} theme - 'light' ou 'dark'
     */
    function updateMetaThemeColor(theme) {
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
            metaThemeColor.content = theme === 'dark' ? '#2a2a2a' : '#ffffff';
        }
    }
    
    /**
     * Obtém o tema atual
     * @returns {string} 'light' ou 'dark'
     */
    function getCurrentTheme() {
        return htmlElement.getAttribute('data-theme') || 'light';
    }
    
    /**
     * Alterna entre os temas
     */
    function toggleTheme() {
        const currentTheme = getCurrentTheme();
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        console.log('Alternando tema:', currentTheme, '->', newTheme);
        
        // Aplicar o novo tema
        applyTheme(newTheme);
        
        // Salvar no localStorage
        try {
            localStorage.setItem(STORAGE_KEY, newTheme);
            console.log('Tema salvo no localStorage:', newTheme);
        } catch (error) {
            console.warn('Erro ao salvar tema no localStorage:', error);
        }
        
        // Mostrar notificação
        showThemeNotification(newTheme);
    }
    
    /**
     * Carrega o tema salvo do localStorage
     * @returns {string} 'light' ou 'dark'
     */
    function loadSavedTheme() {
        try {
            const savedTheme = localStorage.getItem(STORAGE_KEY);
            console.log('Tema carregado do localStorage:', savedTheme);
            return savedTheme || getSystemTheme();
        } catch (error) {
            console.warn('Erro ao carregar tema do localStorage:', error);
            return getSystemTheme();
        }
    }
    
    /**
     * Detecta a preferência de tema do sistema
     * @returns {string} 'light' ou 'dark'
     */
    function getSystemTheme() {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            console.log('Sistema detectado como modo escuro');
            return 'dark';
        }
        console.log('Sistema detectado como modo claro');
        return 'light';
    }
    
    /**
     * Mostra notificação de mudança de tema
     * @param {string} theme - 'light' ou 'dark'
     */
    function showThemeNotification(theme) {
        const message = theme === 'dark' ? 'Modo escuro ativado' : 'Modo claro ativado';
        
        // Tentar usar a função de notificação existente
        if (typeof showNotification === 'function') {
            showNotification(message, 'info');
            return;
        }
        
        // Criar notificação personalizada se a função não existir
        createCustomNotification(message);
    }
    
    /**
     * Cria uma notificação personalizada
     * @param {string} message - Mensagem da notificação
     */
    function createCustomNotification(message) {
        // Remover notificação existente, se houver
        const existingNotification = document.querySelector('.theme-notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Criar elemento de notificação
        const notification = document.createElement('div');
        notification.className = 'theme-notification notification info';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--card-bg);
            color: var(--text-primary);
            padding: 15px 20px;
            border-radius: 5px;
            box-shadow: var(--box-shadow);
            z-index: 1000;
            border-left: 4px solid var(--primary-color);
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
            word-wrap: break-word;
        `;
        
        // Adicionar conteúdo
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
            </div>
        `;
        
        // Adicionar ao DOM
        document.body.appendChild(notification);
        
        // Mostrar com animação
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 10);
        
        // Remover após alguns segundos
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
    
    /**
     * Configura o listener para mudanças de preferência do sistema
     */
    function setupSystemThemeListener() {
        if (window.matchMedia) {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            
            // Listener para mudanças na preferência do sistema
            mediaQuery.addEventListener('change', function(e) {
                // Só aplicar tema do sistema se não houver preferência salva
                const savedTheme = localStorage.getItem(STORAGE_KEY);
                if (!savedTheme) {
                    const systemTheme = e.matches ? 'dark' : 'light';
                    console.log('Preferência do sistema mudou para:', systemTheme);
                    applyTheme(systemTheme);
                }
            });
        }
    }
    
    /**
     * Pré-carrega as imagens dos logos para transição suave
     */
    function preloadLogos() {
        const logoImages = [];
        
        Object.values(LOGO_CONFIG).forEach(logoSrc => {
            const img = new Image();
            img.src = logoSrc;
            logoImages.push(img);
            
            img.onload = function() {
                console.log('Logo pré-carregado:', logoSrc);
            };
            
            img.onerror = function() {
                console.warn('Erro ao pré-carregar logo:', logoSrc);
            };
        });
        
        console.log('Iniciando pré-carregamento de', logoImages.length, 'logos');
    }
    
    /**
     * Inicializa o sistema de temas
     */
    function initializeThemeSystem() {
        console.log('Inicializando sistema de temas...');
        
        // Pré-carregar logos para transições suaves
        preloadLogos();
        
        // Carregar e aplicar tema inicial
        const initialTheme = loadSavedTheme();
        applyTheme(initialTheme);
        
        // Configurar listener do botão de alternância
        if (themeToggle) {
            themeToggle.addEventListener('click', function(e) {
                e.preventDefault();
                toggleTheme();
            });
            
            // Adicionar feedback visual ao clicar
            themeToggle.addEventListener('mousedown', function() {
                this.style.transform = 'scale(0.95)';
            });
            
            themeToggle.addEventListener('mouseup', function() {
                this.style.transform = 'scale(1)';
            });
            
            themeToggle.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
            
            console.log('Event listener do botão de tema configurado');
        } else {
            console.warn('Botão de alternância de tema não encontrado!');
        }
        
        // Configurar listener para mudanças de preferência do sistema
        setupSystemThemeListener();
        
        // Adicionar suporte a atalhos de teclado
        setupKeyboardShortcuts();
        
        console.log('Sistema de temas inicializado com sucesso');
    }
    
    /**
     * Configura atalhos de teclado para alternância de tema
     */
    function setupKeyboardShortcuts() {
        document.addEventListener('keydown', function(e) {
            // Ctrl/Cmd + Shift + T para alternar tema
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
                e.preventDefault();
                toggleTheme();
                
                // Feedback visual no botão
                if (themeToggle) {
                    themeToggle.style.boxShadow = '0 0 0 3px rgba(74, 158, 255, 0.5)';
                    setTimeout(() => {
                        themeToggle.style.boxShadow = '';
                    }, 200);
                }
            }
        });
    }
    
    /**
     * Função para ser chamada por outros scripts
     * @param {string} theme - 'light', 'dark' ou 'toggle'
     */
    function setTheme(theme) {
        if (theme === 'toggle') {
            toggleTheme();
        } else if (theme === 'light' || theme === 'dark') {
            applyTheme(theme);
            localStorage.setItem(STORAGE_KEY, theme);
            showThemeNotification(theme);
        } else {
            console.warn('Tema inválido:', theme, '. Use "light", "dark" ou "toggle"');
        }
    }
    
    /**
     * Função para obter o tema atual
     * @returns {string} 'light' ou 'dark'
     */
    function getTheme() {
        return getCurrentTheme();
    }
    
    /**
     * Função para configurar logos personalizados
     * @param {Object} logoConfig - Objeto com configuração dos logos
     */
    function setLogoConfig(logoConfig) {
        if (logoConfig && typeof logoConfig === 'object') {
            Object.assign(LOGO_CONFIG, logoConfig);
            console.log('Configuração de logos atualizada:', LOGO_CONFIG);
            
            // Pré-carregar novos logos
            preloadLogos();
            
            // Atualizar logo atual
            updateLogo(getCurrentTheme());
        }
    }
    
    // Disponibilizar funções globalmente para outros scripts
    window.ThemeManager = {
        setTheme: setTheme,
        getTheme: getTheme,
        toggleTheme: toggleTheme,
        getCurrentTheme: getCurrentTheme,
        setLogoConfig: setLogoConfig,
        updateLogo: updateLogo
    };
    
    // Inicializar o sistema
    initializeThemeSystem();
    
    // Debug: Adicionar informações no console
    if (typeof console !== 'undefined' && console.log) {
        console.log('🎨 Sistema de Temas TrackParts carregado!');
        console.log('💡 Use Ctrl+Shift+T para alternar entre temas');
        console.log('🔧 Acesse window.ThemeManager para controle programático');
        console.log('🖼️ Logos configurados:', LOGO_CONFIG);
        console.log('📱 Tema atual:', getCurrentTheme());
    }
});

/**
 * Função de compatibilidade para outros scripts que possam depender
 * da função antiga de alternância de tema
 */
function toggleTheme() {
    if (window.ThemeManager && typeof window.ThemeManager.toggleTheme === 'function') {
        window.ThemeManager.toggleTheme();
    }
}

/**
 * Event listener para o evento de carregamento completo da página
 * Garante que o tema seja aplicado mesmo se o script for carregado tardiamente
 */
window.addEventListener('load', function() {
    // Verificar se o tema foi aplicado corretamente
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (!currentTheme) {
        console.warn('Tema não detectado, aplicando tema padrão...');
        const savedTheme = localStorage.getItem('trackparts-theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        document.body.setAttribute('data-theme', savedTheme);
        
        // Aplicar logo correto
        if (window.ThemeManager && typeof window.ThemeManager.updateLogo === 'function') {
            window.ThemeManager.updateLogo(savedTheme);
        }
    }
});

/**
 * Listener para mudanças de visibilidade da página
 * Útil para sincronizar tema quando o usuário volta para a aba
 */
document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
        // Página ficou visível, verificar se o tema está sincronizado
        const savedTheme = localStorage.getItem('trackparts-theme');
        const currentTheme = document.documentElement.getAttribute('data-theme');
        
        if (savedTheme && savedTheme !== currentTheme) {
            console.log('Sincronizando tema após mudança de visibilidade');
            if (window.ThemeManager && typeof window.ThemeManager.setTheme === 'function') {
                window.ThemeManager.setTheme(savedTheme);
            }
        }
    }
});

/**
 * Proteção contra erros
 * Envolve o script principal em try-catch para evitar quebrar outros scripts
 */
window.addEventListener('error', function(e) {
    if (e.filename && e.filename.includes('temas-user.js')) {
        console.error('Erro no sistema de temas:', e.error);
        // Aplicar tema padrão em caso de erro
        try {
            document.documentElement.setAttribute('data-theme', 'light');
            document.body.setAttribute('data-theme', 'light');
            
            // Aplicar logo padrão
            const logoImg = document.getElementById('logo-img');
            if (logoImg) {
                logoImg.src = 'imagens/logo.png';
            }
        } catch (fallbackError) {
            console.error('Erro crítico no sistema de temas:', fallbackError);
        }
    }
});

/**
 * Função utilitária para detectar se o usuário prefere tema escuro
 * Pode ser usada por outros componentes do sistema
 */
function userPrefersColorScheme(scheme) {
    if (!window.matchMedia) return false;
    return window.matchMedia(`(prefers-color-scheme: ${scheme})`).matches;
}

/**
 * Função utilitária para detectar se o dispositivo suporta hover
 * Útil para ajustar interações baseadas no tipo de dispositivo
 */
function deviceSupportsHover() {
    if (!window.matchMedia) return true;
    return window.matchMedia('(hover: hover)').matches;
}

// Disponibilizar funções utilitárias globalmente
window.ThemeUtils = {
    userPrefersColorScheme: userPrefersColorScheme,
    deviceSupportsHover: deviceSupportsHover
};