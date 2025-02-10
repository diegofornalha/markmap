const { markmap } = window;

// Configurações personalizadas do mapa
const options = {
  // Opções de layout
  autoFit: true, // Ajusta automaticamente o mapa à tela
  fitRatio: 0.95, // Proporção do ajuste
  spacingHorizontal: 100, // Espaçamento horizontal entre nós
  spacingVertical: 10, // Espaçamento vertical entre nós
  paddingX: 10, // Padding horizontal dos nós
  nodeMinHeight: 20, // Altura mínima dos nós
  maxWidth: 300, // Largura máxima dos nós

  // Opções de interação
  duration: 300, // Duração das animações
  zoom: true, // Habilita zoom
  pan: true, // Habilita pan
  toggleRecursively: true, // Expande/colapsa recursivamente
  initialExpandLevel: 2, // Nível inicial de expansão (-1 para expandir tudo)

  // Opções visuais
  color: (node) => {
    // Cores personalizadas baseadas no nível
    const colors = ['#2196F3', '#4CAF50', '#FFC107', '#E91E63', '#9C27B0'];
    return colors[node.state.depth % colors.length];
  },
  lineWidth: (node) => {
    // Largura da linha diminui com a profundidade
    return 3 - node.state.depth * 0.5;
  },
};

// Criar o mapa com as opções personalizadas
window.mm = markmap.Markmap.create('svg#mindmap', options);

// Configurar a toolbar personalizada
const toolbar = new markmap.Toolbar();
toolbar.setBrand(false); // Remove o logo
toolbar.attach(window.mm);
const el = toolbar.render();
el.style.position = "absolute";
el.style.bottom = "20px";
el.style.right = "20px";
document.body.append(el);

// Adicionar observador de eventos para ajuste automático
window.mm.on('renderData', () => {
  setTimeout(() => window.mm.fit(), 300);
}); 