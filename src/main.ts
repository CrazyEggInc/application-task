import "core-js/stable";
import "regenerator-runtime/runtime";

import './application.scss';

import m from 'mithril';

import AppLayout from '@/layouts/app-layout';

import SignInScreen from '@/screens/sign-in';
import SignUpScreen from '@/screens/sign-up';
import DashboardScreen from '@/screens/dashboard';

const dummyData = [
  {
    title: 'Home Page',
    enabled: false,
    views: 1300,
  },
  {
    title: 'Home Page - Dark Mode',
    enabled: true,
    views: 1050,
  },
  {
    title: 'Contact Us',
    enabled: false,
    views: 900,
  },
  {
    title: 'About Me',
    enabled: true,
    views: 90,
  },
  {
    title: 'Posts',
    enabled: true,
  }
];

m.route(document.body, '/login', {
  '/login': SignInScreen,
  '/register': SignUpScreen,
  '/dashboard': {
    view() {
      return m(AppLayout, m(DashboardScreen, { state: 'running', data: dummyData }));
    }
  },
  '/dashboard/completed': {
    view() {
      return m(AppLayout, m(DashboardScreen, { state: 'completed', data: dummyData }));
    }
  },
  '/dashboard/all': {
    view() {
      return m(AppLayout, m(DashboardScreen, { state: 'all', data: dummyData }));
    }
  }
});
