import _ from 'lodash';

export const required = (message='Required') => value => {
  if (_.isArray(value)){
    return value.length < 1 ? message : undefined;
  }
  return (value ? undefined : message);
}

export const maxLength = max => (message=`Must be ${max} characters or less`) => value =>
  value && value.length > max ? message : undefined;

export const minLength = min => (message=`Must be ${min} characters or more`) => value =>
  value && value.length < min ? message : undefined;

export const number = (message='Must be a number') => value =>
  value && isNaN(Number(value)) ? message : undefined;

export const minValue = min => (message=`Must be at least ${min}`) => value =>
  value && value < min ? message : undefined;

export const maxValue = max => (message=`Must be at most ${max}`) => value =>
  value && value > max ? message : undefined;

export const email = (message='Invalid email address') => value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? message : undefined;

export const alphaNumeric = (message='Only alphanumeric characters') => value =>
  value && /[^a-zA-Z0-9 ]/i.test(value)
    ? message : undefined;

export const phoneNumber = (message='Invalid phone number, must be 10 digits') => value =>
  value && !/^(0|[1-9][0-9]{9})$/i.test(value)
    ? message : undefined;

