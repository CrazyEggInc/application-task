import './sign-in.scss';

import m from 'mithril';

import AuthLayout from '@/layouts/auth-layout';
import SignInForm from '@/components/sign-in-form';

const SignIn = {
  view(vnode) {
    return m('#app', m(AuthLayout, [
      m(SignInForm),
    ]));
  }
};

export default SignIn;
