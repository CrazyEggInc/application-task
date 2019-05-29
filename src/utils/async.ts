
export const sleep = (milliseconds): Promise<any> => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
};

export function debounce(func, wait, immediate?): (...args: any) => void {
  let timeout;
  return (...args): void => {
    const later = (): void => {
      timeout = null;
      if (!immediate) {
        func.apply(this, args);
      }
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) {
      func.apply(this, args);
    }
  }
};
