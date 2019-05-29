import './drawer-menu.scss';

import m from 'mithril';

import UserProfile from '@/components/user-profile';

const DrawerMenu = {
  view(vnode) {
    const { closeDrawer, userProfile } = vnode.attrs;
    return m('.drawer-menu', {}, [
      m('.drawer-close-trigger', {
        onclick(e) {
          closeDrawer();
        }
      }),
      m('.drawer-content', [
        m('.drawer-top', [
          // m(UserProfile, { profile })
          m(UserProfile, { userProfile }),
        ]),
        m('.drawer-bottom', [
          m('.btn.full', {
            onclick() {
              document.location.href = '/#!/';
            }
          }, 'Sign Out')
        ])
      ])
    ])
  }
};

export default DrawerMenu;
