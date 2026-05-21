import { useNavigate } from "react-router-dom";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { UserIcon } from "@heroicons/react/20/solid";
import { LogOut } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

export default function UserDropDown() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Obtenemos las iniciales para el fallback (ej: "Juan Perez" -> "JP")
  const initials = user?.first_name
    ? `${user.first_name[0]}${user.last_name?.[0] || ""}`.toUpperCase()
    : "U";
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="outline-none">
          <Avatar className="h-10 w-10 border-2 border-gray-200 hover:border-primary transition-all cursor-pointer">
            <AvatarImage src={''} alt={user?.username} />
            <AvatarFallback className="bg-slate-100 font-bold">
              {initials}
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56 p-2">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.username}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => navigate("/profile")}
          className="cursor-pointer"
        >
          <UserIcon className="mr-2 h-4 w-4" />
          <span>Perfil</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={logout}
          className="text-red-600 focus:text-red-600 cursor-pointer"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Cerrar sesión</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
