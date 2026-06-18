import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { LogOut, Mail, User, UserCog } from "lucide-react";
import Link from "next/link";
import { signOut } from "@/auth";

export default function NavbarDropdown() {
  return (
    <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="outline" size="sm">
        <User className="w-4 h-4" />
        Sua conta
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" className="w-52 space-y-2">
      <DropdownMenuItem>
        <Link
          href="/dashboard/account-settings"
          className="flex items-center gap-2 cursor-pointer"
        >
          <UserCog className="w-4 h-4" />
          Configurações
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <Link
          href="/dashboard/contact"
          className="flex items-center gap-2 cursor-pointer"
        >
          <Mail className="w-4 h-4" />
          Contato
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
          className="w-full"
        >
          <Button
            variant="destructive"
            size="sm"
            className="w-full justify-start"
          >
            <LogOut className="w-4 h-4 text-white" />
            Sair
          </Button>
        </form>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
  )
}