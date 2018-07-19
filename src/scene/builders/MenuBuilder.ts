import { zip } from 'utils';

type ClassAndOption = [string, string];

function menuTemplate(options: ClassAndOption[]): string {
  return `
     <li data-type="placeholder" class="past2"></li>
     <li data-type="placeholder" class="past1"></li>
     ${options.map(([className, option]) => `<li class="${className}">${option}</li>`).join('\n')}
  `;
}

export function buildMenu(options: string[]): HTMLElement {
  const styles = options.map((s) => 'outBottom');
  if (options.length > 0) {
    styles[0] = 'current';
  }
  if (options.length > 1) {
    styles[1] = 'future1';
  }
  if (options.length > 2) {
    styles[2] = 'future2';
  }

  const templateInst = menuTemplate(zip(styles, options) as ClassAndOption[]);
  const menu = document.createElement('ul');
  menu.innerHTML = templateInst;
  return menu;
}

export default {
  buildMenu
};
