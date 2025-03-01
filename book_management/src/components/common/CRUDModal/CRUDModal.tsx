import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Button, Divider } from '@mui/material';
import { useStyles } from './CRUDModal.styles';
import CloseIcon from '@mui/icons-material/Close';
import HeaderTitle from '../HeaderTitle/HeaderTitle';
interface ModalProps {
	isOpenModal: boolean;
	setIsOpenModal: any;
	headerTitle: string;
	showActions?: boolean;
	cancelButtonLabel?: string;
	submitButtonLabel?: string;
	onSubmit?: () => void;
	children: React.ReactNode;
	className?: string;
}
const CRUDModal = ({
	isOpenModal,
	setIsOpenModal,
	headerTitle,
	showActions = true,
	cancelButtonLabel,
	submitButtonLabel,
	onSubmit,
	children,
	...props
}: ModalProps) => {
	const handleClose = () => setIsOpenModal(false);
	const classes = useStyles();

	return (
		<Modal open={isOpenModal} onClose={handleClose} {...props} className={classes.root}>
			<Box className={classes.boxWrapper}>
				<Box sx={{ display: 'grid' }}>
					<HeaderTitle
						title={headerTitle}
						customStyle={{
							'& .MuiTypography-root': { color: '#000', fontSize: '20px', fontWeight: '600' },
							textAlign: 'center',
							marginBottom: '1.6rem',
							gridColumn: '2/3'
						}}
					/>
					<Box sx={{ gridColumn: '3', textAlign: 'end' }}>
						<CloseIcon onClick={handleClose} sx={{ cursor: 'pointer' }} />
					</Box>
				</Box>
				<Divider sx={{ mb: '1.6rem' }} />

				<Box>
					<Box>{children}</Box>
					{showActions && (
						<Box sx={{ display: 'flex', justifyContent: 'end', gap: '1.6rem' }}>
							<Button
								variant="outlined"
								size="medium"
								onClick={handleClose}
								sx={{ textTransform: 'none' }}
							>
								{cancelButtonLabel}
							</Button>
							<Button
								variant="contained"
								size="medium"
								onClick={onSubmit}
								sx={{ textTransform: 'none' }}
							>
								{submitButtonLabel}
							</Button>
						</Box>
					)}
				</Box>
			</Box>
		</Modal>
	);
};

export default CRUDModal;
