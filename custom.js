const { markmap } = window;
const toolbar = new markmap.Toolbar();
toolbar.setBrand(false); // Remove o logo
toolbar.attach(mm);
const el = toolbar.render();
el.style.position = "absolute";
el.style.bottom = "20px";
el.style.right = "20px";
document.body.append(el); 