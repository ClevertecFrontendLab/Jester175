import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { fetchLogin, fetchRegistration } from 'store/async-actions/async-actions';
import { toggleAuth, toggleRegistration } from 'store/auth-reducer';
import { setLoading } from 'store/status-reducer';

import styles from './popup.module.css';

export const PopupAuth = (props) => {
	const regStatus = useSelector((state) => state.auth.registration.status);
	const authStatus = useSelector((state) => state.auth.auth.status);
    const dispatch = useDispatch();
	const regData = useSelector((state) => state.auth.dataReg);
	const authData = useSelector((state) => state.auth.dataAuth);

    const navigate = useNavigate();

    const refreshReg = () => {
        if(regStatus) {
            dispatch(setLoading(true));
            dispatch(fetchRegistration(regData));
            dispatch(toggleRegistration({status: null}))
            navigate('/registration');
        };
        if(authStatus) {
            dispatch(setLoading(true));
            dispatch(fetchLogin(authData));
            dispatch(toggleAuth({status: null}))
            navigate('/auth');
        };
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
