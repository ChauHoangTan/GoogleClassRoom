import { Box, Stack, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import {countUsersByLoginMethods } from '../../../redux/APIs/userServices';

const COLORS = ['#00C49F', '#0088FE', '#FFBB28', '#FF8042', '#AF19FF', '#FF195B', '#ABABAB'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

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
  );
};

const PieUsersLoginMethods = () => {
  const [loginMethods, setLoginMethods] = useState(null);
  const initialized = useRef(false)
  const [err, setErr] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState('')

  useEffect(() => {
    // Gọi API để lấy dữ liệu đếm người dùng theo các phương thức login
    if (!initialized.current) {
        initialized.current = true
        const fetchData = async () => {
            try {
                const result = await countUsersByLoginMethods();
                console.log(result)
                setLoginMethods(result);
            } catch (error) {
                setErr(error.response.data.message)
            }
        }
        fetchData();
        try {
            const result = countUsersByLoginMethods();
            console.log(result)
            setLoginMethods(result);
        } catch (error) {
            setErr(error.response.data.message)
        }
    }
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexWrap: 'wrap',
      }}
    >
      {loginMethods && (
        <PieChart width={200} height={200}>
          <Pie
            data={Object.entries(loginMethods).map(([method, count], index) => ({
              name: method,
              qty: count,
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
      )}
      <Stack gap={2}>
        <Typography variant="h6">Login Methods</Typography>
        <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
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
  );
};

export default PieUsersLoginMethods;
