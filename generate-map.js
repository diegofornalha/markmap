const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

// Pega os argumentos da linha de comando
const inputFile = process.argv[2] || 'xfx-theme/modulo-1/md/exemplo.md';
const outputFile = process.argv[3] || 'xfx-theme/modulo-1/html/mapa.html';

// Lê o template
const template = fs.readFileSync('template-xfx.html', 'utf8');

// Lê o arquivo markdown
const markdown = fs.readFileSync(inputFile, 'utf8');

// Função para limpar o texto de marcações HTML
function cleanText(text) {
  return text.replace(/<[^>]*>/g, '').trim();
}

// Configura o marked para processar listas corretamente
marked.use({
  gfm: true,
  breaks: true
});

// Função para processar o markdown em uma estrutura hierárquica
function processMarkdown(markdown) {
  const tokens = marked.lexer(markdown);
  let result = {
    content: '',
    children: []
  };
  
  let currentSection = result;
  let sectionStack = [result];
  let lastHeadingLevel = 1;
  
  // Processa os tokens em ordem
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    
    if (token.type === 'heading') {
      const headingLevel = token.depth;
      const headingText = cleanText(token.text);
      
      // Se é o primeiro heading, define como título principal
      if (!result.content) {
        result.content = headingText;
        continue;
      }
      
      // Cria nova seção
      const newSection = {
        content: headingText,
        children: [],
        payload: { tag: 'heading' }
      };
      
      // Ajusta a pilha de seções baseado no nível do heading
      while (sectionStack.length > 1 && headingLevel <= lastHeadingLevel) {
        sectionStack.pop();
        lastHeadingLevel--;
      }
      
      // Adiciona a nova seção como filha da seção atual
      sectionStack[sectionStack.length - 1].children.push(newSection);
      
      // Atualiza a seção atual
      sectionStack.push(newSection);
      lastHeadingLevel = headingLevel;
      currentSection = newSection;
    }
    else if (token.type === 'list') {
      // Processa itens da lista e adiciona à seção atual
      const items = processListItems(token.items);
      currentSection.children.push(...items);
    }
  }
  
  return result;
}

// Função para processar itens de lista
function processListItems(items) {
  return items.map(item => {
    const node = {
      content: cleanText(item.text),
      children: [],
      payload: { tag: 'li' }
    };
    
    if (item.items) {
      node.children = processListItems(item.items);
    }
    
    return node;
  });
}

// Processa o markdown
const data = processMarkdown(markdown);

// Debug da estrutura final
console.log('Estrutura final:', JSON.stringify(data, null, 2));

// Substitui o conteúdo no template
const result = template.replace('__MARKMAP_DATA__', JSON.stringify(data));

// Salva o arquivo final
fs.writeFileSync(outputFile, result);
console.log(`Mapa mental gerado com sucesso em ${outputFile}!`); 