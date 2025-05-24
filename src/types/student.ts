import type { Dayjs } from 'dayjs';

export interface IStudentItem {
  _id: string;
  name: string;
  pic: string;
  gender: number;
  branch: string;
  birthday: Dayjs;
  phone: string;
  parentId: string;

  courses: number;
  currentCourse: string;
}

export interface IStudentTableFilters {
  name: string;
}
