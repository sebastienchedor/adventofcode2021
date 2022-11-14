import { Validators } from "../../src";
import { Test, expect } from "../model";

// Null
export const record: Array<Test> = [
  // New
  {
    name: `Record simple new`,
    method: () => {
      const validator = Validators.Record({
        field1: Validators.Null(),
        field2: Validators.Number(),
      });
      const response = validator.new({
        field1: null,
        field2: 23456,
      });
      if (response.success === false)
        throw new Error(response.errors.join(`\n`));
    },
  },
  {
    name: `Record complex new`,
    method: () => {
      const validator = Validators.Record({
        field1: Validators.Null(),
        field2: Validators.Number(),
        record: Validators.Record({
          field1: Validators.Null(),
          field2: Validators.Number(),
        }),
      });
      const response = validator.new({
        field1: null,
        field2: 23456,
        record: {
          field1: null,
          field2: 34567,
        },
      });
      if (response.success === false)
        throw new Error(response.errors.join(`\n`));
    },
  },

  // Parsing
  {
    name: `Record simple parse`,
    method: () => {
      const validator = Validators.Record({
        field1: Validators.Null(),
        field2: Validators.Number(),
      });
      const response = validator.parse({
        field1: null,
        field2: 23456,
      });
      if (response.success === false)
        throw new Error(response.errors.join(`\n`));
    },
  },
  {
    name: `Record complex parse`,
    method: () => {
      const validator = Validators.Record({
        field1: Validators.Null(),
        field2: Validators.Number(),
        record: Validators.Record({
          field1: Validators.Null(),
          field2: Validators.Number(),
        }),
      });
      const response = validator.new({
        field1: null,
        field2: 23456,
        record: {
          field1: null,
          field2: 34567,
        },
      });
      if (response.success === false)
        throw new Error(response.errors.join(`\n`));
    },
  },

  // Missing fields
  {
    name: `Missing field`,
    method: () => {
      const validator = Validators.Record({
        field: Validators.Null(),
      });
      const response = validator.parse({});
      if (response.success === true)
        throw new Error(`This test should return an error`);
      expect.equal_string_array(response.errors, [`->field : Missing key`]);
    },
  },
  {
    name: `Missing nested field`,
    method: () => {
      const validator = Validators.Record({
        record: Validators.Record({
          field: Validators.Number(),
        }),
      });
      const response = validator.parse({
        record: {},
      });
      if (response.success === true)
        throw new Error(`This test should return an error`);
      expect.equal_string_array(response.errors, [
        `->record->field : Missing key`,
      ]);
    },
  },

  // Invalid fields
  {
    name: `Invalid field`,
    method: () => {
      const validator = Validators.Record({
        field: Validators.Boolean(),
      });
      const response = validator.parse({
        field: `string`,
      });
      if (response.success === true)
        throw new Error(`This test should return an error`);
      expect.equal_string_array(response.errors, [
        `->field : Should be primary <boolean> but got <string> string`,
      ]);
    },
  },
  {
    name: `Invalid nested field`,
    method: () => {
      const validator = Validators.Record({
        record: Validators.Record({
          field: Validators.String(),
        }),
      });
      const response = validator.parse({
        record: {
          field: 56789,
        },
      });
      if (response.success === true)
        throw new Error(`This test should return an error`);
      expect.equal_string_array(response.errors, [
        `->record->field : Should be primary <string> but got <number> 56789`,
      ]);
    },
  },

  // Multiple errors
  {
    name: `Missing multiple nested fields`,
    method: () => {
      const validator = Validators.Record({
        field1: Validators.Null(),
        field2: Validators.Null(),
        field3: Validators.Null(),
        record1: Validators.Record({
          field1: Validators.Number(),
          field2: Validators.Number(),
          field3: Validators.Number(),
        }),
        record2: Validators.Record({
          field1: Validators.String(),
          field2: Validators.String(),
          field3: Validators.String(),
          nested_record1: Validators.Record({
            field1: Validators.Boolean(),
            field2: Validators.Boolean(),
            field3: Validators.Boolean(),
          }),
          nested_record2: Validators.Record({
            field1: Validators.String(),
            field2: Validators.String(),
            field3: Validators.String(),
          }),
          nested_record3: Validators.Record({
            field1: Validators.String(),
            field2: Validators.String(),
            field3: Validators.String(),
          }),
        }),
      });
      const response = validator.parse({
        field1: null,
        field2: {},
        record1: {
          field1: 456,
          field2: `ERT`,
        },
        record2: {
          field1: `string`,
          field2: true,
          nested_record1: {
            field1: false,
            field2: 456,
          },
          nested_record2: {
            field1: `string`,
            field2: 987,
          },
        },
        additional_field: `ignored`,
      });
      if (response.success === true)
        throw new Error(`This test should return an error`);

      expect.equal_string_array(response.errors, [
        `->field2 : Should be primary <null> but got <object> [object Object]`,
        `->field3 : Missing key`,
        `->record1->field2 : Should be primary <number> but got <string> ERT`,
        `->record1->field3 : Missing key`,
        `->record2->field2 : Should be primary <string> but got <boolean> true`,
        `->record2->field3 : Missing key`,
        `->record2->nested_record1->field2 : Should be primary <boolean> but got <number> 456`,
        `->record2->nested_record1->field3 : Missing key`,
        `->record2->nested_record2->field2 : Should be primary <string> but got <number> 987`,
        `->record2->nested_record2->field3 : Missing key`,
        `->record2->nested_record3 : Missing key`,
      ]);
    },
  },
];
