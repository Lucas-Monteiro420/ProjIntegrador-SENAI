
/**
 * Sistema de Rastreabilidade de Peças - Negrão Ferragens
 * Script principal para gerenciar todas as funcionalidades do sistema
 */

document.addEventListener('DOMContentLoaded', function() {
    // Inicialização do sistema
    initializeSystem();
});

/**
 * Inicializa todos os componentes do sistema
 */
function initializeSystem() {
    // Inicializar componentes da interface
    initializeDashboard();
    initializeInventory();
    initializeTracking();
    initializeApprovals();
    initializeReports();
    initializeModals();
    initializeHelpPanel();
    
    // Adicionar listeners globais
    addGlobalEventListeners();
    
    // Carregar dados iniciais (simulados)
    loadInitialData();
    
    // Mostrar notificação de boas-vindas
    showNotification('Bem-vindo ao Sistema de Rastreabilidade de Peças', 'info');
}


/**
 * Simula o carregamento de dados iniciais do servidor
 */
function loadInitialData() {
    // Simular dados de inventário (em produção seria uma chamada AJAX)
    inventoryData = [
        {
            id: 'TP-10023',
            description: 'Engrenagem 15mm',
            location: 'Depósito A - Prateleira 3',
            quantity: 45,
            status: 'available',
            lastUpdated: '14/04/2025 10:24',
            history: [
                {date: '12/04/2025', from: 'Depósito B', to: 'Depósito A - Prateleira 3', responsible: 'Maria Oliveira'},
                {date: '05/04/2025', from: 'Recebimento', to: 'Depósito B', responsible: 'Carlos Santos'}
            ]
        },
        {
            id: 'TP-10024',
            description: 'Kit Manutenção Tipo B',
            location: 'Depósito B - Seção 7',
            quantity: 12,
            status: 'low',
            lastUpdated: '13/04/2025 14:15',
            history: [
                {date: '13/04/2025', from: 'Depósito A', to: 'Depósito B - Seção 7', responsible: 'João Silva'},
                {date: '02/04/2025', from: 'Fornecedor', to: 'Depósito A', responsible: 'Carlos Santos'}
            ]
        },
        {
            id: 'TP-10025',
            description: 'Sensor de Pressão',
            location: 'Setor de Produção',
            quantity: 8,
            status: 'reserved',
            lastUpdated: '14/04/2025 09:20',
            history: [
                {date: '14/04/2025', from: 'Depósito A', to: 'Setor de Produção', responsible: 'Pedro Almeida'},
                {date: '10/04/2025', from: 'Fornecedor', to: 'Depósito A', responsible: 'Maria Oliveira'}
            ]
        }
    ];
    
    // Simular dados de aprovações pendentes
    approvalsData = [
        {
            id: 'REQ-2023-042',
            date: '14/04/2025',
            requester: 'João Silva',
            item: 'Kit de Manutenção Tipo A',
            quantity: 1,
            justification: 'Manutenção programada da linha 3',
            status: 'pending'
        },
        {
            id: 'REQ-2023-043',
            date: '14/04/2025',
            requester: 'Maria Oliveira',
            item: 'Sensores de temperatura',
            quantity: 5,
            justification: 'Substituição de componentes com desgaste',
            status: 'pending'
        }
    ];
    
    // Atualizar o contador de aprovações pendentes no Dashboard
    updatePendingApprovalsCount();
    
    // Atualizar a tabela de inventário com os dados iniciais
    refreshInventoryTable();
}

/**
 * Inicializa o painel de dashboard
 */
function initializeDashboard() {
    console.log('Dashboard inicializado');
    // Aqui seriam adicionadas chamadas para carregar gráficos e métricas em tempo real
}

/**
 * Inicializa o sistema de inventário e busca
 */
function initializeInventory() {
    // Configurar o campo de busca
    const searchInput = document.querySelector('#inventory input[type="text"]');
    const searchButton = document.querySelector('#inventory .btn-primary');
    
    if (searchInput && searchButton) {
        searchButton.addEventListener('click', function() {
            searchInventory(searchInput.value);
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchInventory(searchInput.value);
            }
        });
    }
    
    // Configurar o botão de cadastrar peça
    const addItemButton = document.querySelector('.btn-add-item');
    if (addItemButton) {
        addItemButton.addEventListener('click', function() {
            openAddItemModal();
        });
    }
    
    // Configurar o histórico de buscas
    initializeSearchHistory();
    
    // Adicionar listeners para os botões de ação na tabela de inventário
    addInventoryTableListeners();
}

/**
 * Inicializa o sistema de rastreamento
 */
function initializeTracking() {
    // Configurar o scanner de QR/RFID
    const trackButton = document.querySelector('.tracking-scanner .btn-primary');
    const trackInput = document.querySelector('.tracking-scanner input[type="text"]');
    
    if (trackButton && trackInput) {
        trackButton.addEventListener('click', function() {
            if (trackInput.value.trim() !== '') {
                trackItem(trackInput.value);
            } else {
                showNotification('Digite um código para rastrear', 'warning');
            }
        });
        
        trackInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && trackInput.value.trim() !== '') {
                trackItem(trackInput.value);
            }
        });
    }
}

/**
 * Inicializa o sistema de aprovações
 */
function initializeApprovals() {
    // Adicionar event listeners para os botões de aprovar e rejeitar
    document.querySelectorAll('.btn-approve').forEach(button => {
        button.addEventListener('click', function() {
            const approvalItem = this.closest('.approval-item');
            const approvalId = approvalItem.querySelector('.approval-id').textContent;
            approveRequest(approvalId, approvalItem);
        });
    });
    
    document.querySelectorAll('.btn-reject').forEach(button => {
        button.addEventListener('click', function() {
            const approvalItem = this.closest('.approval-item');
            const approvalId = approvalItem.querySelector('.approval-id').textContent;
            rejectRequest(approvalId, approvalItem);
        });
    });
}

/**
 * Inicializa relatórios e gráficos
 */
function initializeReports() {
    // Em produção, aqui seriam carregados os gráficos com dados reais
    console.log('Sistema de relatórios inicializado');
}

/**
 * Inicializa todos os modais do sistema
 */
function initializeModals() {
    // Configurar botões para fechar modais
    document.querySelectorAll('.modal-close, .modal-cancel').forEach(button => {
        button.addEventListener('click', function() {
            closeAllModals();
        });
    });
    
    // Configurar submissão do formulário de adicionar item
    const addItemForm = document.getElementById('form-add-item');
    if (addItemForm) {
        addItemForm.addEventListener('submit', function(e) {
            e.preventDefault();
            addNewItem();
        });
    }
    
    // Configurar submissão do formulário de movimentação
    const moveItemForm = document.getElementById('form-move-item');
    if (moveItemForm) {
        moveItemForm.addEventListener('submit', function(e) {
            e.preventDefault();
            moveItem();
        });
    }
    
    // Fechar modais quando clica fora
    window.addEventListener('click', function(e) {
        document.querySelectorAll('.modal').forEach(modal => {
            if (e.target === modal) {
                closeAllModals();
            }
        });
    });
}

/**
 * Inicializa o painel de ajuda lateral
 */
function initializeHelpPanel() {
    const helpToggle = document.querySelector('.help-toggle');
    const helpPanel = document.querySelector('.help-panel');
    
    if (helpToggle && helpPanel) {
        helpToggle.addEventListener('click', function() {
            helpPanel.classList.toggle('open');
        });
    }
    
    // Configurar botão de suporte
    const supportButton = document.querySelector('.btn-support');
    if (supportButton) {
        supportButton.addEventListener('click', function() {
            showSupportContactModal();
        });
    }
}

/**
 * Adiciona event listeners globais para navegação e interações comuns
 */
function addGlobalEventListeners() {
    // Navegação entre seções
    document.querySelectorAll('.main-menu a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            showSection(targetId);
        });
    });
    
   // Capturar o botão de logout
    const logoutButton = document.querySelector('.btn-logout');

    // Adicionar evento de clique
    if (logoutButton) {
        logoutButton.addEventListener('click', function(e) {
            e.preventDefault(); // Prevenir o comportamento padrão do link
            
            // Redirecionar para a página de login com caminho relativo correto
            window.location.href = '../login/index.html';
        });
    }
}

/**
 * Adiciona event listeners para os botões na tabela de inventário
 */
