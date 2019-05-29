import './settings-menu.scss';

import m from 'mithril';

const SettingsMenu = {
  view() {
    return m('.settings-menu', {
      style: {
        display: 'block',
      }
    }, [
      m('.settings-menu-button', {
        onclick(e) {
          e.stopPropagation();
          const openedMenu = document.querySelector('.settings-menu-button.menu-open') as HTMLDivElement;
          if (openedMenu) {
            openedMenu.classList.remove('menu-open');
          }
          (e.target as HTMLDivElement).classList.add('menu-open');
        }
      }, m('i.fas.fa-cog.menu-btn-icon')),
      m('ul.settings-menu-list', [
        m('li.settings-list-item', 'Refresh Snapshot'),
        m('li.settings-list-item', 'Pause Snapshot'),
        m('li.settings-list-item', 'Delete Snapshot'),
      ])
    ])
  }
} as m.Component<any, any>;

export default SettingsMenu;
