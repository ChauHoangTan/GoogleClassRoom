import { Box, Button, Container, Typography, Card, CardContent, Divider, Stack, IconButton, Modal, TextField, Checkbox, FormControlLabel, Menu, MenuItem } from '@mui/material'
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import UploadIcon from '@mui/icons-material/Upload'
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import GradeTable from './GradeTable'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import EditIcon from '@mui/icons-material/Edit'
import BeenhereIcon from '@mui/icons-material/Beenhere'
import { getStudentIdList } from '../../../../redux/APIs/classServices'
import { useEffect, useState, useContext } from 'react'
import { useSelector } from 'react-redux'
const isEqual = require('lodash/isEqual')
import {
  DndContext,
  // eslint-disable-next-line no-unused-vars
  PointerSensor,
  MouseSensor,
  TouchSensor,
  useSensors,
  useSensor,
  DragOverlay,
  defaultDropAnimationSideEffects
} from '@dnd-kit/core'
// eslint-disable-next-line no-unused-vars
import { SortableContext, defaultAnimateLayoutChanges, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { mapOrder } from '../../../../utils/SortOrderArray/mapOrder'
import { arrayMove } from '@dnd-kit/sortable'
import { CSVLink } from 'react-csv'
import { useParams } from 'react-router-dom'
import { getAllGradeCompositionByClassIdService, createNewGradeComposition, removeGradeComposition, getAllGradeCompositionByStudentId, uploadGradeComposition, editGradeComposition, updateOrderGradeComposition, updateGradeComposition } from '../../../../redux/APIs/gradeServices'
import { styled } from '@mui/material/styles'
import Papa from 'papaparse'
import { SocketContext } from '../../../../Context/SocketProvider'
import toast from 'react-hot-toast'
import Loader from '../../../../components/notification/Loader'

// eslint-disable-next-line no-unused-vars
function CardGrade ({ id, title, composition, time, percent, isPublic, setOrderGradeComposition, setGradeCompositionList, rows, setRows, stateSave, setStateSave }) {

  const [errorText, setErrorText] = useState('')
  const { classId } = useParams()

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleRemoveComposition = async () => {
    const response = await removeGradeComposition( classId, id )
    setOrderGradeComposition(response.data.orderGradeComposition)
    setGradeCompositionList(response.data.gradeCompositionList)
  }

  const [isOpenEditGradeComposition, setIsOpenEditGradeComposition] = useState(false)

  const handleOpenEditGradeComposition = () => {
    setIsOpenEditGradeComposition(!isOpenEditGradeComposition)
    setGradeCompositionTitle(composition)
    setGradeCompositionPercent(percent)
    setIsPublicCheckBox(isPublic)
    setErrorText('')
  }

  const [gradeCompositionTitle, setGradeCompositionTitle] = useState('')
  const handleOnChangeGradeCompositionTitle = (e) => {
    setGradeCompositionTitle(e.target.value)
  }
  const [gradeCompositionPercent, setGradeCompositionPercent] = useState(0)
  const handleOnChangeGradeCompositionPercent = (e) => {
    setGradeCompositionPercent(e.target.value)
    setErrorText('')
    if (e.target.value < 0)
      setErrorText('Scale can not less than zero!')
  }
  const [isPublicCheckBox, setIsPublicCheckBox] = useState(false)
  // eslint-disable-next-line no-unused-vars
  const handleOnChangeIsPublic = (e) => {
    setIsPublicCheckBox(!isPublicCheckBox)
  }

  // eslint-disable-next-line no-unused-vars
  let { isLoading: classLoading, classes : classInfo } = useSelector(
    (state) => state.userGetClassByID
  )

  classInfo = classInfo?.data

  const { userInfo } = useSelector(
    (state) => state.userLogin
  )

  const { socket } = useContext(SocketContext)

  const handleEditGradeComposition = async () => {
    if (gradeCompositionTitle != '' && gradeCompositionPercent > 0) {
      const response = await updateGradeComposition(classId, id, gradeCompositionTitle, gradeCompositionPercent, isPublicCheckBox)
      setGradeCompositionList(response.data.gradeCompositionList)
      setOrderGradeComposition(response.data.orderGradeComposition)
    }
    setIsOpenEditGradeComposition(!isOpenEditGradeComposition)

    if (isPublicCheckBox) {
      classInfo.students.forEach((student) => {
        const notificationData = {
          userSendId: userInfo?._id,
          userReceiverId: student, // ID của ọc sinh nhận thông báo
          userName: userInfo?.firstName + ' ' + userInfo?.lastName,
          image: userInfo?.image,
          content: `The teacher has publicly posted the new ${composition} grades`,
          link: `/class/${classId}/grade`
        }
        socket?.emit('post_data', notificationData)
      })
    }
  }


  // const csvData = [
  //   ['StudentId', 'FullName']
  // ]

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1
  })

  const readFileCSV = async (e) => {
    const selectedFile = e.target.files[0]
    const result = await read(selectedFile)
    let studentsListUpload = []
    let checkError = false
    result.data.map((data) => {
      if (data.StudentId !== '' && data.Grade !== '' && !isNaN(data.StudentId) && !isNaN(data.Grade)) {
        studentsListUpload.push(data)
      }
      else if (!(data.StudentId === '' && data.Grade === undefined)) {
        checkError = true
      }
    })
    if ( studentsListUpload[studentsListUpload.length - 1]?.StudentId === '' ) {
      studentsListUpload.pop()
    }

    if (checkError) {
      toast.error('Student grade upload invalid format!')
    } else {
      await uploadGradeComposition(classId, id, studentsListUpload)
    }
    setStateSave(!stateSave)
  }

  const read = (file) => {
    return new Promise((resolve) => {
      Papa.parse(file, {
        complete: (result) => {
          resolve(result)
        },
        header: true // Nếu CSV có header (tên cột)
      })
    })
  }

  // Dnd-kit
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: id,
    data: { id, title, composition, time, percent }
  })

  const dndKitGradeCompositionStyles = {
    touchAction: 'none',
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : undefined
  }

  return (
    <Card
      ref={setNodeRef}
      style={{
        ...dndKitGradeCompositionStyles,
        transition: 'background-color 0.4s' // Apply the transition here
      }}
      {...attributes}
      {...listeners}
      sx={{
        '&:hover': {
          backgroundColor: '#D3D3D3'
        },
        py: 1
      }}
    >
      <CardContent sx={{ display: 'flex', justifyContent: 'space-between',
        '&:last-child': {
          p: 0
        }
      }}>
        <Stack direction={'row'} alignItems='center' sx={{ gap: 2 }}>
          <IconButton aria-label="">
            <DragHandleIcon fontSize='large'/>
          </IconButton>
          <Stack>
            <Typography>{title}: <Typography sx={{ display:'inline-block', fontStyle:'italic', fontWeight:'bold' }}>{composition}</Typography></Typography>
            <Typography variant='body-2' sx={{ fontStyle:'italic', color:'rgba(21, 139, 50, 0.7)' }}>{time}</Typography>
          </Stack>
        </Stack>
        <Stack direction={'row'} alignItems='center'>
          <Typography variant='h6' sx={{ fontStyle:'italic', mx: 5 }}>{percent}%</Typography>
          <IconButton fontSize='small'
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}><MoreVertOutlinedIcon/></IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button'
            }}
          >
            <MenuItem onClick={() => {handleClose(); handleRemoveComposition() }}>
              <Button variant='contained' color='error' startIcon={<RemoveCircleIcon />} sx={{ width: '100%' }}>
                Remove
              </Button>
            </MenuItem>
            <MenuItem>
              <Button component="label" variant='contained' startIcon={<UploadIcon />} sx={{ width: '100%' }}>
                Upload
                <VisuallyHiddenInput type='file' accept='.csv'onChange={(e) => {readFileCSV(e); handleClose()}}/>
              </Button>
            </MenuItem>
            <MenuItem>
              {/* <FormControlLabel control={<Checkbox checked={isPublic} />} label="Public" /> */}
              <Button component="label" variant='contained' startIcon={<EditIcon />} sx={{ width: '100%' }}
                onClick={() => {handleOpenEditGradeComposition(), handleClose()}}>
                Edit
              </Button>
            </MenuItem>
          </Menu>

          <Modal
            open={isOpenEditGradeComposition}
            onClose={handleOpenEditGradeComposition}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              border: '2px solid #005B48',
              boxShadow: 24,
              p: 4,
              borderRadius: '20px'
            }}>
              <Typography gutterBottom id="modal-modal-title" variant="h6" component="h2" sx={{ fontWeight:'bold' }}>
                Update
              </Typography>

              <Box py={2}>
                <TextField id="outlined-basic" label="Grade composition title" variant="outlined" sx={{ width: '100%', pb: 2 }}
                  value={gradeCompositionTitle} onChange={(e) => handleOnChangeGradeCompositionTitle(e)}/>

                <TextField type='number' label="Percentage" variant="outlined" sx={{ width: '100%' }}
                  value={gradeCompositionPercent}
                  onChange={(e) => handleOnChangeGradeCompositionPercent(e)}
                  error={Boolean(errorText)}
                  helperText={errorText} />

                <FormControlLabel
                  control={
                    <Checkbox
                      checked = {isPublicCheckBox}
                      onClick={handleOnChangeIsPublic}
                    />
                  }
                  label='Public grade'
                />
              </Box>

              <Container sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button onClick={handleEditGradeComposition} disabled={Boolean(errorText)}>
                  Update
                </Button>

                <Button onClick={handleOpenEditGradeComposition} color='secondary'>
                  Cancel
                </Button>

              </Container>

            </Box>
          </Modal>
        </Stack>
      </CardContent>
    </Card>
  )
}

