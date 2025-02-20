import { Box, Typography, Paper, Avatar, CircularProgress } from '@mui/material';
import { Line } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
} from 'chart.js';
import {
	useGetAllRevenueByMonthQuery,
	useGetAllTopBooksQuery,
	useGetTotalCustomersQuery,
	useGetTotalOrdersQuery,
	useGetTotalRevenueQuery
} from '@/api/api.caller';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import NoDataCommon from '@/components/common/NoDataCommon/NoDataCommon';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
	const {
		data: topBooksData,
		isLoading: isLoadingBooks,
		isError: isErrorBooks
	} = useGetAllTopBooksQuery(undefined);
	const {
		data: revenueData,
		isLoading: isLoadingRevenue,
		isError: isErrorRevenue
	} = useGetAllRevenueByMonthQuery(undefined);

	const { data: topRevenue } = useGetTotalRevenueQuery(undefined);
	const { data: topCustomers } = useGetTotalCustomersQuery(undefined);
	const { data: topOrders } = useGetTotalOrdersQuery(undefined);

	const topBooks = [...(topBooksData?.data || [])]
		.sort((a: any, b: any) => b.totalBooksSold - a.totalBooksSold)
		.slice(0, 5);

	const lineChartData = {
		labels: revenueData?.data.map((item: any) => `${item.month}/${item.year}`) || [],
		datasets: [
			{
				label: 'Total Revenue',
				data: revenueData?.data.map((item: any) => item.totalRevenue) || [],
				borderColor: '#3e95cd',
				fill: false
			}
		]
	};

	if (isLoadingBooks || isLoadingRevenue) {
		return (
			<Box
				sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
			>
				<CircularProgress />
			</Box>
		);
	}

	if (isErrorBooks || isErrorRevenue || !revenueData || !topBooksData) {
		return (
			<Box>
				<NoDataCommon />
			</Box>
		);
	}

	return (
		<Box sx={{ paddingTop: '10px' }}>
			<Box
				sx={{ display: 'flex', justifyContent: 'space-between', gap: '24px', marginBottom: '20px' }}
			>
				<Paper
					elevation={3}
					sx={{
						flex: 1,
						padding: '16px',
						borderRadius: '12px',
						display: 'flex',
						alignItems: 'center',
						gap: '16px',
						boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.1)'
					}}
				>
					<Avatar sx={{ backgroundColor: '#f5f5f5', width: '64px', height: '64px' }}>💲</Avatar>

					<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
						<Typography variant="subtitle1">Total Revenue</Typography>
						<Typography sx={{ marginTop: '8px', fontSize: '32px', fontWeight: '600' }}>
							{topRevenue?.data}
						</Typography>
					</Box>
				</Paper>
				<Paper
					elevation={3}
					sx={{
						flex: 1,
						padding: '16px',
						borderRadius: '12px',
						display: 'flex',
						alignItems: 'center',
						gap: '16px',
						boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.1)'
					}}
				>
					<Avatar sx={{ backgroundColor: '#f5f5f5', width: '64px', height: '64px' }}>👥</Avatar>

					<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
						<Typography variant="subtitle1">Total Customers</Typography>
						<Typography sx={{ marginTop: '8px', fontSize: '32px', fontWeight: '600' }}>
							{topCustomers?.data}
						</Typography>
					</Box>
				</Paper>
				<Paper
					elevation={3}
					sx={{
						flex: 1,
						padding: '16px',
						borderRadius: '12px',
						display: 'flex',
						alignItems: 'center',
						gap: '16px',
						boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.1)'
					}}
				>
					<Avatar sx={{ backgroundColor: '#f5f5f5', width: '64px', height: '64px' }}>📦</Avatar>

					<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
						<Typography variant="subtitle1">Total Orders</Typography>
						<Typography sx={{ marginTop: '8px', fontSize: '32px', fontWeight: '600' }}>
							{topOrders?.data}
						</Typography>
					</Box>
				</Paper>
			</Box>

			<Box sx={{ display: 'flex', gap: '20px', justifyContent: 'space-between' }}>
				<Paper
					elevation={1}
					sx={{
						padding: '16px',
						borderRadius: '8px',
						marginBottom: '20px',
						display: 'flex',
						alignItems: 'center',
						boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.05)'
					}}
				>
					<Box sx={{ flex: 1, marginBottom: '30px', height: '400px' }}>
						<Typography sx={{ fontSize: '20px' }}>
							Xu hướng doanh thu: Phân tích theo tháng
						</Typography>
						<Line
							data={lineChartData}
							options={{ responsive: true, maintainAspectRatio: false }}
							height={300}
						/>
					</Box>
				</Paper>

				<Box sx={{ flex: 1, marginBottom: '30px', marginTop: '18px' }}>
					<Typography sx={{ fontSize: '20px' }}>Top cuốn sách bán chạy nhất</Typography>
					{topBooks.map((item: any, index: number) => (
						<Paper
							key={item.bookID}
							sx={{
								display: 'flex',
								alignItems: 'center',
								padding: '10px',
								marginBottom: '10px',
								backgroundColor: index % 2 === 0 ? '#f7f7f7' : '#ffffff',
								boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.08)',
								borderRadius: '8px'
							}}
						>
							<Avatar
								src={item.image}
								alt={item.title}
								sx={{ width: 56, height: 56, marginRight: '15px', cursor: 'pointer' }}
							/>
							<Box sx={{ display: 'flex', alignItems: 'center', gap: '10px', flexGrow: 1 }}>
								<Box sx={{ textAlign: 'center' }}>
									<Typography variant="h6" sx={{ fontWeight: 'bold' }}>
										{String(index + 1).padStart(2, '0')}
									</Typography>
									<ArrowUpwardIcon sx={{ color: 'green', fontSize: '18px' }} />
								</Box>
								<Box sx={{ flexGrow: 1 }}>
									<Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
										{item.title}
									</Typography>
									<Typography variant="body2" color="textSecondary">
										{item.author}
									</Typography>
								</Box>
							</Box>

							<Box sx={{ textAlign: 'right' }}>
								<Typography variant="subtitle1" sx={{ whiteSpace: 'nowrap' }}>
									{item.totalBooksSold} đơn
								</Typography>
							</Box>
						</Paper>
					))}
				</Box>
			</Box>
		</Box>
	);
};

export default Dashboard;
