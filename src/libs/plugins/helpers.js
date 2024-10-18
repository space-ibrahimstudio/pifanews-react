import he from "he";

export const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  let month = today.getMonth() + 1;
  let day = today.getDate();
  month = month < 10 ? "0" + month : month;
  day = day < 10 ? "0" + day : day;

  return `${year}-${month}-${day}`;
};

export const inputValidator = (formData, requiredFields) => {
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
};

export const useOptions = () => {
  const limitopt = [
    { value: 10, label: "Baris per Halaman: 10" },
    { value: 20, label: "Baris per Halaman: 20" },
    { value: 50, label: "Baris per Halaman: 50" },
    { value: 100, label: "Baris per Halaman: 100" },
    { value: 500, label: "Baris per Halaman: 500" },
  ];

  return { limitopt };
};

export const useInputSchema = () => {
  const inputSch = {
    name: "",
    phone: "",
    address: "",
    post_date: "",
    judul: "",
    penulis: "",
    catberita: "",
    catdaerah: "",
    thumbnail: "",
    tag: [{ tag: "" }],
    desc: "",
    image: "",
    highlight: "",
    syarat: "",
    info: "",
    tanggal: "",
    event_id: "",
    event_title: "",
    event_image: "",
    event_day: "",
    event_loc: "",
    event_info: "",
    event_cost: "",
    event_date: "",
    event_guide: "",
    event_coords: "",
    tag_suggest: "",
  };
  const errorSch = {
    name: "",
    phone: "",
    address: "",
    post_date: "",
    judul: "",
    penulis: "",
    catberita: "",
    catdaerah: "",
    thumbnail: "",
    tag: [{ tag: "" }],
    desc: "",
    image: "",
    highlight: "",
    syarat: "",
    info: "",
    tanggal: "",
    event_id: "",
    event_title: "",
    event_image: "",
    event_day: "",
    event_loc: "",
    event_info: "",
    event_cost: "",
    event_date: "",
    event_guide: "",
    event_coords: "",
    tag_suggest: "",
  };

  return { inputSch, errorSch };
};

export const useDocument = () => {
  const company = "Pifa Net";
  const short = "pifa";
  const domain = process.env.REACT_APP_DOMAIN_MAIN;

  return { company, short, domain };
};

export const formatToISO8601 = (dateTimeStr) => {
  const date = new Date(dateTimeStr);
  const isoString = date.toISOString();
  const [datePart, timePart] = isoString.split("T");
  const [timeWithoutMs, msPart] = timePart.split(".");

  return `${datePart}T${timeWithoutMs}+07:00`;
};

export const stripHtml = (html) => {
  const plainText = html.replace(/<[^>]+>/g, "");
  return he.decode(plainText);
};

export const toPathname = (text) => {
  let pathname = text.toLowerCase();
  pathname = pathname.replace(/[^a-z0-9\s]/g, "");
  pathname = pathname.replace(/\s+/g, "-");

  return pathname;
};

export const getNestedValue = (obj, path) => {
  return path.split(".").reduce((acc, part) => acc && acc[part], obj);
};
