import './dashboard.scss';

import m from 'mithril';
import ListView from '@/components/list-view';

const Dashboard = {
  view(vnode) {
    const { state, data } = vnode.attrs;
    let parsedData = [];
    if (state === 'completed') {
      parsedData = [].concat(data.filter(item => !item.enabled));
    } else if (state === 'running') {
      parsedData = [].concat(data.filter(item => item.enabled));
    } else {
      parsedData = [].concat(data);
    }
    return m(ListView, { data: parsedData });
  }
} as m.Component<any, any>;

export default Dashboard;
