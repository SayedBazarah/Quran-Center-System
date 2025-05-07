export interface ICourseItem {
  _id: string;
  name: string;
  teacher: {
    key: string;
    name: string;
  };
  duration: number; // Number of months
  price: number;
  level: number;
}

export interface ICourseTableFilters {
  name: string;
  teacher: string;
}
