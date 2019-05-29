import './auth-layout.scss';

import m from 'mithril';

import CeLogo from '@/assets/images/ce_logo.png';

const AuthLayout = {
  view(vnode) {
    return m('.auth-layout', [
      m('section.logo-section', m('img.ce-logo', { src: CeLogo })),
      m('section.background-curve'),
      m('section.content-section', vnode.children),
    ]);
  }
};

export default AuthLayout;
