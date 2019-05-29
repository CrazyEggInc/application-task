import './app-layout.scss';

import m from 'mithril';

import AppNav from '@/components/app-nav';
import TabBar from '@/components/tab-bar';
import Tab from '@/components/tab';

interface AppLayoutState {
  userProfile: any;
  closeMenus: () => void;
}

const AppLayout = {
  oninit() {
    this.userProfile = {};
  },
  async oncreate() {
    const layout = document.querySelector('.app-layout') as HTMLDivElement;
    layout.addEventListener('click', this.closeMenus);

    // load random user
    const user: { results: any[] } = await m.request('https://randomuser.me/api/');
    this.userProfile = { ...user.results[0] };
  },
  onbeforeremove() {
    const layout = document.querySelector('.app-layout') as HTMLDivElement;
    layout.removeEventListener('click', this.closeMenus);
  },
  closeMenus(e) {
    e.stopPropagation();
    const openMenu = document.querySelector('.menu-open') as HTMLDivElement;
    openMenu.classList.remove('menu-open');
  },
  view(vnode) {
    return m('.app-layout', [
      m(AppNav, { userProfile: this.userProfile }),
      vnode.children,
      m(TabBar, [
        m(Tab, { title: 'Running', route: '/#!/dashboard' }),
        m(Tab, { title: 'Completed', route: '/#!/dashboard/completed' }),
        m(Tab, { title: 'All', route: '/#!/dashboard/all' }),
      ]),
    ]);
  }
} as m.Component<any, AppLayoutState>;

export default AppLayout;