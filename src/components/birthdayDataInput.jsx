import React from "react";

const BirhtdayDataInput = ({
  days,
  months,
  years,
  errorDay,
  errorMonth,
  errorYear,
  onChange,
}) => {
  let borderDay = "";
  let borderMonth = "";
  let borderYaer = "";

  if (errorDay) borderDay += "borderline";
  if (errorMonth) borderMonth += "borderline";
  if (errorYear) borderYaer += "borderline";

  return (
    <div className="form-group">
      <label>
        დაბადების თარიღი<span>*</span>
      </label>
      <select
        name="bdDay"
        id="birthday-date"
        className={borderDay}
        onChange={onChange}
      >
        <option value="">რიცხვი</option>
        {days.map((d) => (
          <option key={d} value={d}>
            {d}
          </option>
        ))}
      </select>
      <select
        name="bdMonth"
        id="birthday-month"
        className={borderMonth}
        onChange={onChange}
      >
        <option value="">თვე</option>
        {months.map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </select>
      <select
        name="bdYear"
        id="birthday-year"
        className={borderYaer}
        onChange={onChange}
      >
        <option value="">წელი</option>
        {years.map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>
    </div>
  );
};

export default BirhtdayDataInput;