function addInventoryTableListeners() {
    // Botões de detalhes
    document.querySelectorAll('.btn-details').forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            const itemId = row.querySelector('td:first-child').textContent;
            openDetailsModal(itemId);
        });
    });
    
    // Botões de movimentação
    document.querySelectorAll('.btn-move').forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            const itemId = row.querySelector('td:first-child').textContent;
            openMoveModal(itemId);
        });
    });
}

/**
 * Inicializa o componente de histórico de buscas
 */
function initializeSearchHistory() {
    // Carregar histórico salvo, se existir
    let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    
    // Renderizar histórico
    renderSearchHistory(searchHistory);
    
    // Configurar botão de limpar histórico
    const clearHistoryButton = document.querySelector('.search-history-container .btn-secondary');
    if (clearHistoryButton) {
        clearHistoryButton.addEventListener('click', function() {
            clearSearchHistory();
        });
    }
}

/**
 * Renderiza os itens do histórico de busca
 * @param {Array} history - Array de strings com os termos de busca
 */
function renderSearchHistory(history) {
    const historyContainer = document.querySelector('.search-history-items');
    if (!historyContainer) return;
    
    historyContainer.innerHTML = '';
    
    history.forEach(term => {
        const historyItem = document.createElement('span');
        historyItem.className = 'search-history-item';
        historyItem.textContent = term;
        historyItem.addEventListener('click', function() {
            const searchInput = document.querySelector('#inventory input[type="text"]');
            if (searchInput) {
                searchInput.value = term;
                searchInventory(term);
            }
        });
        
        historyContainer.appendChild(historyItem);
    });
}

/**
 * Limpa o histórico de buscas
 */
function clearSearchHistory() {
    localStorage.removeItem('searchHistory');
    renderSearchHistory([]);
    showNotification('Histórico de buscas limpo', 'info');
}

/**
 * Adiciona um termo ao histórico de buscas
 * @param {string} term - Termo de busca
 */
function addToSearchHistory(term) {
    if (!term) return;
    
    let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    
    // Remover duplicatas
    searchHistory = searchHistory.filter(item => item !== term);
    
    // Adicionar no início
    searchHistory.unshift(term);
    
    // Limitar a 5 itens
    if (searchHistory.length > 5) {
        searchHistory = searchHistory.slice(0, 5);
    }
    
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    renderSearchHistory(searchHistory);
}

/**
 * Realiza a busca no inventário
 * @param {string} searchTerm - Termo de busca
 */
function searchInventory(searchTerm) {
    if (!searchTerm) return;
    
    searchTerm = searchTerm.toLowerCase().trim();
    addToSearchHistory(searchTerm);
    
    // Filtrar os dados de inventário
    const filteredData = inventoryData.filter(item => {
        return item.id.toLowerCase().includes(searchTerm) ||
               item.description.toLowerCase().includes(searchTerm) ||
               item.location.toLowerCase().includes(searchTerm);
    });
    
    // Atualizar a tabela
    refreshInventoryTable(filteredData);
    
    // Atualizar a informação de resultados
    const resultsInfo = document.querySelector('.search-results-info span');
    if (resultsInfo) {
        if (filteredData.length === 0) {
            resultsInfo.textContent = `Nenhum resultado encontrado para "${searchTerm}"`;
            resultsInfo.className = 'no-results';
        } else {
            resultsInfo.textContent = `Mostrando ${filteredData.length} item(s) para "${searchTerm}"`;
            resultsInfo.className = 'search-count';
        }
    }
}

/**
 * Atualiza a tabela de inventário com os dados filtrados
 * @param {Array} [data] - Dados para exibir. Se não fornecido, usa todos os dados.
 */
function refreshInventoryTable(data) {
    const tableBody = document.querySelector('.inventory-table tbody');
    if (!tableBody) return;
    
    // Se não houver dados específicos, usar todos os dados
    data = data || inventoryData;
    
    tableBody.innerHTML = '';
    
    data.forEach(item => {
        const row = document.createElement('tr');
        
        // Definir o status em formato legível
        let statusText = 'Disponível';
        let statusClass = 'available';
        
        if (item.status === 'low') {
            statusText = 'Estoque Baixo';
            statusClass = 'low';
        } else if (item.status === 'reserved') {
            statusText = 'Reservado';
            statusClass = 'reserved';
        }
        
        row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.description}</td>
            <td>${item.location}</td>
            <td>${item.quantity}</td>
            <td><span class="status ${statusClass}">${statusText}</span></td>
            <td>
                <button class="btn-action btn-details">Detalhes</button>
                <button class="btn-action btn-move">Movimentar</button>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
    
    // Reconfigurar os event listeners dos botões
    addInventoryTableListeners();
}

/**
 * Abre o modal para adicionar nova peça
 */
function openAddItemModal() {
    const modal = document.getElementById('modal-add-item');
    
    // Limpar campos do formulário
    document.getElementById('item-code').value = '';
    document.getElementById('item-description').value = '';
    document.getElementById('item-location').value = '';
    document.getElementById('item-sublocation').value = '';
    document.getElementById('item-quantity').value = '1';
    document.getElementById('item-status').value = 'available';
    
    // Exibir o modal
    if (modal) {
        modal.style.display = 'block';
    }
}

/**
 * Abre o modal com detalhes da peça
 * @param {string} itemId - ID da peça
 */
function openDetailsModal(itemId) {
    const item = findItemById(itemId);
    if (!item) {
        showNotification('Peça não encontrada', 'error');
        return;
    }
    
    // Preencher os detalhes da peça
    document.getElementById('detail-code').textContent = item.id;
    document.getElementById('detail-description').textContent = item.description;
    document.getElementById('detail-location').textContent = item.location;
    document.getElementById('detail-quantity').textContent = item.quantity;
    
    // Definir o status em formato legível
    let statusText = 'Disponível';
    let statusClass = 'available';
    
    if (item.status === 'low') {
        statusText = 'Estoque Baixo';
        statusClass = 'low';
    } else if (item.status === 'reserved') {
        statusText = 'Reservado';
        statusClass = 'reserved';
    }
    
    const statusElement = document.getElementById('detail-status');
    statusElement.textContent = statusText;
    statusElement.className = `detail-value status ${statusClass}`;
    
    document.getElementById('detail-updated').textContent = item.lastUpdated;
    
    // Preencher o histórico de movimentações
    const historyTableBody = document.getElementById('history-table-body');
    historyTableBody.innerHTML = '';
    
    item.history.forEach(entry => {
        const historyRow = document.createElement('tr');
        historyRow.innerHTML = `
            <td>${entry.date}</td>
            <td>${entry.from}</td>
            <td>${entry.to}</td>
            <td>${entry.responsible}</td>
        `;
        historyTableBody.appendChild(historyRow);
    });
    
    // Exibir o modal
    const modal = document.getElementById('modal-details');
    if (modal) {
        modal.style.display = 'block';
    }
    
    // Configurar botão de abrir modal de movimentação
    const moveButton = document.querySelector('.btn-open-move');
    if (moveButton) {
        moveButton.addEventListener('click', function() {
            closeAllModals();
            openMoveModal(itemId);
        });
    }
}

/**
 * Abre o modal para movimentar uma peça
 * @param {string} itemId - ID da peça
 */
function openMoveModal(itemId) {
    const item = findItemById(itemId);
    if (!item) {
        showNotification('Peça não encontrada', 'error');
        return;
    }
    
    // Preencher os dados da peça
    document.getElementById('move-code').textContent = item.id;
    document.getElementById('move-description').textContent = item.description;
    document.getElementById('move-current-location').textContent = item.location;
    
    // Definir quantidade máxima disponível
    document.getElementById('move-quantity').max = item.quantity;
    document.getElementById('move-quantity').value = 1;
    
    // Limpar outros campos
    document.getElementById('move-location').value = '';
    document.getElementById('move-sublocation').value = '';
    document.getElementById('move-reason').value = '';
    document.getElementById('move-notes').value = '';
    
    // Exibir o modal
    const modal = document.getElementById('modal-move');
    if (modal) {
        modal.style.display = 'block';
    }
}

/**
 * Fecha todos os modais abertos
 */
function closeAllModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.style.display = 'none';
    });
}

/**
 * Adiciona uma nova peça ao inventário
 */
