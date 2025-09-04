import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { logoutUser } from '@/lib/firebase';
import { useToast } from '@/components/ui/use-toast';
import UserAvatar from '@/components/UserAvatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { User, LogOut, Settings, BookOpen } from 'lucide-react';

const UserMenu = () => {
  const { currentUser } = useAuth();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await logoutUser();
      toast({
        title: 'Berhasil keluar',
        description: 'Anda telah berhasil keluar dari akun Anda.',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Gagal keluar',
        description: 'Terjadi kesalahan saat mencoba keluar. Silakan coba lagi.',
      });
    }
  };

  if (!currentUser) {
    return (
      <div className="flex items-center space-x-3">
        <Button variant="ghost" size="sm" asChild>
          <Link to="/login">Masuk</Link>
        </Button>
        <Button variant="hero" size="sm" asChild>
          <Link to="/register">Daftar Gratis</Link>
        </Button>
      </div>
    );
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <UserAvatar user={currentUser} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 bg-white border shadow-lg" sideOffset={5}>
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {currentUser.displayName || 'Pengguna'}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {currentUser.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/profile" className="flex w-full cursor-pointer items-center">
            <User className="mr-2 h-4 w-4" />
            <span>Profil Saya</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/dashboard" className="flex w-full cursor-pointer items-center">
            <BookOpen className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/profile?tab=settings" className="flex w-full cursor-pointer items-center">
            <Settings className="mr-2 h-4 w-4" />
            <span>Pengaturan</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="text-red-500 focus:text-red-500">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Keluar</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;