const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

// Lê o template
const template = fs.readFileSync('template-xfx.html', 'utf8');

// Lê o arquivo markdown
const markdown = fs.readFileSync('exemplo.md', 'utf8');

// Converte markdown para HTML
const tokens = marked.lexer(markdown);
const data = {
  content: tokens[0].text,
  children: tokens.slice(1).map(token => ({
    content: token.text,
    children: [],
    payload: { tag: 'li', lines: `${token.line},${token.line + 1}` }
  }))
};

// Substitui o conteúdo no template
const result = template.replace(
  /\{\s*"content"\s*:\s*"[^"]+"\s*,\s*"children"\s*:\s*\[[^\]]+\]\s*\}/,
  JSON.stringify(data)
);

// Salva o arquivo final
fs.writeFileSync(path.join('xfx-theme', 'mapa.html'), result);
console.log('Mapa mental gerado com sucesso!'); 