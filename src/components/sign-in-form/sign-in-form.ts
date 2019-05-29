import './sign-in-form.scss';

import m from 'mithril';

const SignInForm = {
  view() {
    return m('form.sign-in', {
      onsubmit(e) {
        e.preventDefault();
        window.location.href = '/#!/dashboard';
      }
    }, [
      m('label.input-label', { for: 'username' }, 'Username'),
      m('input.input-field', { name: 'username' }),
      m('label.input-label', { for: 'password' }, 'Password'),
      m('input.input-field[type=password]', { name: 'password' }),
      m('button.btn[type=submit]', 'Sign In'),
      m('a', { href: '/#!/register' }, m('span', 'Already have an account? ', m('span', 'Sign Up'))),
    ]);
  }
};

export default SignInForm;
