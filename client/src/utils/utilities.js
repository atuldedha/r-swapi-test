export const debounce = (func, delay) => {
  let timeoutId;

  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

// Utility function to get color based on species number
export const getSpeciesColor = (speciesNumber) => {
  switch (parseInt(speciesNumber)) {
    case 1:
      return "#ff5722"; // Orange
    case 2:
      return "#2196f3"; // Blue
    case 3:
      return "#4caf50"; // Green
    case 4:
      return "#9c27b0"; // Purple
    case 5:
      return "#f44336"; // Red
    case 6:
      return "#673ab7"; // Deep Purple
    case 7:
      return "#ff9800"; // Amber
    case 8:
      return "#607d8b"; // Blue Grey
    case 9:
      return "#00bcd4"; // Cyan
    case 10:
      return "#795548"; // Brown
    default:
      return "#757575"; // Grey as default
  }
};
