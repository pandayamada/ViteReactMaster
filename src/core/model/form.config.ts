// form.config.tsx

export const ControlType = {
  text: 0,
  textarea: 1,
  select: 2,
  autocomplete: 3,
  checkbox: 4,
  radio: 5,
  date: 6,
  file: 7,
  space: 8,
  number: 9,
  multipleSelect: 10,
  adminPoly: 11,

  //* special
  search: 12,
  password: 13,
  email: 14,
  imgUpload: 15,
  inputChip: 16,
  inputTableChip: 17,
  empty: 18,
  videoUpload: 19,
  signature: 20,
  dateTime: 21,
  mapLocaion: 22,

  custom: 999,
};

// export interface WidgetOption {
//   value: string;
//   label: string;
// }

// export const widgetOptions: WidgetOption[] = [
//   { value: "trend_charts", label: "Trend Charts" },
//   { value: "average", label: "Average" },
//   { value: "mode", label: "Mode" },
//   { value: "median", label: "Median" },
//   { value: "min", label: "Min" },
//   { value: "max", label: "Max" },
//   { value: "sum", label: "Sum" },
//   { value: "count", label: "Count" },
// ];
