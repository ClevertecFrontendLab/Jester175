import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchRegistration } from 'store/async-actions/async-actions';

import styles from './popup.module.css';

export const PopupAuth = (props) => {
	const authStatus = useSelector((state) => state.auth.registration);
    const dispatch = useDispatch();
	const regData = useSelector((state) => state.auth.data);

    const refreshReg = () => {
        if(authStatus.error) dispatch(fetchRegistration(regData));
    }

	return (
		<div className={styles.popup}>
			<h2 className={styles.popup__title}>{props.title}</h2>
			<p className={styles.popup__descr}>{props.descr}</p>
			<Link to={`${props.path}`} type='button' onClick={refreshReg} className={styles.popup__btn}>
				{props.btn}
			</Link>
		</div>
	);
};
