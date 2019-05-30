import './list-view.scss';

import m from 'mithril';
import SettingsMenu from '../settings-menu';

const ListView = {
  view(vnode) {
    const { data } = vnode.attrs;
    return m('.list-view', [
      m('list-item.list-header', [
        m('span.list-header-item', 'Title'),
        m('span.list-header-item', 'Enabled'),
        m('span.list-header-item', 'Views'),
        m('span.list-header-item', m.trust('&nbsp;')),
      ]),
      ...data.map((dataItem, idx) => m('.list-item', { key: `item${idx}` }, [
        m('div.data-item-title', m('span', dataItem.title)),
        m('div.data-item-enabled', dataItem.enabled ? m('i.fas.fa-check') : m('i.fas.fa-times')),
        m('div.data-item-views', m('span', String(dataItem.views))),
        m(SettingsMenu)
      ]))
    ])
  }
} as m.Component<any, any>;

export default ListView;
