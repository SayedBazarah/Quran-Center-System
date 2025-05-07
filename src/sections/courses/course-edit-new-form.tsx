import type { ICourseItem } from 'src/types/courses';

import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { toast } from 'src/components/snackbar';
import { Form, Field, RHFAutocomplete } from 'src/components/hook-form';
import { TextField } from '@mui/material';

// ----------------------------------------------------------------------

export type CourseQuickEditSchemaType = zod.infer<typeof CourseQuickEditSchema>;

export const CourseQuickEditSchema = zod.object({
  name: zod.string().min(1, { message: 'الاسم مطلوب!' }),
  teacher: zod.object({
    key: zod.string().min(1, { message: 'id المعلم!' }),
    name: zod.string().min(1, { message: 'اختار المعلم!' }),
  }),
  duration: zod.number().min(1, { message: 'مده المرحلة مطلوبة!' }),
  price: zod.number().min(1, { message: 'سعر المرحلة مطلوب!' }),
  level: zod.number(),
});

// ----------------------------------------------------------------------

type Props = {
  open: boolean;
  onClose: () => void;
  currentCourse?: ICourseItem;
};

export function CourseQuickEditForm({ currentCourse, open, onClose }: Props) {
  const defaultValues: CourseQuickEditSchemaType = {
    name: '',
    teacher: { key: '', name: '' },
    duration: 0,
    price: 0,
    level: 0,
  };

  const methods = useForm<CourseQuickEditSchemaType>({
    mode: 'all',
    resolver: zodResolver(CourseQuickEditSchema),
    defaultValues,
    values: currentCourse,
  });

  const {
    reset,
    handleSubmit,
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
      <DialogTitle>تحديث سريع</DialogTitle>

      <Form methods={methods} onSubmit={onSubmit}>
        <DialogContent>
          <Box
            sx={{
              pt: 1,
              rowGap: 3,
              columnGap: 2,
              display: 'grid',
              gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
            }}
          >
            <Field.Text name="name" label="اسم المرحله" />
            <RHFAutocomplete
              name="teacher"
              options={[
                {
                  key: '1',
                  name: 'سيد محمد',
                },
              ]}
              getOptionLabel={(option) => option.name}
              renderOption={(props, option) => (
                <li {...props} key={option.key}>
                  {option.name}
                </li>
              )}
            />
            <Field.Text name="duration" label="المدة" type="number" />
            <Field.Text name="level" label="المستوي" type="number" />
            <Field.Text name="price" label="السعر" type="number" />
            <Box sx={{ display: { xs: 'none', sm: 'block' } }} />
          </Box>
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={onClose}>
            الغاء
          </Button>

          <Button type="submit" variant="contained" loading={isSubmitting}>
            تحديث
          </Button>
        </DialogActions>
      </Form>
    </Dialog>
  );
}
