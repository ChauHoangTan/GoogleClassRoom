import { Box, Button, Container, Typography, Card, CardContent, Divider, Stack, IconButton, Modal, TextField, Checkbox, FormControlLabel, Menu, MenuItem } from '@mui/material'
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import UploadIcon from '@mui/icons-material/Upload'
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import GradeTable from './GradeTable'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { getStudentIdList } from '../../../../redux/APIs/classServices'
import { useEffect, useRef, useState } from 'react'
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
import { SortableContext, defaultAnimateLayoutChanges, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { mapOrder } from '../../../../utils/SortOrderArray/mapOrder'
import { arrayMove } from '@dnd-kit/sortable'
import { CSVLink } from 'react-csv'
import { useParams } from 'react-router-dom'
import { getAllGradeCompositionByClassIdService, createNewGradeComposition, removeGradeComposition } from '../../../../redux/APIs/gradeServices'

const columns = [
  { id: 'id', label: 'ID', minWidth: 170 },
  { id: 'fullName', label: 'Full Name', minWidth: 170 },
  { id: 'listGrade', label: 'List Grade', minWidth: 170, listGrade: [
    { composition: 'Exercise 1', percent: '10%' },
    { composition: 'Exercise 2', percent: '10%' },
    { composition: 'Midterm', percent: '30%' },
    { composition: 'Finalterm', percent: '50%' }
    // Add more exercises if needed
  ] },
  { id: 'total', label: 'Total', minWidth: 170 }
]

const rows = [
  { id: 1, fullName: 'John Doe', listGrade: [
    { composition: 'Exercise 1', percent: '10%', grade: '8' },
    { composition: 'Exercise 2', percent: '10%', grade: '7' },
    { composition: 'Midterm', percent: '30%', grade: '25' },
    { composition: 'Finalterm', percent: '50%', grade: '40' }
  ], total: '40'
  },
  { id: 2, fullName: 'Jane Smith', listGrade: [
    { composition: 'Exercise 1', percent: '10%', grade: '7' },
    { composition: 'Exercise 2', percent: '10%', grade: '6' },
    { composition: 'Midterm', percent: '30%', grade: '22' },
    { composition: 'Finalterm', percent: '50%', grade: '45' }
  ], total: '30'
  },
  { id: 3, fullName: 'Bob Johnson', listGrade: [
    { composition: 'Exercise 1', percent: '10%', grade: '5' },
    { composition: 'Exercise 2', percent: '10%', grade: '8' },
    { composition: 'Midterm', percent: '30%', grade: '28' },
    { composition: 'Finalterm', percent: '50%', grade: '40' }
  ], total: '30'
  },
  // Add more entries as needed
  { id: 4, fullName: 'Alice Brown', listGrade: [
    { composition: 'Exercise 1', percent: '10%', grade: '9' },
    { composition: 'Exercise 2', percent: '10%', grade: '7' },
    { composition: 'Midterm', percent: '30%', grade: '24' },
    { composition: 'Finalterm', percent: '50%', grade: '38' }
  ], total: '30'
  },
  { id: 5, fullName: 'Charlie Davis', listGrade: [
    { composition: 'Exercise 1', percent: '10%', grade: '8' },
    { composition: 'Exercise 2', percent: '10%', grade: '7' },
    { composition: 'Midterm', percent: '30%', grade: '26' },
    { composition: 'Finalterm', percent: '50%', grade: '42' }
  ], total: '35'
  },
  { id: 6, fullName: 'Eva White', listGrade: [
    { composition: 'Exercise 1', percent: '10%', grade: '7' },
    { composition: 'Exercise 2', percent: '10%', grade: '9' },
    { composition: 'Midterm', percent: '30%', grade: '23' },
    { composition: 'Finalterm', percent: '50%', grade: '39' }
  ], total: '38'
  },
  { id: 7, fullName: 'David Black', listGrade: [
    { composition: 'Exercise 1', percent: '10%', grade: '6' },
    { composition: 'Exercise 2', percent: '10%', grade: '8' },
    { composition: 'Midterm', percent: '30%', grade: '25' },
    { composition: 'Finalterm', percent: '50%', grade: '37' }
  ], total: '30'
  },
  { id: 8, fullName: 'Grace Lee', listGrade: [
    { composition: 'Exercise 1', percent: '10%', grade: '5' },
    { composition: 'Exercise 2', percent: '10%', grade: '9' },
    { composition: 'Midterm', percent: '30%', grade: '27' },
    { composition: 'Finalterm', percent: '50%', grade: '41' }
  ], total: '31'
  },
  { id: 9, fullName: 'Frank Adams', listGrade: [
    { composition: 'Exercise 1', percent: '10%', grade: '8' },
    { composition: 'Exercise 2', percent: '10%', grade: '6' },
    { composition: 'Midterm', percent: '30%', grade: '22' },
    { composition: 'Finalterm', percent: '50%', grade: '36' }
  ], total: '31'
  },
  { id: 10, fullName: 'Helen Taylor', listGrade: [
    { composition: 'Exercise 1', percent: '10%', grade: '7' },
    { composition: 'Exercise 2', percent: '10%', grade: '9' },
    { composition: 'Midterm', percent: '30%', grade: '24' },
    { composition: 'Finalterm', percent: '50%', grade: '40' }
  ], total: '40'
  }
]

const gradeCompositionList = [
  {
    id: 1,
    title: 'Dev posted a new assignment',
    composition: 'Finalterm',
    time: '12:00',
    percent: '50%'
  },
  {
    id: 2,
    title: 'Dev posted a new assignment',
    composition: 'Midterm',
    time: '12:00',
    percent: '30%'
  },
  {
    id: 3,
    title: 'Dev posted a new assignment',
    composition: 'Exercise 2',
    time: '12:00',
    percent: '10%'
  },
  {
    id: 4,
    title: 'Dev posted a new assignment',
    composition: 'Exercise 1',
    time: '12:00',
    percent: '10%'
  }
]

function CardGrade ({ id, title, composition, time, percent, setOrderGradeComposition, setGradeCompositionList }) {

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
    console.log(response)
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
      style={dndKitGradeCompositionStyles}
      {...attributes}
      {...listeners}
      sx={{
        '&:hover': {
          bgcolor: '#A9A9A9'
        }
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
          <Typography variant='h6' sx={{ fontStyle:'italic', mx: 5 }}>{percent}</Typography>
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
              <Button variant='contained' color='error' startIcon={<RemoveCircleIcon />}>
                Remove
              </Button>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Button variant='contained' startIcon={<UploadIcon />}>
                Upload
              </Button>
            </MenuItem>
          </Menu>

        </Stack>
      </CardContent>
    </Card>
  )
}

function GradeComposition ({ orderGradeComposition, setOrderGradeComposition, gradeCompositionList, setGradeCompositionList }) {
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gradeCompositionList, orderGradeComposition])


  const handleDragStart = (event) => {
    setActiveDragItemID(event?.active?.id)
    setActiveDragItemData(event?.active?.data?.current)
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
      console.log('oldIndex newIndex', oldIndex, newIndex)
      const dndOrderedGradeCompostionState = arrayMove(orderedGradeCompostionState, oldIndex, newIndex)
      console.log('After move', dndOrderedGradeCompostionState)
      SetorderedGradeCompostionState(dndOrderedGradeCompostionState)
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
      borderRadius: 5,
      p: 3,
      border: '2px solid #A9A9A9',
      my: 2
    }}>
      <Typography gutterBottom variant="h5" >
        Grade Composition
      </Typography>

      <DndContext onDragOver={handleDragStart} onDragEnd={handleDragEnd} sensors={sensors}>
        <SortableContext items={orderedGradeCompostionState?.map(c => c._id)} strategy={verticalListSortingStrategy}>
          <Stack spacing={2} py={1}>
            {orderedGradeCompostionState.map(({ _id, name, scale, time }) => (
              <CardGrade
                key={_id}
                id={_id}
                title={'Dev posted a new assignment'}
                composition={name}
                time={convertTime(time)}
                percent={`${scale}%`}
                setOrderGradeComposition={setOrderGradeComposition}
                setGradeCompositionList={setGradeCompositionList}
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

    </Container>
  )
}

function StudentGrade () {
  return (
    <Container sx={{
      borderRadius: 5,
      p: 3,
      border: '2px solid #A9A9A9',
      my: 2
    }}>
      <Typography gutterBottom variant="h5" >
        Grade
      </Typography>

      <GradeTable rows={rows} columns={columns}/>
    </Container>
  )
}

export default function GradeTeacher () {
  const [orderGradeComposition, setOrderGradeComposition] = useState([])
  const [gradeCompositionList, setGradeCompositionList] = useState([])

  const { classId } = useParams()

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await getAllGradeCompositionByClassIdService(classId)

        if (response.orderGradeComposition.length != orderGradeComposition.length) {
          setOrderGradeComposition(response.orderGradeComposition)
          setGradeCompositionList(response.gradeCompositionList)
          // console.log( orderGradeComposition, gradeCompositionList )
        }
      } catch (error) {
        console.error('Error fetching composition:', error)
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
  const handleCreateNewGradeComposition = async () => {
    if (gradeCompositionTitle != '' && gradeCompositionPercent > 0) {
      const response = await createNewGradeComposition(classId, gradeCompositionTitle, gradeCompositionPercent)
      setGradeCompositionList(response.data.gradeCompositionList)
      setOrderGradeComposition(response.data.orderGradeComposition)
      console.log(response)
    }
    setIsOpenCreateNewGradeComposition(!isOpenCreateNewGradeComposition)
  }

  // handle for get studentid list, download grade

  const [csvData, setCsvData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { message, studentIdList } = await getStudentIdList(classId)
        let dataList = [
          ['StudentId', 'Grade']
        ]

        studentIdList.forEach((data) => {
          dataList.push([data, ''])
        })

        setCsvData(dataList)
      } catch (error) {
        console.error('Error fetching CSV data:', error)
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

      <GradeComposition orderGradeComposition={orderGradeComposition} setOrderGradeComposition={setOrderGradeComposition}
        gradeCompositionList={gradeCompositionList} setGradeCompositionList={setGradeCompositionList} />
      <StudentGrade />

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
                  value='isPublic'
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