import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { home } from '@/routes';
import { Link } from '@inertiajs/react';
import { useEffect, useState, type PropsWithChildren } from 'react';

import logobk from '../../../icon/logo-bk.png';
import logowh from '../../../icon/logo-wh.png';

export default function AuthCardLayout({
    children,
    title,
    description,
}: PropsWithChildren<{
    name?: string;
    title?: string;
    description?: string;
}>) {
    const [isDark, setIsDark] = useState(false);
    useEffect(() => {
        const checkDarkMode = () => {
            const isDarkMode = document.documentElement.classList.contains('dark');
            setIsDark(isDarkMode);
        };
        checkDarkMode();
        const observer = new MutationObserver(checkDarkMode);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class'],
        });

        return () => observer.disconnect();
    }, []);

    const logoMini = isDark ? logowh : logobk;
    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
            <div className="flex w-full max-w-md flex-col gap-1">
                <Link
                    href={home()}
                    className="flex items-center gap-2 self-center font-medium"
                >
                    <div className="flex h-auto items-center justify-center">
                        <img src={logoMini} className='h-44' alt="Logo Mini" />
                    </div>
                </Link>

                <div className="flex flex-col gap-6">
                    <Card className="rounded-xl">
                        <CardHeader className="px-10 pt-8 pb-0 text-center">
                            <CardTitle className="text-xl">{title}</CardTitle>
                            <CardDescription>{description}</CardDescription>
                        </CardHeader>
                        <CardContent className="px-10 py-8">
                            {children}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
