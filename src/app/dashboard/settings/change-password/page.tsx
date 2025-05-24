import { CONFIG } from 'src/global-config';

import { BlankView } from 'src/sections/blank/view';

// ----------------------------------------------------------------------

export const metadata = { title: `تغيير كلمة المرور | لوحة التحكم - ${CONFIG.appName}` };

export default function Page() {
  return <BlankView title="تغير كلمة المرور" />;
}
