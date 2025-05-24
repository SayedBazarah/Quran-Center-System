import type { Dayjs } from 'dayjs';
import type { IStudentItem } from 'src/types/student';

import dayjs from 'dayjs';
import { z as zod } from 'zod';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { Stack, MenuItem } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import { toast } from 'src/components/snackbar';
import {
  Form,
  Field,
  RHFUpload,
  RHFSelect,
  schemaHelper,
  RHFPhoneInput,
  RHFUploadAvatar,
} from 'src/components/hook-form';

// ----------------------------------------------------------------------

export type StudentQuickEditSchemaType = zod.infer<typeof StudentQuickEditSchema>;

export const StudentQuickEditSchema = zod.object({
  pic: schemaHelper.file({ message: 'صورة الطالب' }),
  name: zod.string().min(1, { message: 'الاسم الطالب مطلوب!' }),
  gender: zod
    .number()
    .min(0, { message: 'نوع الطالب مطلوب!' })
    .max(1, { message: 'نوع الطالب مطلوب!' }),
  branch: zod.string().min(1, { message: 'الفرع مطلوب!' }),
  birthday: zod.custom<Dayjs>((value) => dayjs.isDayjs(value) && value.isValid(), {
    message: 'تاريخ الميلاد مطلوب!',
  }),
  phone: zod.string().min(1, { message: 'رقم الهاتف مطلوب!' }),
  parentId: schemaHelper.file({ message: 'صورة بطاقة الاب مطلوبة' }),
});

// ----------------------------------------------------------------------

type Props = {
  isNew?: boolean;
  open: boolean;
  onClose: () => void;
  currentStudent?: IStudentItem;
};

export function StudentQuickEditForm({ isNew = true, currentStudent, open, onClose }: Props) {
  const defaultValues: StudentQuickEditSchemaType = {
    pic: '',
    name: '',
    gender: 0,
    branch: 'cairo',
    birthday: dayjs(),
    phone: '',
    parentId: '',
  };

  const methods = useForm<StudentQuickEditSchemaType>({
    mode: 'all',
    resolver: zodResolver(StudentQuickEditSchema),
    defaultValues,
    values: currentStudent,
  });

  const {
    reset,
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    const promise = new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      reset();
      onClose();

      toast.promise(promise, {
        loading: 'تحميل...',
        success: 'تم التحديث بنجاح!',
        error: 'حدث خطأ أثناء التحديث!',
      });

      await promise;

      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: { maxWidth: 720 },
        },
      }}
    >
      <DialogTitle>{isNew ? 'اضافة طالب' : 'تحديث سريع'}</DialogTitle>

      <Form methods={methods} onSubmit={onSubmit}>
        <DialogContent>
          <Stack direction="column" spacing={2}>
            <RHFUploadAvatar name="pic" />
            <Stack direction="row" spacing={2}>
              <Field.Text name="name" label="اسم الطالب" />
              <RHFSelect name="gender" sx={{ maxWidth: 120 }}>
                <MenuItem key="0" value={0}>
                  ذكر
                </MenuItem>
                <MenuItem key="1" value={1}>
                  انثى
                </MenuItem>
              </RHFSelect>
            </Stack>
            <Stack direction="row" spacing={2}>
              <RHFSelect name="branch">
                <MenuItem key="cairo" value="cairo">
                  فرع القاهرة
                </MenuItem>
              </RHFSelect>
              <Controller
                name="birthday"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <DesktopDatePicker
                    openTo="year"
                    views={['year', 'month', 'day']}
                    label="تاريخ الميلاد"
                    value={dayjs(field.value)}
                    onChange={(date) => field.onChange(dayjs(date) ?? null)}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error: !!error,
                        helperText: error?.message,
                      },
                    }}
                  />
                )}
              />
            </Stack>
            <RHFPhoneInput name="phone" label="رقم الهاتف" country="EG" />
            <RHFUpload name="parentId" helperText="صورة بطاقة الاب" />
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={onClose}>
            الغاء
          </Button>

          <Button type="submit" variant="contained" loading={isSubmitting}>
            {isNew ? 'اضافة طالب' : 'تحديث'}
          </Button>
        </DialogActions>
      </Form>
    </Dialog>
  );
}
