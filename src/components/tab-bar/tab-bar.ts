import './tab-bar.scss';

import m from 'mithril';

const TabBar = {
  view(vnode) {
    return m('footer.tab-bar', vnode.children);
  }
};

export default TabBar;
