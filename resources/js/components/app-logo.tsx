import { useEffect, useState } from 'react';
import logobk from '../../icon/logo-mini-bk.png';
import logowh from '../../icon/logo-mini-wh.png';
export default function AppLogo() {
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
        <>
            <div className="flex aspect-square size-12 items-center justify-center rounded-md text-sidebar-primary-foreground">
                <img src={logoMini} alt="Logo Mini" />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-tight font-semibold">
                    WASPADA<br />
                    <small>Pengawasan Pajak Daerah</small>
                </span>
            </div>
        </>
    );
}
