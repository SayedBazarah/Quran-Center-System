import type { NavSectionProps } from 'src/components/nav-section';

import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/global-config';

import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`${CONFIG.assetsDir}/assets/icons/navbar/${name}.svg`} />
);

const ICONS = {
  job: icon('ic-job'),
  blog: icon('ic-blog'),
  chat: icon('ic-chat'),
  mail: icon('ic-mail'),
  user: icon('ic-user'),
  file: icon('ic-file'),
  lock: icon('ic-lock'),
  tour: icon('ic-tour'),
  order: icon('ic-order'),
  label: icon('ic-label'),
  blank: icon('ic-blank'),
  kanban: icon('ic-kanban'),
  folder: icon('ic-folder'),
  course: icon('ic-course'),
  banking: icon('ic-banking'),
  booking: icon('ic-booking'),
  invoice: icon('ic-invoice'),
  product: icon('ic-product'),
  calendar: icon('ic-calendar'),
  disabled: icon('ic-disabled'),
  external: icon('ic-external'),
  menuItem: icon('ic-menu-item'),
  ecommerce: icon('ic-ecommerce'),
  analytics: icon('ic-analytics'),
  dashboard: icon('ic-dashboard'),
  parameter: icon('ic-parameter'),
};

// ----------------------------------------------------------------------

export const navData: NavSectionProps['data'] = [
  /**
   * Overview
   */
  {
    subheader: 'نظرة عامة',
    items: [
      {
        title: 'المراحل',
        path: paths.dashboard.root,
        icon: ICONS.course,
      },
      { title: 'المعلمين', path: paths.dashboard.teachers, icon: ICONS.external },
      { title: 'الطلاب', path: paths.dashboard.students, icon: ICONS.user },

      {
        title: 'الاعدادات',
        path: paths.dashboard.settings.root,
        icon: ICONS.dashboard,
        children: [
          { title: 'المسنخدمين', path: paths.dashboard.settings.users, icon: ICONS.user },
          {
            title: 'امهام والصلاحيات',
            path: paths.dashboard.settings.roles,
            icon: ICONS.tour,
          },
          {
            title: 'تغيير كلمة المرور',
            path: paths.dashboard.settings.changePassword,
            icon: ICONS.lock,
          },
        ],
      },
    ],
  },
];
