import { useDispatch, useSelector } from 'react-redux';
import { IconClose, IconError } from 'assets/images/error';
import { showModalError } from 'store/modal-error-reducer';

import styles from './modal-error.module.css';

export const ModalErr = () => {
	const dispatch = useDispatch();
	const isError = useSelector((state) => state.modalError.modalErr);

	return (
		<div className={isError ? styles.wrapper : styles['wrapper--hidden']} data-test-id='error'>
			<span className={styles.errorIcon}>{IconError}</span>
			<span className={styles.message}>Что-то пошло не так. Обновите страницу через некоторое время.</span>
			<button type='button' className={styles.crossIcon} onClick={() => dispatch(showModalError(false))}>
				{IconClose}
			</button>
		</div>
	);
};