function addNewItem() {
    const code = document.getElementById('item-code').value;
    const description = document.getElementById('item-description').value;
    const location = document.getElementById('item-location').value;
    const sublocation = document.getElementById('item-sublocation').value;
    const quantity = parseInt(document.getElementById('item-quantity').value);
    const status = document.getElementById('item-status').value;
    
    // Validação básica
    if (!code || !description || !location || !quantity) {
        showNotification('Preencha todos os campos obrigatórios', 'warning');
        return;
    }
    
    // Checar se o código já existe
    if (findItemById(code)) {
        showNotification('Código de peça já existe', 'error');
        return;
    }
    
    // Formatar a localização completa
    const fullLocation = sublocation ? `${location} - ${sublocation}` : location;
    
    // Criar o objeto da nova peça
    const newItem = {
        id: code,
        description: description,
        location: fullLocation,
        quantity: quantity,
        status: status,
        lastUpdated: getCurrentDateTime(),
        history: [
            {
                date: getCurrentDate(),
                from: 'Cadastro Inicial',
                to: fullLocation,
                responsible: 'Usuário' // Em produção usaria o usuário logado
            }
        ]
    };
    
    // Adicionar ao array de dados
    inventoryData.unshift(newItem);
    
    // Atualizar a tabela
    refreshInventoryTable();
    
    // Fechar o modal
    closeAllModals();
    
    // Mostrar notificação
    showNotification('Peça cadastrada com sucesso', 'success');
    
    // Atualizar o dashboard
    updateDashboardMetrics();
}

/**
 * Realiza a movimentação de uma peça
 */
function moveItem() {
    const itemId = document.getElementById('move-code').textContent;
    const newLocation = document.getElementById('move-location').value;
    const newSublocation = document.getElementById('move-sublocation').value;
    const moveQuantity = parseInt(document.getElementById('move-quantity').value);
    const reason = document.getElementById('move-reason').value;
    const notes = document.getElementById('move-notes').value;
    
    // Validação básica
    if (!newLocation || !reason) {
        showNotification('Preencha todos os campos obrigatórios', 'warning');
        return;
    }
    
    // Encontrar o item pelo ID
    const item = findItemById(itemId);
    if (!item) {
        showNotification('Peça não encontrada', 'error');
        return;
    }
    
    // Validar a quantidade
    if (moveQuantity <= 0 || moveQuantity > item.quantity) {
        showNotification('Quantidade inválida', 'warning');
        return;
    }
    
    // Obter a localização atual
    const currentLocation = item.location;
    
    // Formatar a nova localização completa
    const fullNewLocation = newSublocation ? `${newLocation} - ${newSublocation}` : newLocation;
    
    // Atualizar o histórico do item
    item.history.unshift({
        date: getCurrentDate(),
        from: currentLocation,
        to: fullNewLocation,
        responsible: 'Usuário' // Em produção usaria o usuário logado
    });
    
    // Atualizar a localização
    item.location = fullNewLocation;
    
    // Atualizar a data de última atualização
    item.lastUpdated = getCurrentDateTime();
    
    // Se movimentou toda a quantidade, atualizar o status conforme necessário
    if (moveQuantity === item.quantity) {
        // Se for para manutenção ou expedição, alterar o status
        if (newLocation === 'Manutenção') {
            item.status = 'reserved';
        } else if (newLocation === 'Expedição') {
            item.status = 'reserved';
        }
    } else {
        // Se movimentou apenas parte, criar um novo item
        const newItem = {
            id: generateNewItemId(itemId),
            description: item.description,
            location: fullNewLocation,
            quantity: moveQuantity,
            status: 'available',
            lastUpdated: getCurrentDateTime(),
            history: [
                {
                    date: getCurrentDate(),
                    from: currentLocation,
                    to: fullNewLocation,
                    responsible: 'Usuário' // Em produção usaria o usuário logado
                }
            ]
        };
        
        // Reduzir a quantidade do item original
        item.quantity -= moveQuantity;
        
        // Verificar se o item original agora tem estoque baixo
        if (item.quantity <= 10 && item.status === 'available') {
            item.status = 'low';
        }
        
        // Adicionar o novo item ao inventário
        inventoryData.unshift(newItem);
    }
    
    // Fechar o modal
    closeAllModals();
    
    // Atualizar a tabela
    refreshInventoryTable();
    
    // Mostrar notificação
    showNotification('Peça movimentada com sucesso', 'success');
    
    // Criar uma solicitação de aprovação para a movimentação
    createMovementApprovalRequest(itemId, fullNewLocation, moveQuantity, reason, notes);
    
    // Atualizar o dashboard
    updateDashboardMetrics();
}

// Adicionar após o carregamento do documento
document.addEventListener('DOMContentLoaded', function() {
    // Capturar o botão de logout
    const logoutButton = document.querySelector('.btn-logout');
    
    // Adicionar evento de clique
    if (logoutButton) {
        logoutButton.addEventListener('click', function(e) {
            e.preventDefault(); // Prevenir o comportamento padrão do link
            
            // Aqui você poderia adicionar lógica para limpar sessões/cookies
            // Por exemplo: localStorage.removeItem('userToken');
            
            // Redirecionar para a página de login
            window.location.href = '../index.html'; // ou qualquer outra página de login
        });
    }
});

/**
 * Sistema de Rastreabilidade de Peças - Negrão Ferragens
 * Módulo de geração de relatórios em PDF
 */

// Função para inicializar os listeners dos botões de relatório
function initializeReportButtons() {
    // Buscar todos os botões de relatório completo
    const reportButtons = document.querySelectorAll('.btn-report');
    
    // Adicionar o listener para cada botão
    reportButtons.forEach((button) => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Determinar o tipo de relatório baseado no ID do botão
            let reportType;
            if (this.id === 'report-consumption') {
                reportType = 'consumption';
            } else if (this.id === 'report-logistics') {
                reportType = 'logistics';
            } else if (this.id === 'report-inventory') {
                reportType = 'inventory';
            } else if (this.id === 'report-response-time') {
                reportType = 'responseTime';
            } else {
                // Fallback para o caso de botões sem ID específico
                const reportTypes = ['consumption', 'logistics', 'inventory', 'responseTime'];
                const index = Array.from(document.querySelectorAll('.btn-report')).indexOf(this);
                reportType = reportTypes[index] || 'consumption';
            }
            
            // Adicionar classe para feedback visual
            this.classList.add('generating');
            this.textContent = 'Gerando PDF...';
            
            // Gerar e baixar o PDF
            setTimeout(() => {
                generateReportPDF(reportType);
                
                // Restaurar o botão após um breve delay
                setTimeout(() => {
                    this.classList.remove('generating');
                    this.textContent = 'Ver relatório completo';
                }, 500);
            }, 800); // Delay para mostrar a animação
        });
    });
    
    console.log('Botões de relatório inicializados com sucesso.');
}

/**
 * Versão melhorada da função showNotification para notificações de PDF
 * Pode substituir ou complementar a função original no script.js
 */
