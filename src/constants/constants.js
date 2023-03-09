export const registrationPopup = {
    ok: {
        title: 'Регистрация успешна',
        descr: 'Регистрация прошла успешно. Зайдите в личный кабинет, используя свои логин и пароль',
        btn: 'вход',
        path: '/auth',
    },
    error: {
        title: 'Данные не сохранились',
        descr: 'Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз',
        btn: 'повторить',
        path: '/registration',
    },
    exist: {
        title: 'Данные не сохранились',
        descr: 'Такой логин или e-mail уже записан в системе. Попробуйте зарегистрироваться по другому логину или e-mail.',
        btn: 'назад к регистрации',
        path: '/registration',
    }
}
export const authPopup = {
    error: {
        title: 'Вход не выполнен',
        descr: 'Что-то пошло не так. Попробуйте ещё раз',
        btn: 'повторить',
        path: '/auth',
    },
}

export const validatePatterns = {
    login : {
        general: /^(?=^.{1,}$)((?=.*\d)(?=.*[a-zA-Z]))[0-9a-zA-Z]*$/,
        number: /[0-9]/,
        enLetter: /[A-Za-z]/,
        ruLetter: /[А-яа-я]/,
    },
    password : {
        general: /(?=.*[A-Z])(?=.*[0-9])[a-zA-ZА-Яа-я0-9]{8,}/,
        number: /[0-9]{1,}/,
        upperLetter: /[A-ZА-Я]{1,}/,
    },
    email: {
        general: /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/,
    }
}
