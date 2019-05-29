import './tab.scss';

import m from 'mithril';

const Tab = {
  view(vnode) {
    const { title, route: href } = vnode.attrs;
    return m('a.tab', { href, class: `${document.location.pathname}${document.location.hash}` === href ? 'tab-active' : '' }, title);
  }
};

export default Tab;
