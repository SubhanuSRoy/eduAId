import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../features/user/user-slice';
import teacherSlice from '../features/teacher/teacher-slice';
import studentSlice from '../features/student/student-slice';

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    teacher: teacherSlice.reducer,
    student: studentSlice.reducer,
  },
});