function showNotification(message, type = 'info') {
    // Verificar se já existe uma notificação
    let notification = document.querySelector('.notification');

    // Se não existir, criar uma nova
    if (!notification) {
        notification = document.createElement('div');
        notification.className = 'notification';
        document.body.appendChild(notification);
    }

    // Definir a classe de acordo com o tipo
    if (type === 'pdf-success') {
        notification.className = 'notification pdf-success';
    } else {
        notification.className = `notification ${type}`;
    }

    // Definir o conteúdo
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
        </div>
    `;

    // Exibir a notificação
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);

    // Remover após alguns segundos
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000); // Tempo maior para notificações de PDF
}

/**
 * Versão modificada da função para mostrar uma notificação especial para PDFs
 */
function showPdfNotification(fileName) {
    showNotification(`Relatório baixado com sucesso: ${fileName}`, 'pdf-success');
}

/**
 * Versão atualizada da função createPDF para usar a notificação especial
 * Esta função modifica a versão anterior no arquivo pdf-generator.js
 */
function createPDF(reportType) {
    // [Código existente permanece o mesmo...]
    
    // Nome do arquivo
    const today = new Date();
    const fileName = `Relatório_${reportType}_${today.getFullYear()}${(today.getMonth() + 1).toString().padStart(2, '0')}${today.getDate().toString().padStart(2, '0')}.pdf`;
    
    // Salvar o PDF
    doc.save(fileName);
    
    // Exibir mensagem de sucesso com a notificação especial para PDFs
    showPdfNotification(fileName);
}

/**
 * Retorna o nome do relatório em português baseado no tipo
 * @param {string} reportType - Tipo de relatório
 * @returns {string} Nome do relatório em português
 */
function getNomeRelatorio(reportType) {
    switch(reportType) {
        case 'consumption':
            return 'Consumo Mensal';
        case 'logistics':
            return 'Eficiência Logística';
        case 'inventory':
            return 'Inventário';
        case 'responseTime':
            return 'Tempo De Resposta';
        default:
            return reportType;
    }
}

function generateReportPDF(reportType) {
    // Verificar se a biblioteca jsPDF está disponível
    if (typeof jspdf === 'undefined') {
        // Se não estiver disponível, carregá-la dinamicamente
        loadJsPDF().then(() => {
            createPDF(reportType);
        }).catch(error => {
            console.error('Erro ao carregar a biblioteca jsPDF:', error);
            alert('Não foi possível gerar o relatório. Por favor, tente novamente mais tarde.');
        });
    } else {
        // Se já estiver disponível, criar o PDF diretamente
        createPDF(reportType);
    }
}

/**
 * Carrega a biblioteca jsPDF dinamicamente
 * @returns {Promise} Promise resolvida quando a biblioteca for carregada
 */
function loadJsPDF() {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Falha ao carregar jsPDF'));
        document.head.appendChild(script);
        
        // Carregar também a biblioteca para tabelas e fontes
        const fontScript = document.createElement('script');
        fontScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.28/jspdf.plugin.autotable.min.js';
        document.head.appendChild(fontScript);
    });
}

/**
 * Cria o PDF com os dados do relatório específico
 * @param {string} reportType - Tipo de relatório
 */
function createPDF(reportType) {
    // Obter a data atual para o nome do arquivo
    const today = new Date();
    const dateStr = `${today.getDate().toString().padStart(2, '0')}/${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getFullYear()}`;
    const timeStr = `${today.getHours().toString().padStart(2, '0')}:${today.getMinutes().toString().padStart(2, '0')}`;
    
    // Inicializar o PDF com orientação paisagem para gráficos
    const doc = new jspdf.jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
    });
    
    // Adicionar cabeçalho com logo e informações da empresa
    addHeader(doc, dateStr, timeStr);
    
    // Título e subtítulo do relatório
    const titles = {
        consumption: {
            title: 'RELATÓRIO DE CONSUMO MENSAL',
            subtitle: 'Análise do consumo de peças nos últimos 12 meses'
        },
        logistics: {
            title: 'RELATÓRIO DE EFICIÊNCIA LOGÍSTICA',
            subtitle: 'Dados sobre movimentações e otimização do fluxo de peças'
        },
        inventory: {
            title: 'RELATÓRIO DE INVENTÁRIO OTIMIZADO',
            subtitle: 'Análise da distribuição e status do estoque atual'
        },
        responseTime: {
            title: 'RELATÓRIO DE TEMPO DE RESPOSTA',
            subtitle: 'Comparativo entre tempos de processo antes e depois do sistema'
        }
    };
    
    // Adicionar título
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text(titles[reportType].title, 149, 30, { align: 'center' });
    
    // Adicionar subtítulo
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.text(titles[reportType].subtitle, 149, 38, { align: 'center' });
    
    // Adicionar conteúdo específico do relatório baseado no tipo
    switch (reportType) {
        case 'consumption':
            addConsumptionReportContent(doc);
            break;
        case 'logistics':
            addLogisticsReportContent(doc);
            break;
        case 'inventory':
            addInventoryReportContent(doc);
            break;
        case 'responseTime':
            addResponseTimeReportContent(doc);
            break;
    }
    
    // Adicionar rodapé
    addFooter(doc);
    
    // Nome do arquivo
    const fileName = `Relatório_${getNomeRelatorio(reportType)}_${today.getFullYear()}${(today.getMonth() + 1).toString().padStart(2, '0')}${today.getDate().toString().padStart(2, '0')}.pdf`;
    
    // Salvar o PDF
    doc.save(fileName);
    
    // Exibir mensagem de sucesso
    showNotification(`Relatório baixado com sucesso: ${fileName}`, 'success');
}

/**
 * Adiciona o cabeçalho ao documento PDF
 * @param {Object} doc - Documento jsPDF
 * @param {string} dateStr - Data formatada
 * @param {string} timeStr - Hora formatada
 */
function addHeader(doc, dateStr, timeStr) {
    // Adicionar um retângulo como fundo do cabeçalho
    doc.setFillColor(51, 51, 51); // Cor primária do sistema
    doc.rect(0, 0, 297, 20, 'F');
    
    // Espaço para logo (simulado com texto)
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('NEGRÃO FERRAGENS', 15, 12);
    
    // Adicionar título do sistema
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text('Sistema de Rastreabilidade de Peças', 149, 12, { align: 'center' });
    
    // Adicionar data e hora de geração
    doc.text(`Gerado em: ${dateStr} às ${timeStr}`, 282, 12, { align: 'right' });
}

/**
 * Adiciona conteúdo específico para o relatório de Consumo Mensal
 * @param {Object} doc - Documento jsPDF
 */
function addConsumptionReportContent(doc) {
    // Dados do gráfico de consumo
    const data = chartData.consumption;
    
    // Adicionar tabela com dados mensais
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Consumo de Peças por Mês:', 15, 50);
    
    // Preparar dados para a tabela
    const tableData = [
        data.labels, 
        data.values.map(value => value.toString())
    ];
    
    // Criar tabela
    doc.autoTable({
        startY: 55,
        head: [['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']],
        body: [data.values],
        theme: 'grid',
        headStyles: { fillColor: [51, 51, 51], textColor: [255, 255, 255] },
        margin: { left: 15, right: 15 }
    });
    
    // Adicionar análise do consumo
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Análise do Consumo:', 15, doc.autoTable.previous.finalY + 15);
    
    // Calcular algumas métricas para análise
    const totalConsumption = data.values.reduce((sum, value) => sum + value, 0);
    const averageConsumption = Math.round(totalConsumption / data.values.length);
    const maxConsumption = Math.max(...data.values);
    const maxMonth = data.labels[data.values.indexOf(maxConsumption)];
    const minConsumption = Math.min(...data.values);
    const minMonth = data.labels[data.values.indexOf(minConsumption)];
    
    // Adicionar texto com análise
    doc.setFont('helvetica', 'normal');
    const analysisText = [
        `Consumo total do período: ${totalConsumption} unidades`,
        `Consumo médio mensal: ${averageConsumption} unidades`,
        `Mês com maior consumo: ${maxMonth} (${maxConsumption} unidades)`,
        `Mês com menor consumo: ${minMonth} (${minConsumption} unidades)`
    ];
    
    let yPosition = doc.autoTable.previous.finalY + 20;
    analysisText.forEach(text => {
        doc.text(text, 15, yPosition);
        yPosition += 8;
    });
    
    // Adicionar informações de tendência
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Tendência de Consumo:', 15, yPosition + 10);
    
    doc.setFont('helvetica', 'normal');
    // Calcular aumento percentual do primeiro para o último mês
    const firstMonth = data.values[0];
    const lastMonth = data.values[data.values.length - 1];
    const percentChange = Math.round((lastMonth - firstMonth) / firstMonth * 100);
    
    let trendText;
    if (percentChange > 0) {
        trendText = `Crescimento de ${percentChange}% no consumo de peças comparando o início e fim do período.`;
    } else if (percentChange < 0) {
        trendText = `Redução de ${Math.abs(percentChange)}% no consumo de peças comparando o início e fim do período.`;
    } else {
        trendText = 'Consumo estável ao longo do período analisado.';
    }
    
    doc.text(trendText, 15, yPosition + 18);
    
    // Adicionar recomendações baseadas nos dados
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Recomendações:', 15, yPosition + 30);
    
    doc.setFont('helvetica', 'normal');
    const recommendations = [
        `• Planejamento de estoque para ${maxMonth} deve considerar alta demanda histórica.`,
        `• Avaliação da estratégia de inventário para ${minMonth} pode otimizar recursos.`,
        `• Preparar-se para tendência de ${percentChange > 0 ? 'aumento' : 'redução'} no consumo nos próximos meses.`
    ];
    
    yPosition += 35;
    recommendations.forEach(text => {
        doc.text(text, 15, yPosition);
        yPosition += 8;
    });
    
    // Adicionar nota sobre o gráfico
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text('*Nota: O gráfico completo está disponível no sistema online.', 15, 180);
    doc.setTextColor(0, 0, 0);
}

/**
 * Adiciona conteúdo específico para o relatório de Eficiência Logística
 * @param {Object} doc - Documento jsPDF
 */
function addLogisticsReportContent(doc) {
    // Dados do relatório de eficiência logística
    const data = chartData.logistics;
    
    // Adicionar tabela com dados de entrada e saída por localização
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Movimentações por Localização:', 15, 50);
    
    // Preparar dados para a tabela
    const tableHead = [['Localização', 'Entradas', 'Saídas', 'Saldo']];
    const tableBody = data.labels.map((label, index) => {
        const inValue = data.inValues[index];
        const outValue = data.outValues[index];
        const balance = inValue - outValue;
        return [label, inValue.toString(), outValue.toString(), balance.toString()];
    });
    
    // Criar tabela
    doc.autoTable({
        startY: 55,
        head: tableHead,
        body: tableBody,
        theme: 'grid',
        headStyles: { fillColor: [51, 51, 51], textColor: [255, 255, 255] },
        margin: { left: 15, right: 15 }
    });
    
    // Adicionar análise da eficiência logística
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Análise da Eficiência Logística:', 15, doc.autoTable.previous.finalY + 15);
    
    // Calcular algumas métricas para análise
    const totalIn = data.inValues.reduce((sum, value) => sum + value, 0);
    const totalOut = data.outValues.reduce((sum, value) => sum + value, 0);
    const totalBalance = totalIn - totalOut;
    
    // Identificar local com maior movimento
    let maxMovementIndex = 0;
    let maxMovement = 0;
    
    data.labels.forEach((label, index) => {
        const totalMovement = data.inValues[index] + data.outValues[index];
        if (totalMovement > maxMovement) {
            maxMovement = totalMovement;
            maxMovementIndex = index;
        }
    });
    
    // Adicionar texto com análise
    doc.setFont('helvetica', 'normal');
    let yPosition = doc.autoTable.previous.finalY + 20;
    
    const analysisText = [
        `Total de entradas no período: ${totalIn} unidades`,
        `Total de saídas no período: ${totalOut} unidades`,
        `Saldo atual do inventário: ${totalBalance} unidades`,
        `Local com maior movimentação: ${data.labels[maxMovementIndex]} (${maxMovement} movimentos)`
    ];
    
    analysisText.forEach(text => {
        doc.text(text, 15, yPosition);
        yPosition += 8;
    });
    
    // Adicionar métricas de eficiência
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Métricas de Eficiência:', 15, yPosition + 10);
    
    // Cálculos simulados de eficiência
    const turnaround = Math.round((totalOut / totalIn) * 100);
    const utilizationRate = Math.round((totalOut / (totalIn * 1.2)) * 100);
    
    doc.setFont('helvetica', 'normal');
    yPosition += 15;
    
    doc.text(`Taxa de rotatividade: ${turnaround}%`, 15, yPosition);
    yPosition += 8;
    doc.text(`Taxa de utilização de capacidade: ${utilizationRate}%`, 15, yPosition);
    yPosition += 8;
    doc.text(`Tempo médio de permanência em estoque: 14 dias`, 15, yPosition);
    
    // Adicionar recomendações baseadas nos dados
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Recomendações para Otimização Logística:', 15, yPosition + 15);
    
    doc.setFont('helvetica', 'normal');
    const recommendations = [
        `• Otimizar fluxo entre ${data.labels[0]} e ${data.labels[2]} para reduzir movimentações desnecessárias.`,
        `• Avaliar capacidade do ${data.labels[maxMovementIndex]} devido ao alto volume de operações.`,
        `• Implementar sistema FIFO (primeiro a entrar, primeiro a sair) para melhorar rotatividade.`,
        `• Considerar reorganização do layout para facilitar acesso às peças de maior giro.`
    ];
    
    yPosition += 20;
    recommendations.forEach(text => {
        doc.text(text, 15, yPosition);
        yPosition += 8;
    });
    
    // Adicionar nota sobre o gráfico
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text('*Nota: O gráfico completo está disponível no sistema online.', 15, 180);
    doc.setTextColor(0, 0, 0);
}

/**
 * Adiciona conteúdo específico para o relatório de Inventário Otimizado
 * @param {Object} doc - Documento jsPDF
 */
function addInventoryReportContent(doc) {
    // Dados do relatório de inventário
    const data = chartData.inventory;
    
    // Adicionar tabela com distribuição do estoque
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Distribuição Atual do Estoque:', 15, 50);
    
    // Calcular totais
    const total = data.available + data.low + data.reserved;
    const availablePercent = Math.round((data.available / total) * 100);
    const lowPercent = Math.round((data.low / total) * 100);
    const reservedPercent = Math.round((data.reserved / total) * 100);
    
    // Preparar dados para a tabela
    const tableHead = [['Status', 'Quantidade', 'Percentual']];
    const tableBody = [
        ['Disponível', data.available.toString(), `${availablePercent}%`],
        ['Estoque Baixo', data.low.toString(), `${lowPercent}%`],
        ['Reservado', data.reserved.toString(), `${reservedPercent}%`],
        ['Total', total.toString(), '100%']
    ];
    
    // Criar tabela
    doc.autoTable({
        startY: 55,
        head: tableHead,
        body: tableBody,
        theme: 'grid',
        headStyles: { fillColor: [51, 51, 51], textColor: [255, 255, 255] },
        margin: { left: 15, right: 15 }
    });
    
    // Adicionar análise do inventário
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Análise do Inventário:', 15, doc.autoTable.previous.finalY + 15);
    
    // Adicionar texto com análise
    doc.setFont('helvetica', 'normal');
    let yPosition = doc.autoTable.previous.finalY + 20;
    
    const analysisText = [
        `Total de itens no inventário: ${total} unidades`,
        `Percentual de itens disponíveis para uso imediato: ${availablePercent}%`,
        `Percentual de itens com estoque baixo (requer atenção): ${lowPercent}%`,
        `Percentual de itens reservados para operações em andamento: ${reservedPercent}%`
    ];
    
    analysisText.forEach(text => {
        doc.text(text, 15, yPosition);
        yPosition += 8;
    });
    
    // Adicionar informações sobre kits e agrupamentos
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Análise de Kits e Agrupamentos:', 15, yPosition + 10);
    
    // Dados simulados para kits
    const kitsData = {
        total: 87,
        complete: 65,
        partial: 22,
        percentComplete: 75
    };
    
    doc.setFont('helvetica', 'normal');
    yPosition += 15;
    
    doc.text(`Total de kits cadastrados: ${kitsData.total}`, 15, yPosition);
    yPosition += 8;
    doc.text(`Kits completos: ${kitsData.complete} (${kitsData.percentComplete}%)`, 15, yPosition);
    yPosition += 8;
    doc.text(`Kits parciais: ${kitsData.partial} (${100 - kitsData.percentComplete}%)`, 15, yPosition);
    yPosition += 8;
    doc.text(`Economia estimada com montagem de kits: 15% em tempo de preparação`, 15, yPosition);
    
    // Adicionar recomendações baseadas nos dados
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Recomendações para Otimização do Inventário:', 15, yPosition + 15);
    
    doc.setFont('helvetica', 'normal');
    const recommendations = [
        `• Reabastecer os ${data.low} itens com estoque baixo para evitar interrupções.`,
        `• Revisar os ${data.reserved} itens reservados para garantir uso efetivo.`,
        `• Completar os ${kitsData.partial} kits parciais para maximizar eficiência operacional.`,
        `• Implementar sistema de alerta antecipado para itens com alta rotatividade.`,
        `• Considerar redução de estoque para itens com baixa rotatividade.`
    ];
    
    yPosition += 20;
    recommendations.forEach(text => {
        doc.text(text, 15, yPosition);
        yPosition += 8;
    });
    
    // Adicionar nota sobre o gráfico
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text('*Nota: O gráfico completo está disponível no sistema online.', 15, 180);
    doc.setTextColor(0, 0, 0);
}

/**
 * Adiciona conteúdo específico para o relatório de Tempo de Resposta
 * @param {Object} doc - Documento jsPDF
 */
function addResponseTimeReportContent(doc) {
    // Dados do relatório de tempo de resposta
    const data = chartData.responseTime;
    
    // Adicionar tabela comparativa de tempos
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Comparativo de Tempos de Processo (minutos):', 15, 50);
    
    // Preparar dados para a tabela
    const tableHead = [['Processo', 'Antes do Sistema', 'Com o Sistema', 'Redução', 'Melhoria %']];
    const tableBody = data.labels.map((label, index) => {
        const before = data.before[index];
        const after = data.after[index];
        const reduction = before - after;
        const improvement = Math.round((reduction / before) * 100);
        return [label, before.toString(), after.toString(), reduction.toString(), `${improvement}%`];
    });
    
    // Criar tabela
    doc.autoTable({
        startY: 55,
        head: tableHead,
        body: tableBody,
        theme: 'grid',
        headStyles: { fillColor: [51, 51, 51], textColor: [255, 255, 255] },
        margin: { left: 15, right: 15 }
    });
    
    // Adicionar análise do tempo de resposta
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Análise do Tempo de Resposta:', 15, doc.autoTable.previous.finalY + 15);
    
    // Calcular algumas métricas para análise
    const totalTimeBefore = data.before.reduce((sum, value) => sum + value, 0);
    const totalTimeAfter = data.after.reduce((sum, value) => sum + value, 0);
    const totalReduction = totalTimeBefore - totalTimeAfter;
    const totalImprovement = Math.round((totalReduction / totalTimeBefore) * 100);
    
    // Encontrar o processo com maior melhoria
    let maxImprovementIndex = 0;
    let maxImprovementPercent = 0;
    
    data.labels.forEach((label, index) => {
        const improvement = Math.round(((data.before[index] - data.after[index]) / data.before[index]) * 100);
        if (improvement > maxImprovementPercent) {
            maxImprovementPercent = improvement;
            maxImprovementIndex = index;
        }
    });
    
    // Adicionar texto com análise
    doc.setFont('helvetica', 'normal');
    let yPosition = doc.autoTable.previous.finalY + 20;
    
    const analysisText = [
        `Tempo total do processo antes: ${totalTimeBefore} minutos`,
        `Tempo total do processo atual: ${totalTimeAfter} minutos`,
        `Redução total no tempo: ${totalReduction} minutos (${totalImprovement}%)`,
        `Processo com maior melhoria: ${data.labels[maxImprovementIndex]} (${maxImprovementPercent}% mais rápido)`
    ];
    
    analysisText.forEach(text => {
        doc.text(text, 15, yPosition);
        yPosition += 8;
    });
    
    // Adicionar impacto nos negócios
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Impacto nos Negócios:', 15, yPosition + 10);
    
    // Cálculos simulados de impacto
    const hoursPerMonth = Math.round((totalReduction * 30) / 60);
    const costSavings = hoursPerMonth * 50; // Custo hora médio R$ 50
    
    doc.setFont('helvetica', 'normal');
    yPosition += 15;
    
    doc.text(`Horas economizadas por mês: ${hoursPerMonth} horas`, 15, yPosition);
    yPosition += 8;
    doc.text(`Economia estimada em custos operacionais: R$ ${costSavings.toLocaleString('pt-BR')} / mês`, 15, yPosition);
    yPosition += 8;
    doc.text(`Aumento de capacidade operacional: ${totalImprovement}%`, 15, yPosition);
    
    // Adicionar recomendações baseadas nos dados
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Recomendações para Melhorias Adicionais:', 15, yPosition + 15);
    
    doc.setFont('helvetica', 'normal');
    const recommendations = [
        `• Focar em otimizar ainda mais o processo de ${data.labels[data.after.indexOf(Math.max(...data.after))]} - ainda o mais demorado.`,
        `• Aplicar as melhorias do processo de ${data.labels[maxImprovementIndex]} aos outros processos.`,
        `• Implementar treinamento adicional para equipe nos novos fluxos otimizados.`,
        `• Considerar automação adicional para reduzir ainda mais o tempo de ${data.labels[1]}.`
    ];
    
    yPosition += 20;
    recommendations.forEach(text => {
        doc.text(text, 15, yPosition);
        yPosition += 8;
    });
    
    // Adicionar gráfico de projeção de ganhos futuros (descrição textual)
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Projeção de Ganhos Futuros:', 15, yPosition + 10);
    
    doc.setFont('helvetica', 'normal');
    yPosition += 15;
    doc.text('Com base nas melhorias implementadas e otimizações adicionais projetadas,', 15, yPosition);
    yPosition += 8;
    doc.text('estimamos uma redução adicional de 15-20% nos tempos de processo nos próximos 6 meses.', 15, yPosition);
    
    // Adicionar nota sobre o gráfico
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text('*Nota: O gráfico comparativo completo está disponível no sistema online.', 15, 180);
    doc.setTextColor(0, 0, 0);
}

/**
 * Adiciona o rodapé ao documento PDF
 * @param {Object} doc - Documento jsPDF
 */
function addFooter(doc) {
    // Adicionar linha separadora
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.5);
    doc.line(15, 190, 282, 190);
    
    // Adicionar informações de rodapé
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text('© Negrão Ferragens - Sistema de Rastreabilidade de Peças', 15, 195);
    doc.text('Documento gerado automaticamente pelo sistema.', 15, 200);
    
    // Adicionar numeração de página
    doc.text('Página 1/1', 282, 195, { align: 'right' });
    
    // Restaurar cor do texto
    doc.setTextColor(0, 0, 0);
}

// Adicionar a função de inicialização ao carregamento da página
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar os botões de relatório
    initializeReportButtons();
});

/**
 * Adiciona o módulo de geração de PDF ao sistema principal
 * Este código deve ser adicionado ao final do arquivo script.js existente
 */

// Incorporar a função de inicialização do módulo PDF ao inicializador do sistema
function initializeSystem() {
    // Inicializar componentes da interface
    initializeDashboard();
    initializeInventory();
    initializeTracking();
    initializeApprovals();
    initializeReports();
    initializeModals();
    initializeHelpPanel();
    
    // Adicionar listeners globais
    addGlobalEventListeners();
    
    // Carregar dados iniciais (simulados)
    loadInitialData();
    
    // Inicializar o módulo de relatórios PDF
    initializeReportButtons();
    
    // Mostrar notificação de boas-vindas
    showNotification('Bem-vindo ao Sistema de Rastreabilidade de Peças', 'info');
}

/**
 * Inicializa o sistema de relatórios e gráficos
 * Versão atualizada que inclui o módulo de PDF
 */
function initializeReports() {
    // Em produção, aqui seriam carregados os gráficos com dados reais
    console.log('Sistema de relatórios inicializado');
    
    // Carregar bibliotecas necessárias para PDF
    loadPdfLibraries();
}

/**
 * Carrega as bibliotecas necessárias para geração de PDF
 */
function loadPdfLibraries() {
    // Verificar se a biblioteca já está carregada
    if (document.querySelector('script[src*="jspdf"]')) return;
    
    // Carregar jsPDF
    const jsPdfScript = document.createElement('script');
    jsPdfScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
    document.head.appendChild(jsPdfScript);
    
    // Carregar plugin para tabelas
    const autoTableScript = document.createElement('script');
    autoTableScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.28/jspdf.plugin.autotable.min.js';
    document.head.appendChild(autoTableScript);
    
    console.log('Bibliotecas para geração de PDF carregadas');
}

/**
 * Cria uma solicitação de aprovação para a movimentação de peça
 */
function createMovementApprovalRequest(itemId, destination, quantity, reason, notes) {
    const item = findItemById(itemId);
    if (!item) return;
    
    // Gerar um ID de solicitação
    const requestId = `REQ-${new Date().getFullYear()}-${String(approvalsData.length + 44).padStart(3, '0')}`;
    
    // Criar a nova solicitação
    const newRequest = {
        id: requestId,
        date: getCurrentDate(),
        requester: 'Usuário', // Em produção usaria o usuário logado
        item: item.description,
        quantity: quantity,
        justification: `${reason}: ${notes}`,
        status: 'pending',
        itemId: itemId,
        destination: destination
    };
    
    // Adicionar aos dados de aprovações
    approvalsData.push(newRequest);
    
    // Atualizar a contagem no dashboard
    updatePendingApprovalsCount();
    
    // Atualizar a lista de aprovações pendentes
    refreshApprovalsList();
    
    console.log(`Nova solicitação de aprovação criada: ${requestId}`);
}

/**
 * Atualiza a lista de aprovações pendentes
 */
function refreshApprovalsList() {
    const approvalList = document.querySelector('.approval-list');
    if (!approvalList) return;
    
    // Filtrar apenas aprovações pendentes
    const pendingApprovals = approvalsData.filter(approval => approval.status === 'pending');
    
    // Limpar a lista atual
    approvalList.innerHTML = '';
    
    // Se não houver aprovações pendentes, mostrar mensagem
    if (pendingApprovals.length === 0) {
        approvalList.innerHTML = `
            <div class="no-approvals-message">
                Não há aprovações pendentes no momento.
            </div>
        `;
        return;
    }
    
    // Adicionar cada aprovação pendente à lista
    pendingApprovals.forEach(approval => {
        const approvalItem = document.createElement('div');
        approvalItem.className = 'approval-item';
        approvalItem.innerHTML = `
            <div class="approval-header">
                <span class="approval-id">${approval.id}</span>
                <span class="approval-date">${approval.date}</span>
            </div>
            <div class="approval-content">
                <p><strong>Solicitante:</strong> ${approval.requester}</p>
                <p><strong>Item:</strong> ${approval.item}</p>
                <p><strong>Quantidade:</strong> ${approval.quantity}</p>
                <p><strong>Justificativa:</strong> ${approval.justification}</p>
            </div>
            <div class="approval-actions">
                <button class="btn-approve">Aprovar</button>
                <button class="btn-reject">Rejeitar</button>
            </div>
        `;
        
        approvalList.appendChild(approvalItem);
        
        // Adicionar eventos para os botões
        const approveButton = approvalItem.querySelector('.btn-approve');
        const rejectButton = approvalItem.querySelector('.btn-reject');
        
        approveButton.addEventListener('click', function() {
            approveRequest(approval.id, approvalItem);
        });
        
        rejectButton.addEventListener('click', function() {
            rejectRequest(approval.id, approvalItem);
        });
    });
}

/**
 * Aprova uma solicitação
 * @param {string} requestId - ID da solicitação
 * @param {Element} approvalItem - Elemento HTML da solicitação
 */
function approveRequest(requestId, approvalItem) {
    // Encontrar a solicitação pelo ID
    const requestIndex = approvalsData.findIndex(req => req.id === requestId);
    if (requestIndex === -1) {
        showNotification('Solicitação não encontrada', 'error');
        return;
    }
    
    // Atualizar o status da solicitação
    approvalsData[requestIndex].status = 'approved';
    
    // Animar a remoção do item da lista
    approvalItem.style.borderLeftColor = 'var(--success-color)';
    setTimeout(() => {
        approvalItem.style.opacity = '0';
        setTimeout(() => {
            // Remover o item da lista
            if (approvalItem.parentNode) {
                approvalItem.parentNode.removeChild(approvalItem);
            }
            
            // Verificar se não há mais aprovações
            checkEmptyApprovals();
        }, 300);
    }, 1000);

    // Atualizar a contagem no dashboard
    updatePendingApprovalsCount();

    // Mostrar notificação
    showNotification('Solicitação aprovada com sucesso', 'success');
}

/**
* Rejeita uma solicitação
* @param {string} requestId - ID da solicitação
* @param {Element} approvalItem - Elemento HTML da solicitação
*/
function rejectRequest(requestId, approvalItem) {
// Encontrar a solicitação pelo ID
const requestIndex = approvalsData.findIndex(req => req.id === requestId);
if (requestIndex === -1) {
    showNotification('Solicitação não encontrada', 'error');
    return;
}

// Atualizar o status da solicitação
approvalsData[requestIndex].status = 'rejected';

// Animar a remoção do item da lista
approvalItem.style.borderLeftColor = 'var(--danger-color)';
setTimeout(() => {
    approvalItem.style.opacity = '0';
    setTimeout(() => {
        // Remover o item da lista
        if (approvalItem.parentNode) {
            approvalItem.parentNode.removeChild(approvalItem);
        }
        
        // Verificar se não há mais aprovações
        checkEmptyApprovals();
    }, 300);
}, 1000);

// Atualizar a contagem no dashboard
updatePendingApprovalsCount();

// Mostrar notificação
showNotification('Solicitação rejeitada', 'warning');
}

/**
* Verifica se a lista de aprovações está vazia e mostra mensagem apropriada
*/
function checkEmptyApprovals() {
const approvalList = document.querySelector('.approval-list');
if (!approvalList) return;

// Verificar se há itens na lista (excluindo a possível mensagem de vazio)
const items = approvalList.querySelectorAll('.approval-item');
if (items.length === 0) {
    approvalList.innerHTML = `
        <div class="no-approvals-message">
            Não há aprovações pendentes no momento.
        </div>
    `;
}
}

/**
* Atualiza o contador de aprovações pendentes no dashboard
*/
function updatePendingApprovalsCount() {
// Contar aprovações pendentes
const pendingCount = approvalsData.filter(approval => approval.status === 'pending').length;

// Atualizar o número no dashboard
const dashboardCard = document.querySelector('#dashboard .card:nth-child(3) .number');
if (dashboardCard) {
    dashboardCard.textContent = pendingCount;
    
    // Atualizar a tendência
    const trendElement = dashboardCard.nextElementSibling;
    if (trendElement) {
        if (pendingCount > 12) {
            trendElement.textContent = '↑ Aumentou';
            trendElement.className = 'trend negative';
        } else if (pendingCount < 12) {
            trendElement.textContent = '↓ Diminuiu';
            trendElement.className = 'trend positive';
        } else {
            trendElement.textContent = '= Sem alteração';
            trendElement.className = 'trend neutral';
        }
    }
    
    // Destacar o card se houver muitas aprovações pendentes
    const card = dashboardCard.closest('.card');
    if (card) {
        if (pendingCount > 15) {
            card.classList.add('has-pending');
        } else {
            card.classList.remove('has-pending');
        }
    }
}
}

/**
* Rastreia uma peça pelo seu código/ID
* @param {string} itemCode - Código da peça a ser rastreada
*/
function trackItem(itemCode) {
// Encontrar o item pelo código
const item = findItemById(itemCode);

if (!item) {
    showNotification('Peça não encontrada', 'error');
    return;
}

// Mostrar uma animação de scanner em ação
const scannerPlaceholder = document.querySelector('.scanner-placeholder');
if (scannerPlaceholder) {
    scannerPlaceholder.classList.add('scanning');
    scannerPlaceholder.innerHTML = '<span>Escaneando...</span>';
    
    setTimeout(() => {
        scannerPlaceholder.classList.remove('scanning');
        scannerPlaceholder.innerHTML = '<span>Scanner QR/RFID</span>';
        
        // Exibir os resultados do rastreamento
        displayTrackingResult(item);
    }, 1500);
} else {
    // Se não houver placeholder, exibir os resultados diretamente
    displayTrackingResult(item);
}
}

/**
* Exibe os resultados do rastreamento de uma peça
* @param {Object} item - Objeto da peça rastreada
*/
function displayTrackingResult(item) {
const trackingResult = document.querySelector('.tracking-result');
if (!trackingResult) return;

// Definir o status em formato legível
let statusText = 'Disponível';
let statusClass = 'available';

if (item.status === 'low') {
    statusText = 'Estoque Baixo';
    statusClass = 'low';
} else if (item.status === 'reserved') {
    statusText = 'Reservado';
    statusClass = 'reserved';
}

// Construir o HTML do resultado
trackingResult.innerHTML = `
    <h3>Informações da Peça Rastreada</h3>
    <div class="tracking-item-info">
        <div class="info-row">
            <span class="info-label">Código:</span>
            <span class="info-value">${item.id}</span>
        </div>
        <div class="info-row">
            <span class="info-label">Descrição:</span>
            <span class="info-value">${item.description}</span>
        </div>
        <div class="info-row">
            <span class="info-label">Localização Atual:</span>
            <span class="info-value">${item.location}</span>
        </div>
        <div class="info-row">
            <span class="info-label">Quantidade:</span>
            <span class="info-value">${item.quantity}</span>
        </div>
        <div class="info-row">
            <span class="info-label">Status:</span>
            <span class="info-value status-badge ${statusClass}">${statusText}</span>
        </div>
        <div class="info-row">
            <span class="info-label">Última Atualização:</span>
            <span class="info-value">${item.lastUpdated}</span>
        </div>
    </div>
    
    <h4>Histórico de Movimentações</h4>
    <div class="movement-history">
`;

// Adicionar histórico de movimentações
if (item.history && item.history.length > 0) {
    trackingResult.innerHTML += '<ul class="movement-history">';
    
    item.history.forEach(entry => {
        trackingResult.innerHTML += `
            <li>
                <span class="history-date">${entry.date}</span>
                <div class="history-action">Movido de <strong>${entry.from}</strong> para <strong>${entry.to}</strong></div>
                <span class="history-user">Responsável: ${entry.responsible}</span>
            </li>
        `;
    });
    
    trackingResult.innerHTML += '</ul>';
} else {
    trackingResult.innerHTML += '<p>Nenhum histórico de movimentação encontrado.</p>';
}

// Adicionar botões de ação
trackingResult.innerHTML += `
    <div class="tracking-actions">
        <button class="btn-primary track-details" data-id="${item.id}">Ver Detalhes</button>
        <button class="btn-secondary track-move" data-id="${item.id}">Movimentar</button>
    </div>
`;

// Mostrar o resultado
trackingResult.style.display = 'block';

// Configurar botões de ação
const detailsButton = trackingResult.querySelector('.track-details');
const moveButton = trackingResult.querySelector('.track-move');

if (detailsButton) {
    detailsButton.addEventListener('click', function() {
        const itemId = this.getAttribute('data-id');
        openDetailsModal(itemId);
    });
}

if (moveButton) {
    moveButton.addEventListener('click', function() {
        const itemId = this.getAttribute('data-id');
        openMoveModal(itemId);
    });
}
}

/**
* Atualiza as métricas exibidas no dashboard
*/
function updateDashboardMetrics() {
// Contar total de peças em estoque
const totalItems = inventoryData.reduce((sum, item) => sum + item.quantity, 0);

// Contar kits completos (peças com "Kit" na descrição)
const totalKits = inventoryData
    .filter(item => item.description.toLowerCase().includes('kit'))
    .reduce((sum, item) => sum + item.quantity, 0);

// Atualizar os números no dashboard
const itemsCountElement = document.querySelector('#dashboard .card:nth-child(1) .number');
if (itemsCountElement) {
    const previousCount = parseInt(itemsCountElement.textContent.replace(/\D/g, '')) || 0;
    itemsCountElement.textContent = totalItems;
    
    // Atualizar a tendência
    const trendElement = itemsCountElement.nextElementSibling;
    if (trendElement) {
        const percentChange = previousCount > 0 ? 
            Math.round((totalItems - previousCount) / previousCount * 100) : 0;
        
        if (percentChange > 0) {
            trendElement.textContent = `↑ ${Math.abs(percentChange)}% desde o mês passado`;
            trendElement.className = 'trend positive';
        } else if (percentChange < 0) {
            trendElement.textContent = `↓ ${Math.abs(percentChange)}% desde o mês passado`;
            trendElement.className = 'trend negative';
        } else {
            trendElement.textContent = '= Sem alteração';
            trendElement.className = 'trend neutral';
        }
    }
}

// Atualizar o número de kits
const kitsCountElement = document.querySelector('#dashboard .card:nth-child(2) .number');
if (kitsCountElement) {
    kitsCountElement.textContent = totalKits;
}
}

/**
* Encontra um item pelo seu ID
* @param {string} itemId - ID da peça
* @returns {Object|null} O objeto da peça ou null se não encontrado
*/
function findItemById(itemId) {
return inventoryData.find(item => item.id === itemId) || null;
}

/**
* Gera um novo ID para peça baseado no existente
* @param {string} baseId - ID base
* @returns {string} Novo ID gerado
*/
function generateNewItemId(baseId) {
// Separar prefixo e número
const match = baseId.match(/^([A-Za-z-]+)(\d+)$/);
if (!match) return `${baseId}-1`;

const prefix = match[1];
const number = parseInt(match[2]);

// Encontrar o maior número existente com o mesmo prefixo
let maxNumber = number;
inventoryData.forEach(item => {
    const itemMatch = item.id.match(new RegExp(`^${prefix}(\\d+)$`));
    if (itemMatch) {
        const itemNumber = parseInt(itemMatch[1]);
        if (itemNumber > maxNumber) {
            maxNumber = itemNumber;
        }
    }
});

// Retornar novo ID com número incrementado
return `${prefix}${maxNumber + 1}`;
}

/**
* Exibe uma notificação temporária
* @param {string} message - Mensagem a ser exibida
* @param {string} type - Tipo de notificação: 'success', 'warning', 'error', 'info'
*/
function showNotification(message, type = 'info') {
// Verificar se já existe uma notificação
let notification = document.querySelector('.notification');

// Se não existir, criar uma nova
if (!notification) {
    notification = document.createElement('div');
    notification.className = 'notification';
    document.body.appendChild(notification);
}

// Definir a classe de acordo com o tipo
notification.className = `notification ${type}`;

// Definir o conteúdo
notification.innerHTML = `
    <div class="notification-content">
        <span class="notification-message">${message}</span>
    </div>
`;

// Exibir a notificação
setTimeout(() => {
    notification.classList.add('show');
}, 10);

// Remover após alguns segundos
setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}, 3000);
}

/**
* Mostra uma seção específica do sistema
* @param {string} sectionId - ID da seção a ser exibida
*/
function showSection(sectionId) {
// Ocultar todas as seções
document.querySelectorAll('main section').forEach(section => {
    section.style.display = 'none';
});

// Mostrar a seção especificada
const targetSection = document.getElementById(sectionId);
if (targetSection) {
    targetSection.style.display = 'block';
    
    // Rolar para o topo da seção
    window.scrollTo({
        top: targetSection.offsetTop - 100,
        behavior: 'smooth'
    });
    
    // Destacar o item do menu correspondente
    document.querySelectorAll('.main-menu a').forEach(link => {
        if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // Ações específicas para cada seção
    if (sectionId === 'dashboard') {
        // Atualizar métricas ao abrir o dashboard
        updateDashboardMetrics();
    } else if (sectionId === 'inventory') {
        // Resetar filtros ao abrir o inventário
        const searchInput = document.querySelector('#inventory input[type="text"]');
        if (searchInput) {
            searchInput.value = '';
        }
        refreshInventoryTable();
    } else if (sectionId === 'approvals') {
        // Atualizar a lista de aprovações ao abrir a seção
        refreshApprovalsList();
    } else if (sectionId === 'tracking') {
        // Limpar qualquer resultado anterior ao abrir o rastreamento
        const trackingResult = document.querySelector('.tracking-result');
        if (trackingResult) {
            trackingResult.style.display = 'none';
        }
        
        const trackInput = document.querySelector('.tracking-scanner input[type="text"]');
        if (trackInput) {
            trackInput.value = '';
        }
    }
}
}

/**
* Confirma a ação de logout
*/
function confirmLogout() {
if (confirm('Tem certeza que deseja sair do sistema?')) {
    // Em produção, isso redirecionaria para a página de login
    showNotification('Logout realizado com sucesso', 'info');
    setTimeout(() => {
        window.location.reload();
    }, 1500);
}
}

/**
* Exibe o modal de contato com suporte
*/
function showSupportContactModal() {
alert('Entre em contato com o suporte através do email: suporte@negrao.com.br ou pelo telefone (11) 1234-5678.');
// Em produção, isso abriria um modal com formulário de contato
}

/**
* Obtém a data atual formatada
* @returns {string} Data no formato DD/MM/AAAA
*/
function getCurrentDate() {
const date = new Date();
return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
}

/**
* Obtém a data e hora atual formatada
* @returns {string} Data e hora no formato DD/MM/AAAA HH:MM
*/
function getCurrentDateTime() {
const date = new Date();
return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
}

// Variáveis globais para armazenar dados
let inventoryData = [];
let approvalsData = [];

// Dados para gráficos (seriam carregados do servidor em produção)
const chartData = {
consumption: {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    values: [120, 150, 135, 142, 160, 178, 145, 130, 190, 210, 200, 220]
},
logistics: {
    labels: ['Depósito A', 'Depósito B', 'Produção', 'Manutenção', 'Expedição'],
    inValues: [35, 25, 45, 10, 5],
    outValues: [15, 20, 40, 5, 40]
},
inventory: {
    available: 70,
    low: 20,
    reserved: 10
},
responseTime: {
    labels: ['Localização', 'Movimentação', 'Aprovação', 'Entrega'],
    before: [8, 15, 240, 60],
    after: [1, 5, 30, 15]
}
};

// Funções que seriam implementadas para integração com gráficos reais
function initializeCharts() {
// Esta função inicializaria os gráficos com biblioteca como Chart.js
console.log('Gráficos inicializados');
}

function updateCharts() {
// Esta função atualizaria os gráficos com novos dados
console.log('Gráficos atualizados');
}