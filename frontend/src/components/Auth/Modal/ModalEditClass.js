import { useEffect, useState } from 'react'
import { Box, Grid, MenuItem, Modal, Select, Stack, TextField, Typography, Button, FormControl, InputLabel } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { getAllClassesAction, updateClassAction } from '../../../redux/actions/classActions'
import { editUserInfoValidation } from '../../../components/validation/classValidation'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

const styleModalEditClass = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 600,
  bgcolor: 'background.paper',
  border: '2px solid #005B48',
  boxShadow: 24,
  p: 4,
  borderRadius: '20px'
}

const ModalEditClass = ({ isOpen, handleOpen, setClassRow, classRow, setIsOpen }) => {
  const dispatch = useDispatch()
  const [isActive, setIsActive] = useState('')

  // eslint-disable-next-line no-unused-vars
  const { isLoading: updateLoading, isError: editError, classInfo: editClassInfo, isSuccess: editSuccess } = useSelector(
    state => state.adminUpdateClass
  )

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(editUserInfoValidation)
  })

  useEffect(() => {
    if (classRow) {
      setValue('classId', classRow?.classId)
      setValue('className', classRow?.className)
      setIsActive(classRow?.isActive ? 'active' : 'inactive')
    }
  }, [classRow, setValue, setIsActive])

  useEffect(() => {
    if (editClassInfo) {
      dispatch(getAllClassesAction())
    }

    if (editSuccess) {
      setIsOpen(!isOpen)
      dispatch({ type: 'UPDATE_CLASS_RESET' })
    }
    if (editError) {
      toast.error(editError)
      setIsOpen(!isOpen)
      dispatch({ type: 'UPDATE_CLASS_RESET' })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editClassInfo, editSuccess, editError, dispatch, setIsOpen])

  const onSubmit = (data) => {
    dispatch(updateClassAction(
      classRow?._id,
      {
        ...data,
        isActive: isActive === 'active' ? true : false
      }
    ))
  }

  return (
    <div>
      <Modal
        open={isOpen}
        onClose={() => { handleOpen(); setClassRow(null) }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={styleModalEditClass}
          component="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ fontWeight:'bold', color:'#005B48' }}>
                Edit Class
          </Typography>

          <TextField
            name="classId"
            id="classId"
            label="Class Id"
            variant="outlined"
            {...register('classId')}
            error={!!errors.classId}
            helperText={errors.classId?.message || ''}
            sx={{ mt:'20px', width:'100%' }}
          />
          <TextField
            name="className"
            id="className"
            label="Class Name"
            variant="outlined"
            {...register('className')}
            error={!!errors.className}
            helperText={errors.className?.message || ''}
            sx={{ mt:'20px', width:'100%' }}
          />

          <Grid container spacing={2} sx={{ mt: '20px' }}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="class-active">Class Active</InputLabel>
                <Select
                  labelId='class-active'
                  id="active"
                  variant="outlined"
                  value={isActive}
                  onChange={(e) => setIsActive(e.target.value)}
                  label="Class Active"
                >
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Stack direction='row' justifyContent='end' mt={4} spacing={2}>
            <Button variant='contained' color='error' onClick={() => {handleOpen(); setClassRow(null)}}>Cancel</Button>
            <Button variant='contained' type="submit">Save</Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  )
}

export default ModalEditClass
