import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User2 } from 'lucide-react';
// import type { Session } from 'next-auth';
// import { signIn, signOut } from 'next-auth/react';
import { Button } from './ui/button';
import LichessLogo from './ui/lichess-logo';
import * as React from 'react';
import { cn } from '@/lib/utils';

export interface AuthButtonProps {
  // session: Session | null;
  className: string;
}

export default function AuthButton({ className }: AuthButtonProps) {
  const handleSignIn = () => {
    // signIn('lichess', { callbackUrl: '/' });
  };

  const handleSignOut = () => {
    // signOut({ callbackUrl: '/' }); 
  };

  // if (!session) {
    return (
      <div className={className}>
        <Button
          className={`flex-row gap-2 p-2`}
          variant="ghost"
          onClick={handleSignIn}
        >
          <LichessLogo size="24" />
          sign in
        </Button>
      </div>
    );
  // }

  return (
    <div className={className}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="select-none gap-2 p-3">
            <User2 />
            {/* {session.user?.username} */}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="flex w-max justify-end"
          onClick={handleSignOut}
        >
          <DropdownMenuItem className="flex w-full justify-center">
            sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
