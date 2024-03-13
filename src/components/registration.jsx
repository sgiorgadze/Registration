import React, { Component } from "react";

import Joi from "joi-browser";

import Dropdown from "./common/dropdown";
import Input from "./common/input";
import BirhtdayDataInput from "./birthdayDataInput";

import { getYears } from "../services/years";
import { getCountries } from "../services/countries";

import "./registration.css";

class Registration extends Component {
  state = {
    account: {
      name: "",
      surname: "",
      country: null,
      personalNumber: "",
      bdDay: "",
      bdMonth: "",
      bdYear: "",
      phoneCountry: null,
      phoneNumber: "",
      email: "",
      username: "",
      password: "",
    },

    days: [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
      21,
      22,
      23,
      24,
      25,
      26,
      27,
      28,
      29,
      30,
      31,
    ],
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    years: [],
    countries: [],
    defaultCountry: null,
    errors: {},
  };

  componentDidMount() {
    const defaultCountry = getCountries().find((x) => x.code === "ge");
    const account = { ...this.state.account };
    account.country = defaultCountry;
    account.phoneCountry = defaultCountry;

    this.setState({
      years: getYears(),
      countries: getCountries(),
      account,
      defaultCountry,
    });
  }

  schema = {
    name: Joi.string()
      .min(2)
      .required()
      .error(() => {
        return {
          message: "სახელი უნდა შეიცავდეს მინუმიმ 2 სიმბოლოს",
        };
      }),
    surname: Joi.string()
      .required()
      .min(4)
      .error(() => {
        return {
          message: "გვარი უნდა შეიცავდეს მინუმიმ 4 სიმბოლოს",
        };
      }),
    personalNumber: Joi.string()
      .required()
      .min(8)
      .max(15)
      .error(() => {
        return {
          message: "პირადი ნომერი უნდა შეიცავდეს 8 დან 15 სიმბოლომდე",
        };
      }),
    username: Joi.string()
      .required()
      .min(4)
      .error(() => {
        return {
          message: "მომხმარებლის სახელი უნდა შეიცავდეს მინუმიმ 4 სიმბოლოს",
        };
      }),
    password: Joi.string()
      .required()
      .min(6)
      .error(() => {
        return {
          message: "პაროლი უნდა შედგებოდეს მინუმიმ 6 სიმბოლოსგან",
        };
      }),
    bdDay: Joi.string().required(),
    bdMonth: Joi.string().required(),
    bdYear: Joi.string().required(),
    phoneNumber: Joi.string().trim().regex(/[0-9]/).min(9),
  };

  validate = () => {
    const result = Joi.validate(this.state.account, this.schema, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (!result.error) return null;

    const errors = {};

    for (let item of result.error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();

    this.setState({ errors: errors || {} });

    if (errors) {
      console.log(errors);
      return;
    }

    console.log("submited");
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };

    if (!schema[name]) return null;

    const { error } = Joi.validate(obj, schema);

    return error ? error.details[0].message : null;
  };

  handleCountrySelect = (country) => {
    this.setCountry(country);
  };

  handleCountryChange = (countryName, input) => {
    const country = this.state.countries.find((c) =>
      c.name.includes(countryName)
    );
    if (country) this.setCountry(country);
  };

  setCountry = (country) => {
    const account = { ...this.state.account };
    account.country = country;
    this.setState({ account });
  };

  handlePhoneCountrySelect = (country) => {
    const account = { ...this.state.account };
    account.phoneCountry = country;
    this.setState({ account });
  };

  handlePhoneChange = (phone, input) => {
    this.handleChange(input);
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);

    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const account = { ...this.state.account };
    account[input.name] = input.value;

    this.setState({ account, errors });
  };

  render() {
    const {
      account,
      errors,
      days,
      months,
      years,
      countries,
      defaultCountry,
    } = this.state;
    return (
      <div className="wrapper">
        <div className="register__form">
          <form className="form" onSubmit={this.handleSubmit}>
            <Input
              name="name"
              value={account.name}
              label="სახელი"
              type="text"
              onChange={this.handleChange}
              error={errors.name}
              showValidationIcon={true}
              required={true}
            />

            <Input
              name="surname"
              value={account.surname}
              label="გვარი"
              type="text"
              onChange={this.handleChange}
              error={errors.surname}
              showValidationIcon={true}
              required={true}
            />

            <Dropdown
              label="ქვეყანა"
              isRequired={true}
              items={countries}
              selectedItem={account.country}
              name="country"
              iconsClass="country-select"
              iconClassProperty="code"
              inputValue={account.country ? account.country.name : ""}
              defaultItem={defaultCountry}
              titleProperty="name"
              onSelect={this.handleCountrySelect}
              onChange={this.handleCountryChange}
              arrowPosition="right"
            />

            <Input
              name="personalNumber"
              value={account.personalNumber}
              label="პირადი ნომერი"
              type="text"
              onChange={this.handleChange}
              error={errors.personalNumber}
              showValidationIcon={true}
              required={true}
            />

            <BirhtdayDataInput
              days={days}
              months={months}
              years={years}
              errorDay={errors.bdDay}
              errorMonth={errors.bdMonth}
              errorYear={errors.bdYear}
              onChange={this.handleChange}
            />

            <Input
              name="email"
              value={account.email}
              label="ელ ფოსტა"
              type="text"
              onChange={this.handleChange}
            />

            <Dropdown
              label="ტელეფონი"
              isRequired={true}
              items={countries}
              name="phoneNumber"
              selectedItem={account.phoneCountry}
              onSelect={this.handlePhoneCountrySelect}
              onChange={this.handlePhoneChange}
              iconClassProperty="code"
              iconsClass="country-select"
              titleProperty="name"
              inputValue={account.phoneNumber}
              iconTittleProperty="phoneCode"
              defaultItem={defaultCountry}
              subTittleProperty="phoneCode"
              arrowPosition="left"
              error={errors.phoneNumber}
            />

            <div className="line">
              <Input
                name="username"
                value={account.username}
                label="მომხმარებელი"
                type="text"
                onChange={this.handleChange}
                error={errors.username}
                showValidationIcon={true}
                required={true}
              />

              <Input
                name="password"
                value={account.password}
                label="პაროლი"
                type="password"
                onChange={this.handleChange}
                error={errors.password}
                showValidationIcon={true}
                required={true}
              />
            </div>

            <div className="form-group">
              <label htmlFor="username"></label>
              <button className="reg-button">რეგისტრაცია</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Registration;
