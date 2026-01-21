import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { ChartPie, Key, NewspaperIcon, NotepadText, UserCheck, UserRoundCog, Users } from 'lucide-react';
import AppLogo from './app-logo';


const mainNavDashboard: NavItem[] = [
    {
        title: "Dashbord",
        href: "dashboard",
        icon: ChartPie,
        permission: 'dashboard',
    }
];
const mainNavMaster: NavItem[] = [
    {
        title: "Pegawai",
        href: "master.pegawai.index",
        icon: Users,
        permission: 'pegawai-index',
    },
    {
        title: "Pengguna",
        href: "master.pengguna.index",
        icon: UserCheck,
        permission: 'pengguna-index',
    },
    {
        title: "Lampiran",
        href: "master.lampiran.index",
        icon: NewspaperIcon,
        permission: 'lampiran-index',
    },
    {
        title: "Pelayanan",
        href: "master.pelayanan.index",
        icon: NotepadText,
        permission: 'pelayanan-index',
    },
];
const footerNavItems: NavItem[] = [
    {
        title: 'Role',
        href: 'role.index',
        icon: UserRoundCog,
        permission: 'role-index',
    },
    {
        title: 'Permission',
        href: 'permission.index',
        icon: Key,
        permission: 'permission-index',
    }
];

export function AppSidebar() {
    const { permissions }: any = usePage().props.auth
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavDashboard} permissions={permissions} title="Dashboard" />
                <NavMain items={mainNavMaster} permissions={permissions} title="Master" />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} permissions={permissions} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
