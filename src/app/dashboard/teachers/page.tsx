import { CONFIG } from 'src/global-config';

import { TeachersListView } from 'src/sections/teacher/view/teacher-list-view';

// ----------------------------------------------------------------------

export const metadata = { title: `المدرسين | لوحة التحكم - ${CONFIG.appName}` };

export default function Page() {
  return <TeachersListView />;
}
