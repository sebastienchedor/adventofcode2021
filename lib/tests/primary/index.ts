import { Validators } from "../../src";
import { Test, expect } from "../model";

// Null
const null_tests: Array<Test> = [
  {
    name: `Null validator new`,
    method: () => {
      const validator = Validators.Null();
      const response = validator.new(null);
      if (response.success === false)
        throw new Error(response.errors.join(`\n`));
    },
  },
  {
    name: `Null validator parsing null entry`,
    method: () => {
      const validator = Validators.Null();
      const response = validator.parse(null);
      if (response.success === false)
        throw new Error(response.errors.join(`\n`));
    },
  },
  {
    name: `Null validator parsing not null entry`,
    method: () => {
      const validator = Validators.Null();
      const response = validator.parse(2);
      if (response.success === true)
        throw new Error(`This test should return an error`);
      expect.equal_string(
        response.errors[0],
        `Should be primary <null> but got <number> 2`
      );
    },
  },
  {
    name: `Null validator parsing not undefined entry`,
    method: () => {
      const validator = Validators.Null();
      const response = validator.parse(undefined);
      if (response.success === true)
        throw new Error(`This test should return an error`);
      expect.equal_string(
        response.errors[0],
        `Should be primary <null> but got <undefined> undefined`
      );
    },
  },
];

// Number
const number_tests: Array<Test> = [
  {
    name: `Number validator new`,
    method: () => {
      const validator = Validators.Number();
      const response = validator.new(23);
      if (response.success === false)
        throw new Error(response.errors.join(`\n`));
    },
  },
  {
    name: `Number validator parsing number entry`,
    method: () => {
      const validator = Validators.Number();
      const response = validator.parse(23);
      if (response.success === false)
        throw new Error(response.errors.join(`\n`));
    },
  },
  {
    name: `Number validator parsing not null entry`,
    method: () => {
      const validator = Validators.Number();
      const response = validator.parse(null);
      if (response.success === true)
        throw new Error(`This test should return an error`);
      expect.equal_string(
        response.errors[0],
        `Should be primary <number> but got <object> null`
      );
    },
  },
  {
    name: `Number validator parsing not undefined entry`,
    method: () => {
      const validator = Validators.Number();
      const response = validator.parse(undefined);
      if (response.success === true)
        throw new Error(`This test should return an error`);
      expect.equal_string(
        response.errors[0],
        `Should be primary <number> but got <undefined> undefined`
      );
    },
  },
];

// String
const string_tests: Array<Test> = [
  {
    name: `String validator new`,
    method: () => {
      const validator = Validators.String();
      const response = validator.new(`4567
      567
      
      {]^@]#~//RTYU\n}`);
      if (response.success === false)
        throw new Error(response.errors.join(`\n`));
    },
  },
  {
    name: `String validator parsing string entry`,
    method: () => {
      const validator = Validators.String();
      const response = validator.parse(`4567
      567
      
      {]^@]#~//RTYU\n}`);
      if (response.success === false)
        throw new Error(response.errors.join(`\n`));
    },
  },
  {
    name: `String validator parsing not null entry`,
    method: () => {
      const validator = Validators.String();
      const response = validator.parse(null);
      if (response.success === true)
        throw new Error(`This test should return an error`);
      expect.equal_string(
        response.errors[0],
        `Should be primary <string> but got <object> null`
      );
    },
  },
  {
    name: `String validator parsing not undefined entry`,
    method: () => {
      const validator = Validators.String();
      const response = validator.parse(undefined);
      if (response.success === true)
        throw new Error(`This test should return an error`);
      expect.equal_string(
        response.errors[0],
        `Should be primary <string> but got <undefined> undefined`
      );
    },
  },
];

// Boolean
const boolean_tests: Array<Test> = [
  {
    name: `Boolean validator new`,
    method: () => {
      const validator = Validators.Boolean();
      const response = validator.new(2 === 2);
      if (response.success === false)
        throw new Error(response.errors.join(`\n`));
    },
  },
  {
    name: `Boolean validator parsing boolean entry`,
    method: () => {
      const validator = Validators.Boolean();
      const response = validator.parse(2 === 2);
      if (response.success === false)
        throw new Error(response.errors.join(`\n`));
    },
  },
  {
    name: `Boolean validator parsing not null entry`,
    method: () => {
      const validator = Validators.Boolean();
      const response = validator.parse(null);
      if (response.success === true)
        throw new Error(`This test should return an error`);
      expect.equal_string(
        response.errors[0],
        `Should be primary <boolean> but got <object> null`
      );
    },
  },
  {
    name: `Boolean validator parsing not undefined entry`,
    method: () => {
      const validator = Validators.Boolean();
      const response = validator.parse(undefined);
      if (response.success === true)
        throw new Error(`This test should return an error`);
      expect.equal_string(
        response.errors[0],
        `Should be primary <boolean> but got <undefined> undefined`
      );
    },
  },
];

export const primary = null_tests
  .concat(number_tests)
  .concat(string_tests)
  .concat(boolean_tests);
