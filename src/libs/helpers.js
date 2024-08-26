export function getCurrentDate() {
  const today = new Date();
  const year = today.getFullYear();
  let month = today.getMonth() + 1;
  let day = today.getDate();

  month = month < 10 ? "0" + month : month;
  day = day < 10 ? "0" + day : day;

  return `${year}-${month}-${day}`;
}

export const useOptions = () => {
  const limitopt = [
    { value: 12, label: "Baris per Halaman: 12" },
    { value: 24, label: "Baris per Halaman: 24" },
    { value: 48, label: "Baris per Halaman: 48" },
    { value: 120, label: "Baris per Halaman: 120" },
    { value: 500, label: "Baris per Halaman: 500" },
  ];
  return { limitopt };
};

export function inputValidator(formData, requiredFields) {
  const errors = {};
  const checkRequired = (value, field, path) => {
    if (!value) {
      errors[path.join(".")] = `The ${field} field is required`;
    }
  };
  const validateField = (data, field, path = []) => {
    if (Array.isArray(data[field])) {
      data[field].forEach((item, index) => {
        Object.keys(item).forEach((key) => {
          if (requiredFields.includes(`${field}.${key}`)) {
            checkRequired(item[key], key, [...path, field, index, key]);
          }
        });
      });
    } else {
      checkRequired(data[field], field, [...path, field]);
    }
  };
  requiredFields.forEach((field) => {
    const [mainField, ...nestedField] = field.split(".");
    if (nestedField.length > 0) {
      validateField(formData, mainField);
    } else {
      checkRequired(formData[mainField], mainField, [mainField]);
    }
  });
  return errors;
}
