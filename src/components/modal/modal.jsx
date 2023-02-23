import { useDispatch, useSelector } from 'react-redux';
import { IconClose, IconError } from 'assets/images/error';
import { showModal } from 'store/status-reducer';

import styles from './modal.module.css';

export const Modal = () => {
	const dispatch = useDispatch();
	const isModal = useSelector((state) => state.status.isModal);

	return (
		<div
			className={ isModal ? styles.wrapper : styles['wrapper--hidden']}
			data-test-id='error'
		>
			<span className={styles.errorIcon}>{IconError}</span>
			<span className={styles.message}>Что-то пошло не так. Обновите страницу через некоторое время.</span>
			<button type='button' className={styles.crossIcon} onClick={() => dispatch(showModal(false))}>
				{IconClose}
			</button>
		</div>
	);
};
