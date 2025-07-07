export type filter = {
  duration: number;
  priceRange: {
    minValue: number;
    maxValue: number;
  };
  [key: string]: boolean | number | { minValue: number; maxValue: number }; // To handle dynamic tags
};
