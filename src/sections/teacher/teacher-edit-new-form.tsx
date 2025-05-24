
import type { Dayjs } from 'dayjs';
import type { ITeacherItem } from 'src/types/teacher';

import dayjs from 'dayjs';
import { z as zod } from 'zod';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
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
  RHFSelect,
  schemaHelper,
  RHFPhoneInput,
  RHFUploadAvatar,
} from 'src/components/hook-form';

// ----------------------------------------------------------------------

export type TeacherQuickEditSchemaType = zod.infer<typeof TeacherQuickEditSchema>;

export const TeacherQuickEditSchema = zod.object({
  name: zod.string().min(1, { message: 'الاسم مطلوب!' }),
  pic: schemaHelper.file({ message: 'صورة الطالب' }),
  gender: zod
    .number()
    .min(0, { message: 'نوع الطالب مطلوب!' })
    .max(1, { message: 'نوع الطالب مطلوب!' }),
  branch: zod.string().min(1, { message: 'الفرع مطلوب!' }),
  birthday: zod.custom<Dayjs>((value) => dayjs.isDayjs(value) && value.isValid(), {
    message: 'تاريخ الميلاد مطلوب!',
  }),
  phone: zod.string().min(1, { message: 'رقم الهاتف مطلوب!' }),
});

// ----------------------------------------------------------------------

type Props = {
  isNew?: boolean;
  open: boolean;
  onClose: () => void;
  currentTeacher?: ITeacherItem;
};

export function TeacherQuickEditForm({ currentTeacher, open, onClose, isNew = true }: Props) {
  const defaultValues: TeacherQuickEditSchemaType = {
    name: '',
    pic: '',
    gender: 0,
    branch: '',
    birthday: dayjs(),
    phone: '',
  };

  const methods = useForm<TeacherQuickEditSchemaType>({
    mode: 'all',
    resolver: zodResolver(TeacherQuickEditSchema),
    defaultValues,
    values: currentTeacher,
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
      maxWidth={false}
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: { maxWidth: 720 },
        },
      }}
    >
      <DialogTitle>{isNew ? 'اضافة معلم' : 'تحديث سريع'}</DialogTitle>

      <Form methods={methods} onSubmit={onSubmit}>
        <DialogContent>
          <Box
            sx={{
              pt: 1,
              rowGap: 3,
              columnGap: 2,
              display: 'grid',
              gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: '1fr 2fr' },
            }}
          >
            <Stack>
              <RHFUploadAvatar name="pic" />
            </Stack>
            <Stack spacing={2}>
              <Stack direction="row" spacing={2}>
                <Field.Text name="name" label="اسم المعلم" />
                <RHFSelect name="gender" sx={{ maxWidth: 120 }}>
                  <MenuItem key="0" value={0}>
                    ذكر
                  </MenuItem>
                  <MenuItem key="1" value={1}>
                    انثى
                  </MenuItem>
                </RHFSelect>
              </Stack>
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
              <RHFPhoneInput
                name="phone"
                label="رقم الهاتف"
                placeholder="ادخل رقم الهاتف"
                country="EG"
              />
            </Stack>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={onClose}>
            الغاء
          </Button>

          <Button type="submit" variant="contained" loading={isSubmitting}>
            {isNew ? 'اضافة معلم' : 'تحديث'}
          </Button>
        </DialogActions>
      </Form>
    </Dialog>
  );
}
