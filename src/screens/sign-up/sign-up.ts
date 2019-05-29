import './sign-up.scss';

import m from 'mithril';

import AuthLayout from '@/layouts/auth-layout';
import SignUpForm from '@/components/sign-up-form';

const SignUp = {
  view(vnode) {
    return m('#app', m(AuthLayout, [
      m(SignUpForm),
    ]));
  }
};

export default SignUp;
