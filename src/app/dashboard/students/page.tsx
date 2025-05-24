import { CONFIG } from 'src/global-config';

import { StudentListView } from 'src/sections/student/view/student-list-view';

// ----------------------------------------------------------------------

export const metadata = { title: `الطلاب | لوحة التحكم - ${CONFIG.appName}` };

export default function Page() {
  return <StudentListView />;
}
