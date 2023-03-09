import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { SignUpFirstStep } from './first';
import { SignUpSecondStep } from './second';
import { SignUpThirdStep } from './third';

// eslint-disable-next-line consistent-return
export const SignUp = () => {
	const [step, setStep] = useState(1);
    const regStatus = useSelector((state) => state.auth.registration.status);
    const navigate = useNavigate();

    useEffect(() => {
        if(regStatus !== 400 && regStatus && regStatus !==200){
            navigate('/response');
        }
    }, [navigate, regStatus])

	const changeStep = () => {
		if (step < 3) setStep(step + 1);
	};

	if (step === 1) {
		return (<SignUpFirstStep changeStep={changeStep} />)
	}
	if (step === 2) {
		return <SignUpSecondStep changeStep={changeStep} />;
	}
	if (step === 3) {
		return <SignUpThirdStep />;
	}
};
