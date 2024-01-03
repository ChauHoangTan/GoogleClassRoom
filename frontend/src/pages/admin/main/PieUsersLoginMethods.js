import { Box, Stack, Typography } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { PieChart, Pie, Cell, Tooltip } from 'recharts'
import { countUsersByLoginMethodsService } from '../../../redux/APIs/userServices'
import Loader from '../../../components/notification/Loader'

const COLORS = ['#00C49F', '#0088FE', '#FFBB28', '#FF8042', '#AF19FF', '#FF195B', '#FFFF00']


const RADIAN = Math.PI / 180
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

const PieUsersLoginMethods = () => {
  const [loginMethods, setLoginMethods] = useState(null)
  const initialized = useRef(false)
  // eslint-disable-next-line no-unused-vars
  const [err, setErr] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Gọi API để lấy dữ liệu đếm người dùng theo các phương thức login
    if (!initialized.current) {
      initialized.current = true
      const fetchData = async () => {
        try {
          const result = await countUsersByLoginMethodsService()
          setLoginMethods(result)
          setIsLoading(false)
        } catch (error) {
          setErr(error.response.data.message)
          setIsLoading(false)
        }
      }
      fetchData()
    }
  }, [])

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'start',
        flexWrap: 'wrap',
        ml: 3,
        mr: 3
      }}
    >
      {isLoading ? (
        <Loader /> // Assuming Loader is a component
      ) : (
        loginMethods && (
          <Box sx={{ display: 'flex', flexWrap: 'nowrap', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
            <PieChart width={200} height={200}>
              <Pie
                // eslint-disable-next-line no-unused-vars
                data={Object.entries(loginMethods).map(([method, count], index) => ({
                  name: method,
                  qty: count
                }))}
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="qty"
              >
                {Object.keys(loginMethods).map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
            <Stack gap={2} sx={{ flexGrow: 1, alignItems: 'center' }} >
              <Typography variant="h6">Login Methods</Typography>
              <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', alignItems: 'center' }}>
                {loginMethods &&
                    Object.keys(loginMethods).map((method, i) => (
                      <Stack key={method} alignItems="center" spacing={1}>
                        <Box sx={{ width: 20, height: 20, background: COLORS[i] }} />
                        <Typography variant="body2" sx={{ opacity: 0.7 }}>
                          {method}
                        </Typography>
                      </Stack>
                    ))}
              </Box>
            </Stack>
          </Box>
        )
      )}
    </Box>
  )
}

export default PieUsersLoginMethods
