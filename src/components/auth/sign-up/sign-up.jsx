import { useState } from 'react';

import { SignUpFirstStep } from './first';
import { SignUpSecondStep } from './second';
import { SignUpThirdStep } from './third';

// eslint-disable-next-line consistent-return
export const SignUp = () => {
	const [step, setStep] = useState(1);
    const data = {}

	const changeStep = () => {
		if (step < 3) setStep(step + 1);
	};

	if (step === 1) {
		return <SignUpFirstStep changeStep={changeStep} />;
	}
	if (step === 2) {
		return <SignUpSecondStep changeStep={changeStep} />;
	}
	if (step === 3) {
		return <SignUpThirdStep />;
	}
};
