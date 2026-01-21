import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';
import type { route as routeFn } from 'ziggy-js';

declare global {
    const route: typeof routeFn;
}

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
    permission?: string;
    items? : {
        title: string
        href: string
        permission?: string;
    }[]
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    nid: string;
    name: string;
    email: string;
    telp: string;
    avatar?: string;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface InfoDataTabel {
    page: number | 1,
    from: number | 0,
    to: number | 0,
    total: number | 0,
    perPage: number | 25,
    search?: string | null,
    berdasarkan?: string | null,
}

export interface LinkPagination {
    label: string
    url: string | null
    active: boolean
}

export interface IndexGate {
    gate: {
        create: boolean
        update: boolean
        delete: boolean
    }
}

export interface Gate {
    create: boolean
    update: boolean
    delete: boolean
    validasi?: boolean
}
