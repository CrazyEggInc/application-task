import './user-profile.scss';

import m from 'mithril';

const UserProfile = {
  view(vnode) {
    const { userProfile } = vnode.attrs;
    return m('.user-profile', [
      m('img.user-avatar', { src: userProfile.picture.large }),
      m('span.user-name', `${userProfile.name.first} ${userProfile.name.last}`),
    ]);
  }
};

export default UserProfile;
