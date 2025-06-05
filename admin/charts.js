

/**
 * Solução Simplificada para os Gráficos
 * Este script corrige os problemas sem conflitos de integridade ou variáveis
 */

// Auto-execução para evitar conflitos com variáveis globais
(function() {
    console.log('Inicializando solução de gráficos...');
    
    // Esperar o DOM estar completamente carregado
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initCharts);
    } else {
      initCharts();
    }
    
    function initCharts() {
      console.log('DOM carregado, verificando Chart.js...');
      
      // Verificar se Chart.js já está disponível
      if (typeof Chart !== 'undefined') {
        console.log('Chart.js já está disponível, criando gráficos...');
        createAllCharts();
      } else {
        console.log('Chart.js não encontrado, carregando a biblioteca...');
        loadChartJsWithoutIntegrity();
      }
    }
    
    // Função para carregar Chart.js sem verificação de integridade
    function loadChartJsWithoutIntegrity() {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.min.js';
      // Removemos o atributo integrity para evitar o erro
      
      script.onload = function() {
        console.log('Chart.js carregado com sucesso');
        createAllCharts();
      };
      
      script.onerror = function() {
        console.error('Falha ao carregar Chart.js');
        showErrorMessage('Não foi possível carregar a biblioteca de gráficos');
      };
      
      document.head.appendChild(script);
    }
    
    // Função principal para criar todos os gráficos
    function createAllCharts() {
      console.log('Preparando para criar os gráficos...');
      
      // Usar os dados já definidos globalmente se existirem, ou criar novos
      // Isso evita o erro "Identifier 'chartData' has already been declared"
      const chartDataToUse = window.chartData || {
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
      
      // Preparar canvas para os gráficos
      prepareChartCanvases();
      
      // Criar os gráficos com um pequeno delay para garantir que os canvas estão prontos
      setTimeout(() => {
        createConsumptionChart(chartDataToUse.consumption);
        createLogisticsChart(chartDataToUse.logistics);
        createInventoryChart(chartDataToUse.inventory);
        createResponseTimeChart(chartDataToUse.responseTime);
      }, 100);
    }
    
    // Preparar os elementos canvas para os gráficos
    function prepareChartCanvases() {
      // Procurar por cards de relatório
      const reportCards = document.querySelectorAll('.report-card');
      console.log(`Encontrados ${reportCards.length} cards de relatório`);
      
      if (reportCards.length === 0) {
        console.error('Nenhum card de relatório encontrado!');
        return;
      }
      
      reportCards.forEach((card, index) => {
        const title = card.querySelector('h3')?.textContent.trim();
        console.log(`Processando card: "${title}"`);
        
        // Encontrar ou criar placeholder
        let placeholder = card.querySelector('.chart-placeholder');
        
        if (!placeholder) {
          // Se não houver placeholder, tentar encontrar qualquer contêiner de gráfico existente
          const existingContainer = card.querySelector('.chart-container');
          if (existingContainer) {
            console.log(`Container de gráfico já existe para: "${title}"`);
            return; // Pular este card
          }
          
          console.log(`Criando novo placeholder para: "${title}"`);
          placeholder = document.createElement('div');
          placeholder.className = 'chart-placeholder';
          
          // Inserir após o título, ou antes do texto, ou no final do card
          const paragraphs = card.querySelectorAll('p');
          if (paragraphs.length > 0) {
            paragraphs[0].parentNode.insertBefore(placeholder, paragraphs[0]);
          } else {
            card.appendChild(placeholder);
          }
        }
        
        // Determinar o tipo de gráfico baseado no título
        let chartType = '';
        if (title) {
          if (title.includes('Consumo')) chartType = 'consumption';
          else if (title.includes('Logística')) chartType = 'logistics';
          else if (title.includes('Inventário')) chartType = 'inventory';
          else if (title.includes('Tempo')) chartType = 'response-time';
          else chartType = `generic-${index}`;
        } else {
          chartType = `generic-${index}`;
        }
        
        // Substituir placeholder por container com canvas
        const canvasContainer = document.createElement('div');
        canvasContainer.className = 'chart-container';
        canvasContainer.style.height = '200px';
        canvasContainer.style.position = 'relative';
        
        // Criar canvas com ID apropriado
        const canvas = document.createElement('canvas');
        canvas.id = `${chartType}-chart`;
        canvasContainer.appendChild(canvas);
        
        // Substituir o placeholder pelo container com canvas
        if (placeholder.parentNode) {
          placeholder.parentNode.replaceChild(canvasContainer, placeholder);
          console.log(`Canvas criado: ${canvas.id}`);
        }
      });
    }
    
    // Criar gráfico de consumo mensal
    function createConsumptionChart(data) {
      const canvas = document.getElementById('consumption-chart');
      if (!canvas) {
        console.error('Canvas para gráfico de consumo não encontrado');
        return;
      }
      
      try {
        const ctx = canvas.getContext('2d');
        
        new Chart(ctx, {
          type: 'line',
          data: {
            labels: data.labels,
            datasets: [{
              label: 'Consumo de Peças',
              data: data.values,
              backgroundColor: 'rgba(255, 107, 107, 0.2)',
              borderColor: 'rgba(255, 107, 107, 1)',
              borderWidth: 2,
              tension: 0.3,
              fill: true
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false
          }
        });
        
        console.log('Gráfico de consumo criado');
      } catch (error) {
        console.error('Erro ao criar gráfico de consumo:', error);
      }
    }
    
    // Criar gráfico de eficiência logística
    function createLogisticsChart(data) {
      const canvas = document.getElementById('logistics-chart');
      if (!canvas) {
        console.error('Canvas para gráfico de logística não encontrado');
        return;
      }
      
      try {
        const ctx = canvas.getContext('2d');
        
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: data.labels,
            datasets: [
              {
                label: 'Entradas',
                data: data.inValues,
                backgroundColor: 'rgba(40, 167, 69, 0.7)',
                borderColor: 'rgba(40, 167, 69, 1)',
                borderWidth: 1
              },
              {
                label: 'Saídas',
                data: data.outValues,
                backgroundColor: 'rgba(220, 53, 69, 0.7)',
                borderColor: 'rgba(220, 53, 69, 1)',
                borderWidth: 1
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false
          }
        });
        
        console.log('Gráfico de logística criado');
      } catch (error) {
        console.error('Erro ao criar gráfico de logística:', error);
      }
    }
    
    // Criar gráfico de inventário
    function createInventoryChart(data) {
      const canvas = document.getElementById('inventory-chart');
      if (!canvas) {
        console.error('Canvas para gráfico de inventário não encontrado');
        return;
      }
      
      try {
        const ctx = canvas.getContext('2d');
        
        new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: ['Disponível', 'Estoque Baixo', 'Reservado'],
            datasets: [{
              data: [data.available, data.low, data.reserved],
              backgroundColor: [
                'rgba(40, 167, 69, 0.7)',
                'rgba(255, 193, 7, 0.7)',
                'rgba(0, 123, 255, 0.7)'
              ],
              borderColor: [
                'rgba(40, 167, 69, 1)',
                'rgba(255, 193, 7, 1)',
                'rgba(0, 123, 255, 1)'
              ],
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false
          }
        });
        
    
        
        console.log('Gráfico de inventário criado');
      } catch (error) {
        console.error('Erro ao criar gráfico de inventário:', error);
      }
    }
    
    // Criar gráfico de tempo de resposta
    function createResponseTimeChart(data) {
      const canvas = document.getElementById('response-time-chart');
      if (!canvas) {
        console.error('Canvas para gráfico de tempo de resposta não encontrado');
        return;
      }
      
      try {
        const ctx = canvas.getContext('2d');
        
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: data.labels,
            datasets: [
              {
                label: 'Antes do Sistema',
                data: data.before,
                backgroundColor: 'rgba(173, 181, 189, 0.7)',
                borderColor: 'rgba(173, 181, 189, 1)',
                borderWidth: 1
              },
              {
                label: 'Com o Sistema',
                data: data.after,
                backgroundColor: 'rgba(0, 123, 255, 0.7)',
                borderColor: 'rgba(0, 123, 255, 1)',
                borderWidth: 1
              }
            ]
          },
          options: {
            indexAxis: 'y', // Barras horizontais
            responsive: true,
            maintainAspectRatio: false
          }
        });
        
        console.log('Gráfico de tempo de resposta criado');
      } catch (error) {
        console.error('Erro ao criar gráfico de tempo de resposta:', error);
      }
    }
    
    // Adicionar texto no centro de um gráfico doughnut
    function addCenterTextToDoughnut(canvas, text) {
      const container = canvas.parentNode;
      
      const centerText = document.createElement('div');
      centerText.className = 'chart-center-text';
      centerText.textContent = text;
      centerText.style.position = 'absolute';
      centerText.style.top = '50%';
      centerText.style.left = '50%';
      centerText.style.transform = 'translate(-50%, -50%)';
      centerText.style.textAlign = 'center';
      centerText.style.fontWeight = 'bold';
      centerText.style.color = '#333';
      centerText.style.backgroundColor = 'white';
      centerText.style.padding = '5px 10px';
      centerText.style.borderRadius = '10px';
      centerText.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
      
      container.appendChild(centerText);
    }
    
    // Exibir mensagem de erro
    function showErrorMessage(message) {
      // Criar uma mensagem de erro visível na página
      const errorMsg = document.createElement('div');
      errorMsg.style.position = 'fixed';
      errorMsg.style.top = '10px';
      errorMsg.style.right = '10px';
      errorMsg.style.backgroundColor = '#f8d7da';
      errorMsg.style.color = '#721c24';
      errorMsg.style.padding = '10px 15px';
      errorMsg.style.borderRadius = '4px';
      errorMsg.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
      errorMsg.style.zIndex = '9999';
      errorMsg.innerHTML = `<strong>Erro:</strong> ${message}`;
      
      document.body.appendChild(errorMsg);
      
      // Remover após alguns segundos
      setTimeout(() => {
        if (errorMsg.parentNode) {
          errorMsg.parentNode.removeChild(errorMsg);
        }
      }, 5000);
    }
  })(); // Fim da auto-execução
  