function GradeComposition ({ classId, orderGradeComposition, setOrderGradeComposition, gradeCompositionList, setGradeCompositionList, rows, setRows, isLoadingComposition, stateSave, setStateSave }) {
  const [orderedGradeCompostionState, SetorderedGradeCompostionState] = useState([])
  const [activeDragItemID, setActiveDragItemID] = useState(null)
  const [activeDragItemData, setActiveDragItemData] = useState(null)

  //

  // Require mouse move 10px then active this event (Fix situation click call event not drag)
  // const pointerSensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } })
  // Require mouse move 10px then active this event (Fix situation click call event not drag)
  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } })
  // While press in 250ms and move less than 5px (If more than 5px then event will be cancel)
  const touchSensor = useSensor(TouchSensor, { activationConstraint: {
    delay: 250,
    tolerance: 5
  } })
  // Using mouse and touch for UX in mobile is the better
  const sensors = useSensors(mouseSensor, touchSensor)

  useEffect(() => {
    SetorderedGradeCompostionState (mapOrder(gradeCompositionList, orderGradeComposition, '_id'))
    setGradeCompositionList(mapOrder(gradeCompositionList, orderGradeComposition, '_id'))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderGradeComposition])


  const handleDragStart = (event) => {
    setActiveDragItemID(event?.active?.id)
    setActiveDragItemData(event?.active?.data?.current)
  }

  const handleUpdateOrderGradeComposition = async (listOrderGradeComposition) => {
    await updateOrderGradeComposition(classId, listOrderGradeComposition)
  }

  const handleDragEnd = (event) => {
    const { active, over } = event

    // Check if drag another position
    if (!over) return

    if (active.id !== over.id) {
      // Get old position
      const oldIndex = orderedGradeCompostionState.findIndex(c => c._id === active.id)
      // Get new position
      const newIndex = orderedGradeCompostionState.findIndex(c => c._id === over.id)
      const dndOrderedGradeCompostionState = arrayMove(orderedGradeCompostionState, oldIndex, newIndex)
      SetorderedGradeCompostionState(dndOrderedGradeCompostionState)
      setGradeCompositionList(dndOrderedGradeCompostionState)
      handleUpdateOrderGradeComposition(dndOrderedGradeCompostionState)
    }

    setActiveDragItemID(null)
    setActiveDragItemData(null)
  }

  const customDropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: '0.5'
        }
      }
    })
  }

  const convertTime = (time) => {
    // Tạo đối tượng Date từ chuỗi ISO
    const dateObject = new Date(time)

    // Lấy thông tin ngày, tháng, năm, giờ, phút và giây
    const year = dateObject.getFullYear()
    const month = dateObject.getMonth() + 1 // Tháng bắt đầu từ 0, cần cộng thêm 1
    const day = dateObject.getDate()
    const hours = dateObject.getHours()
    const minutes = dateObject.getMinutes()
    const seconds = dateObject.getSeconds()

    // Tạo chuỗi ngày tháng năm giờ phút giây
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`
  }

  const totalGrade = () => {
    let sum = 0
    gradeCompositionList.map((item) => {
      sum += item.scale
    })

    return sum
  }

  return (
    <Container sx={{
      borderRadius: 2,
      p: 3,
      border: '2px solid #A9A9A9',
      my: 2
    }}>
      <Typography gutterBottom variant="h5" >
        Grade Composition
      </Typography>

      {
        isLoadingComposition ?
          <Loader/> :
          <>
            <DndContext onDragOver={handleDragStart} onDragEnd={handleDragEnd} sensors={sensors}>
              <SortableContext items={orderedGradeCompostionState?.map(c => c._id)} strategy={verticalListSortingStrategy}>
                <Stack spacing={2} py={1}>
                  {orderedGradeCompostionState.map(({ _id, name, scale, time, isPublic }) => (
                    <CardGrade
                      key={_id}
                      id={_id}
                      title={'Dev posted a new assignment'}
                      composition={name}
                      time={convertTime(time)}
                      percent={scale}
                      isPublic={isPublic}
                      setOrderGradeComposition={setOrderGradeComposition}
                      setGradeCompositionList={setGradeCompositionList}
                      rows={rows}
                      setRows={setRows}
                      stateSave={stateSave}
                      setStateSave={setStateSave}
                    />
                  ))}
                  <DragOverlay dropAnimation={customDropAnimation}>
                    {!!(activeDragItemID) &&
                <CardGrade
                  id={activeDragItemData?._id}
                  title={activeDragItemData?.title}
                  composition={activeDragItemData?.composition}
                  time={activeDragItemData?.time}
                  percent={activeDragItemData?.percent}
                  order={orderedGradeCompostionState}
                />
                    }
                  </DragOverlay>
                </Stack>
              </SortableContext>
            </DndContext>

            <Divider />

            <Container sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center'
            }}>
              <Typography variant='h6'>
          Total grade: <Typography variant='body-2'>
                  {totalGrade()}%
                </Typography>
              </Typography>
            </Container>
          </>
      }


    </Container>
  )
}

const sumGradeComposition = (listGrade) => {
  let sum = 0
  listGrade.map((composition) => {
    if (composition.grade === '') {
      sum += 0
    } else {
      sum += parseFloat(composition.grade)
    }
  })


  return sum.toFixed(2)
}


function StudentGrade ({ classId, gradeCompositionList, studentList, rows, setRows, stateSave }) {

  const [isEdit, setIsEdit] = useState(false)
  // const [isLoading, setIsLoading] = useState(false)
  const [isAvailableSave, setIsAvailableSave] = useState(true)

  const [isLoadingGrade, setIsLoadingGrade] = useState(false)

  let compositionList = []
  gradeCompositionList.map((item) => {
    compositionList.push({
      composition: item.name,
      percent: `${item.scale}%`
    })
  })
  const columns = [
    { id: 'id', label: 'ID', minWidth: 170 },
    { id: 'fullName', label: 'Full Name', minWidth: 170 },
    { id: 'listGrade', label: 'List Grade', minWidth: 170, listGrade: compositionList },
    { id: 'total', label: 'Total', minWidth: 170 }
  ]

  // const rows = [
  //   { id: 1, fullName: 'John Doe', listGrade: [
  //     { composition: 'Exercise 1', percent: '10%', grade: '8' },
  //     { composition: 'Exercise 2', percent: '10%', grade: '7' },
  //     { composition: 'Midterm', percent: '30%', grade: '25' },
  //     { composition: 'Finalterm', percent: '50%', grade: '40' }
  //   ], total: '40'
  //   },
  // ]

  const handleGetGradeCompositionByStudentId = async (studentId) => {
    const response = await getAllGradeCompositionByStudentId(classId, studentId)
    return response // Trả về giá trị của promise (thường là một đối tượng hoặc mảng)
  }

  useEffect(() => {
    let newRows = []
    setIsLoadingGrade(true)
    Promise.all(
      studentList.map(async (item) => {
        try {
          // setIsLoading(true)
          const result = await handleGetGradeCompositionByStudentId(item.userId)
          const listGrade = result.data
          // Thêm đối tượng vào mảng rows khi promise hoàn tất
          newRows.push({
            id: item.userId,
            fullName: `${item.lastName} ${item.firstName}`,
            listGrade: listGrade,
            total: sumGradeComposition(listGrade)
          })
        } catch (error) {
          toast.error(error.message)
        }
      })
    ).then(() => {
      newRows.sort((a, b) => {
        return a.id - b.id
      })
      // Gọi khi tất cả promises hoàn tất
      if ( !isEdit ) {
        if (!isEqual(rows, newRows)) {
          setRows(newRows)
        }
      }
      setIsLoadingGrade(false)
      // setIsLoading(false)
    })
      .catch((error) => {
        toast.error(error.message)
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stateSave, gradeCompositionList, studentList])

  const changeState = () => {
    setIsEdit(!isEdit)
  }

  const editGradeCompositionAPI = async () => {
    await editGradeComposition(classId, rows)
  }

  const csvDataDownload = () => {
    if (rows.length > 0) {
      let label = ['StudentId', 'FullName']
      rows[0].listGrade.map((item) => {
        label.push(item.composition)
      })
      label.push('Total')
      let data = []
      data.push(label)

      rows.map((user) => {
        let concreteData = []
        concreteData.push(user.id)
        concreteData.push(user.fullName)
        user.listGrade.map((composition) => {
          concreteData.push(composition.grade)
        })
        concreteData.push(user.total)

        data.push(concreteData)
      })

      return data
    }
    else {
      return [[]]
    }
  }

  return (
    <Container sx={{
      borderRadius: 2,
      p: 3,
      border: '2px solid #A9A9A9',
      my: 2
    }}>
      <Typography gutterBottom variant="h5" >
          Grade
      </Typography>
      <Stack direction='row' justifyContent='end' spacing={3} sx={{ mb:'5px', fontSize:'13px' }}>
        <CSVLink data={csvDataDownload()} filename='gradeBoard.csv'>
          <Button variant='contained' startIcon={<FileDownloadIcon />}>
              Export
          </Button>
        </CSVLink>
        {!isEdit ?
          <Button variant='contained' startIcon={<EditIcon />}
            onClick={changeState}>
              Edit
          </Button> :
          <Button variant='contained' color='primary' startIcon={<BeenhereIcon />}
            onClick={() => {changeState(); editGradeCompositionAPI() }}
            disabled={!isAvailableSave}>
            Save
          </Button>}
      </Stack>
      <GradeTable columns={columns} rows={rows} setRows={setRows} isEdit={isEdit} setIsAvailableSave={setIsAvailableSave} isLoadingGrade={isLoadingGrade}/>
    </Container>
  )
}

export default function GradeTeacher () {
  const [orderGradeComposition, setOrderGradeComposition] = useState([])
  const [gradeCompositionList, setGradeCompositionList] = useState([])
  const [studentList, setStudentList] = useState([])

  const [rows, setRows] = useState([])
  const [stateSave, setStateSave] = useState(false)

  const { classId } = useParams()

  const [isLoadingComposition, setIsLoadingComposition] = useState(false)

  useEffect(() => {

    const fetchData = async () => {
      try {
        setIsLoadingComposition(true)
        const response = await getAllGradeCompositionByClassIdService(classId)
        setIsLoadingComposition(false)
        if (response.orderGradeComposition.length != orderGradeComposition.length) {
          setOrderGradeComposition(response.orderGradeComposition)
          setGradeCompositionList(response.gradeCompositionList)
          // console.log( orderGradeComposition, gradeCompositionList )
        }
      } catch (error) {
        toast.error(error.message)
      }
    }

    fetchData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [isOpenCreateNewGradeComposition, setIsOpenCreateNewGradeComposition] = useState(false)

  const handleOpenCreateNewGradeComposition = () => {
    setIsOpenCreateNewGradeComposition(!isOpenCreateNewGradeComposition)
  }

  const [gradeCompositionTitle, setGradeCompositionTitle] = useState('')
  const handleOnChangeGradeCompositionTitle = (e) => {
    setGradeCompositionTitle(e.target.value)
  }
  const [gradeCompositionPercent, setGradeCompositionPercent] = useState(0)
  const handleOnChangeGradeCompositionPercent = (e) => {
    setGradeCompositionPercent(e.target.value)
  }

  const [isPublic, setIsPublic] = useState(false)

  // eslint-disable-next-line no-unused-vars
  let { isLoading: classLoading, classes : classInfo } = useSelector(
    (state) => state.userGetClassByID
  )

  classInfo = classInfo?.data

  const { userInfo } = useSelector(
    (state) => state.userLogin
  )

  const { socket } = useContext(SocketContext)

  const handleCreateNewGradeComposition = async () => {
    if (gradeCompositionTitle != '' && gradeCompositionPercent > 0) {
      const response = await createNewGradeComposition(classId, gradeCompositionTitle, gradeCompositionPercent, isPublic)
      setGradeCompositionList(response.data.gradeCompositionList)
      setOrderGradeComposition(response.data.orderGradeComposition)

      if ( isPublic ) {
        classInfo.students.forEach((student) => {
          const notificationData = {
            userSendId: userInfo?._id,
            userReceiverId: student, // ID của ọc sinh nhận thông báo
            userName: userInfo?.firstName + ' ' + userInfo?.lastName,
            image: userInfo?.image,
            content: `The teacher has publicly posted the new ${gradeCompositionTitle} grades`,
            link: `/class/${classId}/grade`
          }
          socket?.emit('post_data', notificationData)
        })
      }
    }
    setIsOpenCreateNewGradeComposition(!isOpenCreateNewGradeComposition)
  }

  // handle for get studentid list, download grade

  const [csvData, setCsvData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        // eslint-disable-next-line no-unused-vars
        const { message, studentListByUpload } = await getStudentIdList(classId)
        setStudentList(studentListByUpload)
        let dataList = [
          ['StudentId', 'Grade']
        ]

        studentListByUpload.forEach((data) => {
          dataList.push([data.userId, ''])
        })

        setCsvData(dataList)
      } catch (error) {
        toast.error(error.message)
      }
    }

    fetchData()
  }, [classId])


  return (
    <>
      <Box sx={{
        display: 'flex',
        gap: 2,
        justifyContent: 'flex-end'
      }}>
        <Button variant='contained' startIcon={<AddToPhotosIcon />} onClick={handleOpenCreateNewGradeComposition}>
          Create new grade
        </Button>
        <CSVLink data={csvData} filename='grade.csv'>
          <Button variant='contained' startIcon={<FileDownloadIcon />}>
            Download Grade
          </Button>
        </CSVLink>
      </Box>

      <GradeComposition classId={classId} orderGradeComposition={orderGradeComposition} setOrderGradeComposition={setOrderGradeComposition}
        gradeCompositionList={gradeCompositionList} setGradeCompositionList={setGradeCompositionList}
        rows={rows} setRows={setRows} isLoadingComposition={isLoadingComposition} stateSave={stateSave} setStateSave={setStateSave}/>
      <StudentGrade classId={classId} gradeCompositionList={gradeCompositionList} studentList={studentList}
        rows={rows} setRows={setRows} stateSave={stateSave}/>

      <Modal
        open={isOpenCreateNewGradeComposition}
        onClose={handleOpenCreateNewGradeComposition}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #005B48',
          boxShadow: 24,
          p: 4,
          borderRadius: '20px'
        }}>
          <Typography gutterBottom id="modal-modal-title" variant="h6" component="h2" sx={{ fontWeight:'bold' }}>
            Create new grade composition
          </Typography>

          <Box py={2}>
            <TextField id="outlined-basic" label="Grade composition title" variant="outlined" sx={{ width: '100%', pb: 2 }}
              value={gradeCompositionTitle} onChange={(e) => handleOnChangeGradeCompositionTitle(e)}/>

            <TextField type='number' label="Percentage" variant="outlined" sx={{ width: '100%' }}
              value={gradeCompositionPercent} onChange={(e) => handleOnChangeGradeCompositionPercent(e)}/>

            <FormControlLabel
              control={
                <Checkbox
                  value={isPublic}
                  onClick={ () => setIsPublic(!isPublic)}
                />
              }
              label='Public grade'
            />
          </Box>

          <Container sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button onClick={handleCreateNewGradeComposition}>
              Create
            </Button>

            <Button onClick={handleOpenCreateNewGradeComposition} color='secondary'>
              Cancel
            </Button>

          </Container>

        </Box>
      </Modal>
    </>
  )
}