
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
  const TABLET_BREAKPOINT = 1024;
  const [isMobileWidth, setIsMobileWidth] = useState(false);
  const [isTabletWidth, setIsTabletWidth] = useState(false);

  const checkViewport = useCallback(() => {
    const width = window.innerWidth;
    setIsMobileWidth(width <= MOBILE_BREAKPOINT);
    setIsTabletWidth(width > MOBILE_BREAKPOINT && width <= TABLET_BREAKPOINT);
  }, []);

  const adjustCalendarLayout = useCallback(() => {
    const calendarApi = calendarRef.current?.getApi?.();
    const calendarEl = containerRef.current;
    if (!calendarApi || !calendarEl) return;

    const toolbar = document.querySelector('.fc-header-toolbar');
    const toolbarHeight = toolbar?.clientHeight || 0;

    const viewportHeight = window.innerHeight;
    const availableHeight = viewportHeight - toolbarHeight;
    
    calendarEl.style.height = `${availableHeight}px`;
    calendarEl.style.minHeight = `${availableHeight}px`;
    calendarEl.style.overflow = 'hidden';

    if (calendarApi.view.type === "dayGridMonth") {
      const dayCells = calendarEl.querySelectorAll<HTMLElement>(".fc-daygrid-day");
      if (dayCells.length > 0) {
        if (isMobileWidth) {
          // Мобильная версия - фиксированная высота строк
          const rowHeight = availableHeight / 6;
          dayCells.forEach(cell => {
            cell.style.height = `${rowHeight}px`;
            cell.style.minHeight = `${rowHeight}px`;
          });
        } else {
          const cellWidth = dayCells[0].clientWidth;
          const aspectRatio = window.innerHeight / window.innerWidth;
          
          // Для планшетов с высокой высотой экрана (например, iPad)
          if (isTabletWidth && aspectRatio > 1.25) {
            // Растягиваем по высоте, сохраняя минимальный размер как квадрат
            const calculatedHeight = Math.max(cellWidth, availableHeight / 6);
            dayCells.forEach(cell => {
              cell.style.height = `${calculatedHeight}px`;
              cell.style.minHeight = `${cellWidth}px`; // Минимум квадрат
            });
          } else {
            // Обычные десктопы и планшеты в альбомной ориентации - квадратные ячейки
            dayCells.forEach(cell => {
              cell.style.height = `${cellWidth}px`;
              cell.style.minHeight = `${cellWidth}px`;
            });
          }
        }
      }
    }

    calendarApi.updateSize();
  }, [screenType, isMobileWidth, isTabletWidth, calendarRef, containerRef]);

  useEffect(() => {
    checkViewport();
    adjustCalendarLayout();

    const handleResize = () => {
      requestAnimationFrame(() => {
        checkViewport();
        adjustCalendarLayout();
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [adjustCalendarLayout, checkViewport]);

  return {
    adjustCalendarLayout,
    isMobileWidth,
    calendarClasses: ''
  };
};