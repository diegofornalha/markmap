import { mountDom, VChildren } from '@gera2ld/jsx-dom';
import type { Markmap } from 'markmap-view';
import './style.css';

export interface IToolbarItem {
  id?: string;
  title?: string;
  content: VChildren;
  onClick?: (e: Event) => void;
}

const clsToolbarItem = 'mm-toolbar-item';
const clsActive = 'active';

function renderItem({ title, content, onClick }: IToolbarItem) {
  return (
    <div className={clsToolbarItem} title={title} onClick={onClick}>
      {content}
    </div>
  );
}

let promise: Promise<void> | undefined;
function safeCaller<T extends unknown[]>(fn: (...args: T) => Promise<void>) {
  return async (...args: T) => {
    if (promise) return;
    promise = fn(...args);
    try {
      await promise;
    } finally {
      promise = undefined;
    }
  };
}

export class Toolbar {
  private showBrand = false;

  private registry: { [id: string]: IToolbarItem } = {};

  private markmap: Markmap | undefined;

  static defaultItems: (string | IToolbarItem)[] = [
    'zoomIn',
    'zoomOut',
    'fit',
    'recurse',
  ];

  el = mountDom(<div className="mm-toolbar" />) as HTMLDivElement;

  items = [...Toolbar.defaultItems];

  static create(mm: Markmap) {
    const toolbar = new Toolbar();
    toolbar.attach(mm);
    return toolbar;
  }

  static icon(path: string, attrs = {}) {
    attrs = {
      stroke: 'none',
      fill: 'currentColor',
      'fill-rule': 'evenodd',
      ...attrs,
    };
    return (
      <svg width="20" height="20" viewBox="0 0 20 20">
        <path {...attrs} d={path} />
      </svg>
    );
  }

  constructor() {
    this.register({
      id: 'zoomIn',
      title: 'Zoom in',
      content: Toolbar.icon('M9 5v4h-4v2h4v4h2v-4h4v-2h-4v-4z'),
      onClick: this.getHandler((mm) => mm.rescale(1.25)),
    });
    this.register({
      id: 'zoomOut',
      title: 'Zoom out',
      content: Toolbar.icon('M5 9h10v2h-10z'),
      onClick: this.getHandler((mm) => mm.rescale(0.8)),
    });
    this.register({
      id: 'fit',
      title: 'Fit window size',
      content: Toolbar.icon(
        'M4 7h2v-2h2v4h-4zM4 13h2v2h2v-4h-4zM16 7h-2v-2h-2v4h4zM16 13h-2v2h-2v-4h4z',
      ),
      onClick: this.getHandler((mm) => mm.fit()),
    });
    this.register({
      id: 'recurse',
      title: 'Toggle recursively',
      content: Toolbar.icon('M16 4h-12v12h12v-8h-8v4h2v-2h4v4h-8v-8h10z'),
      onClick: (e) => {
        const button = (e.target as HTMLDivElement).closest<HTMLDivElement>(
          `.${clsToolbarItem}`,
        );
        const active = button?.classList.toggle(clsActive);
        this.markmap?.setOptions({
          toggleRecursively: active,
        });
      },
    });
    this.render();
  }

  setBrand(show: boolean) {
    this.showBrand = show;
    return this.render();
  }

  register(data: IToolbarItem & { id: string }) {
    this.registry[data.id] = data;
  }

  getHandler(handle: (mm: Markmap) => Promise<void>) {
    handle = safeCaller(handle);
    return () => {
      if (this.markmap) handle(this.markmap);
    };
  }

  setItems(items: (string | IToolbarItem)[]) {
    this.items = [...items];
    return this.render();
  }

  attach(mm: Markmap) {
    this.markmap = mm;
  }

  render() {
    const items = this.items
      .map((item: string | IToolbarItem): IToolbarItem => {
        if (typeof item === 'string') {
          const data = this.registry[item];
          if (!data) console.warn(`[markmap-toolbar] ${item} not found`);
          return data;
        }
        return item;
      })
      .filter(Boolean);
    while (this.el.firstChild) {
      this.el.firstChild.remove();
    }
    this.el.append(mountDom(<>{items.map(renderItem)}</>));
    return this.el;
  }
}
