document.addEventListener('DOMContentLoaded', function() {
    // Elementos do formulário
    const loginForm = document.getElementById('login-form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const rememberMeCheckbox = document.getElementById('remember-me');
    const loginButton = document.getElementById('login-button');
    const loadingSpinner = document.getElementById('loading-spinner');
    const errorAlert = document.getElementById('alert-error');
    const successAlert = document.getElementById('alert-success');
    
    // Elementos do tema
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle?.querySelector('.theme-icon');
    const htmlElement = document.documentElement;
    const logoImg = document.getElementById('logo-img');
    
    // Verificar se os elementos existem antes de prosseguir
    if (!themeToggle || !themeIcon) {
        console.error('Elementos do tema não encontrados');
        return;
    }
    
    // Verificar tema salvo no localStorage
    const currentTheme = localStorage.getItem('trackparts_theme') || 'light';
    console.log('Tema atual:', currentTheme); // Debug
    
    // Aplicar tema inicial
    htmlElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);
    updateLogo(currentTheme);
    
    // Função para atualizar o ícone do tema
    function updateThemeIcon(theme) {
        console.log('Atualizando ícone para tema:', theme); // Debug
        if (theme === 'dark') {
            themeIcon.textContent = '☀️';
        } else {
            themeIcon.textContent = '🌙';
        }
    }
    
    // Função para atualizar o logo baseado no tema
    function updateLogo(theme) {
        if (!logoImg) return; // Se não há logo, ignora
        
        console.log('Atualizando logo para tema:', theme); // Debug
        
        if (theme === 'dark') {
            // Logo para modo escuro (assumindo que existe uma versão dark)
            logoImg.src = 'imagens/logoDark.png';
        } else {
            // Logo para modo claro
            logoImg.src = 'imagens/logo.png';
        }
        
        // Fallback: se a imagem não carregar, manter a original
        logoImg.onerror = function() {
            console.log('Erro ao carregar logo, usando fallback'); // Debug
            if (theme === 'dark') {
                this.src = 'imagens/logo.png'; // Volta para o logo original se não encontrar o dark
            }
        };
    }
    
    // Alternar tema - EVENT LISTENER PRINCIPAL
    themeToggle.addEventListener('click', function(event) {
        event.preventDefault();
        console.log('Clique no botão de tema detectado'); // Debug
        
        const currentTheme = htmlElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        console.log('Mudando de', currentTheme, 'para', newTheme); // Debug
        
        // Aplicar o novo tema
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('trackparts_theme', newTheme);
        updateThemeIcon(newTheme);
        updateLogo(newTheme);
        
        // Forçar repaint do browser
        htmlElement.style.transition = 'all 0.3s ease';
        
        // Debug - verificar se o atributo foi aplicado
        setTimeout(() => {
            console.log('Atributo data-theme após mudança:', htmlElement.getAttribute('data-theme'));
        }, 100);
    });

    // Verificar se há um email salvo
    const savedEmail = localStorage.getItem('trackparts_email');
    if (savedEmail && emailInput) {
        emailInput.value = savedEmail;
        if (rememberMeCheckbox) {
            rememberMeCheckbox.checked = true;
        }
    }

    // Função para mostrar mensagem de erro
    function showError(message) {
        if (errorAlert) {
            errorAlert.textContent = message;
            errorAlert.style.display = 'block';
        }
        if (successAlert) {
            successAlert.style.display = 'none';
        }
    }

    // Função para mostrar mensagem de sucesso
    function showSuccess(message) {
        if (successAlert) {
            successAlert.textContent = message;
            successAlert.style.display = 'block';
        }
        if (errorAlert) {
            errorAlert.style.display = 'none';
        }
    }

    // Tratamento do envio do formulário
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = emailInput?.value.trim() || '';
            const password = passwordInput?.value.trim() || '';
            const rememberMe = rememberMeCheckbox?.checked || false;
            
            // Validação básica
            if (!email) {
                showError('Por favor, insira seu e-mail.');
                return;
            }
            
            if (!password) {
                showError('Por favor, insira sua senha.');
                return;
            }

            // Desabilitar botão e mostrar loading
            if (loginButton) {
                loginButton.disabled = true;
            }
            if (loadingSpinner) {
                loadingSpinner.style.display = 'inline-block';
            }
            
            // Simular autenticação
            setTimeout(function() {
                const validCredentials = [
                    { email: 'admin@exemplo.com', password: 'admin123', userType: 'admin' },
                    { email: 'usuario@exemplo.com', password: 'user123', userType: 'normal' }
                ];
                
                const userMatch = validCredentials.find(user => 
                    user.email === email && user.password === password
                );
                
                if (userMatch) {
                    // Salvar email se "lembrar-me" estiver marcado
                    if (rememberMe) {
                        localStorage.setItem('trackparts_email', email);
                    } else {
                        localStorage.removeItem('trackparts_email');
                    }
                    
                    localStorage.setItem('trackparts_userType', userMatch.userType);
                    showSuccess('Login realizado com sucesso! Redirecionando...');
                    
                    setTimeout(function() {
                        if (userMatch.userType === 'admin') {
                            window.location.href = 'admin/admin.html';
                        } else {
                            window.location.href = 'usuario/user.html';
                        }
                    }, 1500);
                } else {
                    showError('E-mail ou senha incorretos. Por favor, tente novamente.');
                    if (loginButton) {
                        loginButton.disabled = false;
                    }
                    if (loadingSpinner) {
                        loadingSpinner.style.display = 'none';
                    }
                }
            }, 1500);
        });
    }
    
    // Debug - testar se o CSS está funcionando
    console.log('Variáveis CSS carregadas:', getComputedStyle(htmlElement).getPropertyValue('--bg-color'));
});