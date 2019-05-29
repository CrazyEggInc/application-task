import './burger-menu.scss';

import m from 'mithril';

const BurgerMenu = {
  view(vnode) {
    const { toggleDrawer } = vnode.attrs;
    return m('button.burger-menu[type=button]', {
      onclick(e) {
        toggleDrawer();
      }
    },
      m('span.burger-box',
        m('span.burger-inner')
      )
    );
  }
} as m.Component<any, any>;

export default BurgerMenu;
