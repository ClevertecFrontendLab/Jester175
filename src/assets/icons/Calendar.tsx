import Icon from '@ant-design/icons';
import { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

export const Calendar = (props: Partial<CustomIconComponentProps>) => (
    <Icon component={CalendarSvg} {...props} />
);

function CalendarSvg() {
    return (
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M9.375 1.125H12C12.2766 1.125 12.5 1.34844 12.5 1.625V12C12.5 12.2766 12.2766 12.5 12 12.5H0.5C0.223437 12.5 0 12.2766 0 12V1.625C0 1.34844 0.223437 1.125 0.5 1.125H3.125V0.125C3.125 0.05625 3.18125 0 3.25 0H4.125C4.19375 0 4.25 0.05625 4.25 0.125V1.125H8.25V0.125C8.25 0.05625 8.30625 0 8.375 0H9.25C9.31875 0 9.375 0.05625 9.375 0.125V1.125ZM1.125 11.375H11.375V5.4375H1.125V11.375Z" fill="currentColor" />
        </svg>

    )
}