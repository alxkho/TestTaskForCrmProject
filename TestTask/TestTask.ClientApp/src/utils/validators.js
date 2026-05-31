import dayjs from "dayjs";

export const notFutureDateValidator = () => (_, value) => {
    if (!value) return Promise.resolve();

    if (value.isBefore(dayjs())) return Promise.resolve();

    return Promise.reject(new Error("Дата не может быть больше сегодняшней!"));
};

export const maxStringLengthValidator = (maxLength) => (_, value) => {
    value = value?.trim();

    if (!value || value.length <= maxLength) return Promise.resolve();

    return Promise.reject(new Error(`Максимальная длина текста ${maxLength} символов`));
};

export const phoneNumberValidator = () => (_, value) => {
    if (!value) return Promise.resolve();

    if (value.replace(/\D/g, "").length < 9) {
        return Promise.reject(new Error("Номер телефона введен не полностью"));
    }

    return Promise.resolve();
};
