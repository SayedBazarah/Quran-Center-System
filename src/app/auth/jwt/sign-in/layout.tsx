import { GuestGuard } from 'src/auth/guard';
import { AuthCenteredLayout } from 'src/layouts/auth-centered';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <GuestGuard>
      <AuthCenteredLayout>{children}</AuthCenteredLayout>
    </GuestGuard>
  );
}
