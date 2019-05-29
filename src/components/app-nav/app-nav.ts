import './app-nav.scss';

import m from 'mithril';

import CeLogo from '@/assets/images/ce_logo.png';

import BurgerMenu from '@/components/burger-menu';
import DrawerMenu from '../drawer-menu';

interface AppNavProps {
  userProfile: any;
}

interface AppNavState {
  drawerOpened: boolean;
}

const AppNav = {
  oninit() {
    this.drawerOpened = false;
  },
  view(vnode) {
    const { userProfile } = vnode.attrs;
    return m('nav.app-nav', [
      m('img.ce-logo', { src: CeLogo }),
      m(BurgerMenu, { toggleDrawer: () => { this.drawerOpened = !this.drawerOpened } }),
      this.drawerOpened ? m(DrawerMenu, { userProfile, closeDrawer: () => { this.drawerOpened = false } }) : null,
    ]);
  }
} as m.Component<AppNavProps, AppNavState>;

export default AppNav;
