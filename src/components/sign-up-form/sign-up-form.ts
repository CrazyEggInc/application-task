import './sign-up-form.scss';

import m from 'mithril';

const SignUpForm = {
  view() {
    return m('form.sign-up', {
      onsubmit(e) {
        e.preventDefault();
        document.location.href = '/#!/login';
      }
    }, [
      m('label.input-label', { for: 'domain' }, 'Domain'),
      m('input.input-field', { name: 'domain', placeholder: 'crazyegg.com' }),
      m('label.input-label', { for: 'username' }, 'Username'),
      m('input.input-field', { name: 'username' }),
      m('label.input-label', { for: 'password' }, 'Password'),
      m('input.input-field[type=password]', { name: 'password' }),
      m('label.input-label', { for: 'confirm-password' }, 'Confirm Password'),
      m('input.input-field[type=password]', { name: 'confirm-password' }),
      m('button.btn[type=submit]', 'Sign Up'),
      m('a', { href: '/#!/login' }, m('span', 'Already have an account? ', m('span', 'Sign In'))),
    ]);
  }
};

export default SignUpForm;
