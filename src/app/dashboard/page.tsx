import { CONFIG } from 'src/global-config';

import { CoursesListView } from 'src/sections/courses/view/courses-list-view';

// ----------------------------------------------------------------------

export const metadata = { title: `لوحة التحكم - ${CONFIG.appName}` };

export default function Page() {
  return <CoursesListView />;
}
