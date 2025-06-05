
/**
 * Sistema de Rastreabilidade de Peças - Negrão Ferragens
 * Módulo de Gerenciamento de Temas (Claro/Escuro) - VERSÃO ATUALIZADA
 * Agora com suporte a mudança de logo e ícone centralizado
 */

(function() {
    'use strict';
    
    // Aguardar o carregamento completo do DOM
    document.addEventListener('DOMContentLoaded', function() {
        initializeThemeSystem();
    });

    function initializeThemeSystem() {
        console.log('Inicializando sistema de temas...');
        
        // Elementos do tema
        const themeToggle = document.getElementById('theme-toggle');
        const themeIcon = document.querySelector('.theme-icon');
        const htmlElement = document.documentElement;
        const bodyElement = document.body;
        const logoImg = document.getElementById('logo-img');
        
        // Verificar se os elementos existem
        if (!themeToggle) {
            console.error('Botão de tema não encontrado! Verifique se o ID "theme-toggle" existe no HTML.');
            return;
        }
        
        if (!themeIcon) {
            console.error('Ícone do tema não encontrado! Verifique se a classe "theme-icon" existe no HTML.');
            return;
        }
        
        console.log('Elementos encontrados:', {
            themeToggle: !!themeToggle,
            themeIcon: !!themeIcon,
            htmlElement: !!htmlElement,
            bodyElement: !!bodyElement,
            logoImg: !!logoImg
        });
        
        // Verificar tema salvo no localStorage
        let currentTheme = getInitialTheme();
        console.log('Tema inicial determinado:', currentTheme);
        
        // Aplicar tema inicial
        applyTheme(currentTheme);
        
        // Event listener principal - Alternar tema ao clicar no botão
        themeToggle.addEventListener('click', function(event) {
            event.preventDefault();
            console.log('Clique no botão de tema detectado');
            
            // Obter tema atual e determinar o novo
            const currentTheme = htmlElement.getAttribute('data-theme') || 'light';
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            console.log('Alternando tema:', currentTheme, '->', newTheme);
            
            // Aplicar o novo tema
            applyTheme(newTheme);
            
            // Salvar preferência
            saveThemePreference(newTheme);
            
            // Adicionar feedback visual
            addToggleFeedback();
            
            // Mostrar notificação
            showThemeNotification(newTheme);
            
            // Disparar evento customizado
            dispatchThemeChangeEvent(currentTheme, newTheme);
        });
        
        // Event listener para atalho de teclado (Ctrl + Shift + T)
        document.addEventListener('keydown', function(e) {
            if (e.ctrlKey && e.shiftKey && e.key === 'T') {
                e.preventDefault();
                console.log('Atalho de teclado para alternar tema detectado');
                themeToggle.click();
            }
        });
        
        // Event listener para mudanças na preferência do sistema
        setupSystemPreferenceListener();
        
        // Adicionar estilos de transição
        addTransitionStyles();
        
        // Expor funções globais
        exposeGlobalFunctions();
        
        console.log('Sistema de temas inicializado com sucesso');
        
        // Funções internas
        function getInitialTheme() {
            // 1. Verificar se há tema salvo no localStorage
            const savedTheme = localStorage.getItem('trackparts-theme');
            if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
                console.log('Tema encontrado no localStorage:', savedTheme);
                return savedTheme;
            }
            
            // 2. Verificar preferência do sistema
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                console.log('Preferência do sistema: modo escuro');
                return 'dark';
            }
            
            // 3. Padrão: modo claro
            console.log('Usando tema padrão: claro');
            return 'light';
        }
        
        function applyTheme(theme) {
            console.log('Aplicando tema:', theme);
            
            // Aplicar atributo data-theme no HTML e body
            htmlElement.setAttribute('data-theme', theme);
            bodyElement.setAttribute('data-theme', theme);
            
            // Atualizar ícone
            updateThemeIcon(theme);
            
            // Atualizar logo
            updateLogo(theme);
            
            // Atualizar meta theme-color para dispositivos móveis
            updateMetaThemeColor(theme);
            
            // Atualizar título do botão para acessibilidade
            updateButtonTitle(theme);
            
            console.log('Tema aplicado com sucesso:', theme);
        }
        
        function updateThemeIcon(theme) {
            if (!themeIcon) return;
            
            console.log('Atualizando ícone para tema:', theme);
            
            if (theme === 'dark') {
                themeIcon.textContent = '☀️'; // Sol para indicar que vai para modo claro
            } else {
                themeIcon.textContent = '🌙'; // Lua para indicar que vai para modo escuro
            }
            
            // Adicionar animação de rotação
            themeIcon.style.transform = 'rotate(360deg)';
            setTimeout(() => {
                themeIcon.style.transform = 'rotate(0deg)';
            }, 300);
        }
        
        function updateLogo(theme) {
            if (!logoImg) {
                console.log('Logo não encontrado');
                return;
            }
            
            console.log('Atualizando logo para tema:', theme);
            
            // Obter o caminho atual da imagem
            const currentSrc = logoImg.src;
            let newSrc;
            
            if (theme === 'dark') {
                // Para modo escuro, usar logo claro (logo.png)
                if (currentSrc.includes('logoDark.png')) {
                    newSrc = currentSrc.replace('logoDark.png', 'logoDark.png');
                } else if (currentSrc.includes('logoDark.png')) {
                    // Já está usando o logo claro, não precisa trocar
                    console.log('Logo já está correto para modo escuro');
                    return;
                } else {
                    // Se não encontrar um padrão conhecido, assumir pasta imagens
                    newSrc = currentSrc.replace(/\/[^\/]*\.png$/, '/logoDark.png');
                }
            } else {
                // Para modo claro, usar logo escuro (logoDark.png)
                if (currentSrc.includes('logo.png') && !currentSrc.includes('logo.png')) {
                    newSrc = currentSrc.replace('logo.png', 'logo.png');
                } else if (currentSrc.includes('logo.png')) {
                    // Já está usando o logo escuro, não precisa trocar
                    console.log('Logo já está correto para modo claro');
                    return;
                } else {
                    // Se não encontrar um padrão conhecido, assumir pasta imagens
                    newSrc = currentSrc.replace(/\/[^\/]*\.png$/, '/logo.png');
                }
            }
            
            // Verificar se a nova imagem existe antes de aplicar
            const img = new Image();
            img.onload = function() {
                logoImg.src = newSrc;
                console.log('Logo atualizado para:', newSrc);
            };
            img.onerror = function() {
                console.warn('Logo não encontrado para o tema:', newSrc);
                console.log('Mantendo logo atual:', currentSrc);
                // Se não encontrar a imagem específica do tema, manter a atual
            };
            img.src = newSrc;
        }
        
        function updateMetaThemeColor(theme) {
            let metaThemeColor = document.querySelector('meta[name="theme-color"]');
            
            if (!metaThemeColor) {
                metaThemeColor = document.createElement('meta');
                metaThemeColor.name = 'theme-color';
                document.head.appendChild(metaThemeColor);
            }
            
            const themeColors = {
                light: '#ffffff',
                dark: '#2a2a2a'
            };
            
            metaThemeColor.content = themeColors[theme];
        }
        
        function updateButtonTitle(theme) {
            if (!themeToggle) return;
            
            const titles = {
                light: 'Ativar modo escuro (Ctrl + Shift + T)',
                dark: 'Ativar modo claro (Ctrl + Shift + T)'
            };
            
            themeToggle.setAttribute('title', titles[theme]);
            themeToggle.setAttribute('aria-label', titles[theme]);
        }
        
        function saveThemePreference(theme) {
            try {
                localStorage.setItem('trackparts-theme', theme);
                console.log('Preferência de tema salva:', theme);
            } catch (error) {
                console.error('Erro ao salvar preferência de tema:', error);
            }
        }
        
        function showThemeNotification(theme) {
            const messages = {
                light: 'Modo claro ativado',
                dark: 'Modo escuro ativado'
            };
            
            // Verificar se a função showNotification existe
            if (typeof window.showNotification === 'function') {
                window.showNotification(messages[theme], 'info');
            } else {
                // Criar uma notificação simples se a função não existir
                createSimpleNotification(messages[theme]);
            }
        }
        
        function createSimpleNotification(message) {
            // Criar notificação simples
            const notification = document.createElement('div');
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: var(--card-bg, #fff);
                color: var(--text-primary, #333);
                padding: 15px 20px;
                border-radius: 5px;
                box-shadow: 0 3px 10px rgba(0,0,0,0.2);
                z-index: 1000;
                font-family: inherit;
                border-left: 4px solid var(--primary-color, #333);
                transform: translateX(100%);
                transition: transform 0.3s ease;
            `;
            notification.textContent = message;
            document.body.appendChild(notification);
            
            // Mostrar
            setTimeout(() => {
                notification.style.transform = 'translateX(0)';
            }, 10);
            
            // Remover após 3 segundos
            setTimeout(() => {
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                }, 300);
            }, 3000);
        }
        
        function addToggleFeedback() {
            if (!themeToggle) return;
            
            // Efeito de pulse mais suave
            themeToggle.style.transform = 'scale(0.9)';
            setTimeout(() => {
                themeToggle.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    themeToggle.style.transform = 'scale(1)';
                }, 150);
            }, 150);
        }
        
        function dispatchThemeChangeEvent(previousTheme, newTheme) {
            const event = new CustomEvent('themeChanged', {
                detail: {
                    previousTheme,
                    newTheme,
                    timestamp: new Date().toISOString()
                }
            });
            document.dispatchEvent(event);
        }
        
        function setupSystemPreferenceListener() {
            if (window.matchMedia) {
                const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
                
                mediaQuery.addEventListener('change', function(e) {
                    // Só aplicar se o usuário não tiver preferência salva
                    if (!localStorage.getItem('trackparts-theme')) {
                        const newTheme = e.matches ? 'dark' : 'light';
                        console.log('Preferência do sistema alterada para:', newTheme);
                        
                        applyTheme(newTheme);
                        showThemeNotification(newTheme);
                    }
                });
            }
        }
        
        function addTransitionStyles() {
            if (!document.getElementById('theme-transition-styles')) {
                const style = document.createElement('style');
                style.id = 'theme-transition-styles';
                style.textContent = `
                    html.theme-transition,
                    html.theme-transition *,
                    html.theme-transition *:before,
                    html.theme-transition *:after {
                        transition: background-color 300ms ease,
                                   color 300ms ease,
                                   border-color 300ms ease,
                                   box-shadow 300ms ease !important;
                        transition-delay: 0s !important;
                    }
                    
                    /* Ícone do tema - centralizado e com animação */
                    .theme-icon {
                        transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        width: 100%;
                        height: 100%;
                        font-size: 1.2em;
                        line-height: 1;
                    }
                    
                    /* Botão de tema - melhorado */
                    .theme-toggle {
                        transition: transform 0.2s ease, box-shadow 0.2s ease;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                    
                    .theme-toggle:active .theme-icon {
                        transform: rotate(360deg) scale(0.8);
                    }
                    
                    /* Logo com transição suave */
                    #logo-img {
                        transition: opacity 0.3s ease;
                    }
                    
                    /* Efeito de fade ao trocar o logo */
                    .logo-changing #logo-img {
                        opacity: 0.7;
                    }
                `;
                document.head.appendChild(style);
            }
        }
        
        function exposeGlobalFunctions() {
            // Funções utilitárias globais para compatibilidade
            window.toggleTheme = function() {
                themeToggle.click();
            };
            
            window.getCurrentTheme = function() {
                return htmlElement.getAttribute('data-theme') || 'light';
            };
            
            window.setTheme = function(theme) {
                if (theme === 'light' || theme === 'dark') {
                    applyTheme(theme);
                    saveThemePreference(theme);
                    showThemeNotification(theme);
                }
            };
            
            window.isDarkMode = function() {
                return window.getCurrentTheme() === 'dark';
            };
            
            window.isLightMode = function() {
                return window.getCurrentTheme() === 'light';
            };
            
            // Nova função para atualizar logo manualmente
            window.updateThemeLogo = function(theme) {
                updateLogo(theme || window.getCurrentTheme());
            };
        }
    }
})();
