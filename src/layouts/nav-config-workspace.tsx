import { CONFIG } from 'src/global-config';

import type { WorkspacesPopoverProps } from './components/workspaces-popover';

// ----------------------------------------------------------------------

export const _workspaces: WorkspacesPopoverProps['data'] = [
  {
    id: 'team-1',
    name: 'فرع القاهرة',
    plan: 'Free',
  },
  {
    id: 'team-2',
    name: 'فرع بني سويف',
    plan: 'Pro',
  },
  {
    id: 'team-3',
    name: 'فرع الجيزة',
    plan: 'Pro',
  },
];
