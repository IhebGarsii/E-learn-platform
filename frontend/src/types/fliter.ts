export type filter = {
  duration: string;
  priceRange: {
    minValue: number;
    maxValue: number;
  };
  [key: string]: boolean | string | { minValue: number; maxValue: number }; // To handle dynamic tags
};
