import { useEffect, useCallback } from "react";

export interface NavigationItem {
  name: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

interface UseNavigationOptions {
  onRouteChange?: (path: string) => void;
}

export const useNavigation = (
  items: NavigationItem[],
  currentPath: string,
  options: UseNavigationOptions = {}
) => {
  const { onRouteChange } = options;

  const getCurrentItem = useCallback(() => {
    return items.find((item) => item.path === currentPath);
  }, [items, currentPath]);

  const getCurrentTitle = useCallback(() => {
    const currentItem = getCurrentItem();
    return currentItem?.name ?? "Portfolio";
  }, [getCurrentItem]);

  const getCurrentIndex = useCallback(() => {
    return items.findIndex((item) => item.path === currentPath);
  }, [items, currentPath]);

  const getPreviousItem = useCallback(() => {
    const currentIndex = getCurrentIndex();
    return currentIndex > 0 ? items[currentIndex - 1] : null;
  }, [items, getCurrentIndex]);

  const getNextItem = useCallback(() => {
    const currentIndex = getCurrentIndex();
    return currentIndex < items.length - 1 ? items[currentIndex + 1] : null;
  }, [items, getCurrentIndex]);
  const isActive = useCallback(
    (path: string) => {
      return currentPath === path;
    },
    [currentPath]
  );

  const navigateToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (onRouteChange) {
      onRouteChange(currentPath);
    }
  }, [currentPath, onRouteChange]);
  return {
    items,
    currentItem: getCurrentItem(),
    currentTitle: getCurrentTitle(),
    currentIndex: getCurrentIndex(),
    previousItem: getPreviousItem(),
    nextItem: getNextItem(),
    isActive,
    navigateToSection,
    scrollToTop,
  };
};
