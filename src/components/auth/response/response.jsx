import { authPopup, registrationPopup } from 'constants/constants.js';

import { useSelector } from 'react-redux';

import { PopupAuth } from './popup';

export const ResponseAuth = () => {
	const regStatus = useSelector((state) => state.auth.registration);
	const authStatus = useSelector((state) => state.auth.auth);

	if (regStatus.status === 400 && regStatus) {
		return (
			<PopupAuth
				title={registrationPopup.exist.title}
				descr={registrationPopup.exist.descr}
				btn={registrationPopup.exist.btn}
				path={registrationPopup.exist.path}
			/>
		);
	}
	if (regStatus.status !== 400 && regStatus.status !== 200 && regStatus.status) {
		return (
			<PopupAuth
				title={registrationPopup.error.title}
				descr={registrationPopup.error.descr}
				btn={registrationPopup.error.btn}
				path={registrationPopup.error.path}
			/>
		);
	}
	if (authStatus.status !== 200 && authStatus.status !== 400 && authStatus.status) {
		return (
			<PopupAuth
				title={authPopup.error.title}
				descr={authPopup.error.descr}
				btn={authPopup.error.btn}
				path={authPopup.error.path}
			/>
		);
	}

	return (
		<PopupAuth
			title={registrationPopup.ok.title}
			descr={registrationPopup.ok.descr}
			btn={registrationPopup.ok.btn}
			path={registrationPopup.ok.path}
		/>
	);
};
