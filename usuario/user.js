

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
