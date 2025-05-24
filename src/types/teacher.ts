import type { Dayjs } from 'dayjs';

export interface ITeacherItem {
  _id: string;
  pic: string;
  name: string;
  gender: number;
  branch: string;
  birthday: Dayjs;
  phone: string;

  courses: number;
  students: number;
}

export interface ITeacherTableFilters {
  name: string;
}
