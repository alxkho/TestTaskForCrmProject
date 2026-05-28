export const normalizeMobilePhone = (value) => {
    const digits = value.replace("+375", "").replace(/\D/g, "");

    if (!digits) return "";

    if (digits.length <= 2) return `(${digits}`;
    if (digits.length <= 5) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2, 5)}-${digits.slice(5)}`;

    return `(${digits.slice(0, 2)}) ${digits.slice(2, 5)}-${digits.slice(5, 7)}-${digits.slice(7, 9)}`; //(00) 000-00-00
};