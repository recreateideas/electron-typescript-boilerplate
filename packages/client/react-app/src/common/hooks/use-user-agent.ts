import { useState, useEffect, useMemo } from 'react';
import { UserAgent } from 'src/redux';
//@ts-ignore
import useMobileDetect from 'use-mobile-detect-hook';

export const useUserAgent = (): UserAgent | undefined => {
    const { isMobile, isDesktop, isAndroid, isIos } = useMobileDetect();
    const [ua, setUA] = useState<UserAgent | undefined>();
    useEffect(() => {
        const getUA = () => {
            const breakpoint = 620;
            const userAgent: UserAgent = {
                isMobile: isMobile() || window.innerWidth <= breakpoint,
                isDesktop: isDesktop(),
                isAndroid: isAndroid(),
                isIos: isIos(),
            };
            setUA(userAgent);
        };
        window.addEventListener('resize', getUA);
        getUA();
        return () => {
            window.removeEventListener('resize', getUA);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return useMemo(() => ua, [ua?.isMobile]);
};
