
import {  useState, useCallback, useEffect } from 'react';
import { useScreenType } from './useScreenType';




type FullCalendarApiRef = React.RefObject<{ getApi: () => any } | null>;
type DivRef = React.RefObject<HTMLDivElement | null>;

export const useCalendarLayout = (
  calendarRef: FullCalendarApiRef,
  containerRef: DivRef,
  screenType: ReturnType<typeof useScreenType>
) => {
  const MOBILE_BREAKPOINT = 672;
  const [isMobileWidth, setIsMobileWidth] = useState(false);

  const checkMobileWidth = useCallback(() => {
    setIsMobileWidth(window.innerWidth <= MOBILE_BREAKPOINT);
  }, []);

  const adjustCalendarLayout = useCallback(() => {
    const calendarApi = calendarRef.current?.getApi?.();
    const calendarEl = containerRef.current;
    if (!calendarApi || !calendarEl) return;

    const header = document.querySelector('header');
    const toolbar = document.querySelector('.fc-header-toolbar');
    const footer = document.querySelector('footer');
    
    const headerHeight = header?.clientHeight || 0;
    const toolbarHeight = toolbar?.clientHeight || 0;
    const isMobileDevice = screenType === "mobail" || screenType === "tablet";
    const footerHeight = isMobileDevice ? (footer?.clientHeight || 80) : 0;

    const viewportHeight = window.innerHeight;
    const availableHeight = viewportHeight - headerHeight - toolbarHeight - footerHeight;
    
    calendarEl.style.height = `${availableHeight}px`;
    calendarEl.style.minHeight = `${availableHeight}px`;
    calendarEl.style.overflow = 'hidden';

    if (calendarApi.view.type === "dayGridMonth") {
      const dayCells = calendarEl.querySelectorAll<HTMLElement>(".fc-daygrid-day");
      if (dayCells.length > 0) {
        if (isMobileWidth) {
          const rowHeight = availableHeight / 6;
          dayCells.forEach(cell => {
            cell.style.height = `${rowHeight}px`;
            cell.style.minHeight = `${rowHeight}px`;
          });
        } else {
          const cellWidth = dayCells[0].clientWidth;
          dayCells.forEach(cell => {
            cell.style.height = `${cellWidth}px`;
            cell.style.minHeight = `${cellWidth}px`;
          });
        }
      }
    }

    calendarApi.updateSize();
  }, [screenType, isMobileWidth, calendarRef, containerRef]);

  useEffect(() => {
    checkMobileWidth();
    adjustCalendarLayout();

    const handleResize = () => {
      requestAnimationFrame(() => {
        checkMobileWidth();
        adjustCalendarLayout();
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [adjustCalendarLayout, checkMobileWidth]);

  return {
    adjustCalendarLayout,
    isMobileWidth,
    calendarClasses: (screenType === "mobail" || screenType === "tablet") ? 'pb-[80px]' : ''
  };
};