export type Result<T> =
  | {
      success: true;
      value: T;
    }
  | {
      success: false;
      errors: Array<string>;
    };

export type Validator<T> = {
  parse: (_: unknown) => Result<T>;
  new: (_: T) => Result<T>;
  is: (param: unknown) => param is T;
};

export type Static<T> = T extends Validator<infer T2> ? T2 : never;

function make_validator<T>(parser: (_: unknown) => Result<T>): Validator<T> {
  return {
    parse: parser,
    new: (value) => parser(value),
    is: (value): value is T => parser(value).success,
  };
}

export function hasKey<K extends string>(
  key: K,
  obj: {}
): obj is { [_ in K]: {} } {
  return typeof obj === `object` && key in obj;
}

export class Validators {
  public static Null(): Validator<null> {
    const parser = (value: unknown): Result<null> => {
      if (value === null) {
        return {
          success: true,
          value: null,
        };
      } else {
        return {
          success: false,
          errors: [
            `Should be primary <null> but got <${typeof value}> ${value}`,
          ],
        };
      }
    };
    return make_validator(parser);
  }

  public static Number(): Validator<number> {
    const parser = (value: unknown): Result<number> => {
      if (typeof value === `number` && value != null) {
        return {
          success: true,
          value,
        };
      } else {
        return {
          success: false,
          errors: [
            `Should be primary <number> but got <${typeof value}> ${value}`,
          ],
        };
      }
    };
    return make_validator(parser);
  }

  public static String(): Validator<string> {
    const parser = (value: unknown): Result<string> => {
      if (typeof value === `string` && value != null) {
        return {
          success: true,
          value,
        };
      } else {
        return {
          success: false,
          errors: [
            `Should be primary <string> but got <${typeof value}> ${value}`,
          ],
        };
      }
    };
    return make_validator(parser);
  }

  public static Boolean(): Validator<boolean> {
    const parser = (value: unknown): Result<boolean> => {
      if (typeof value === `boolean` && value != null) {
        return {
          success: true,
          value,
        };
      } else {
        return {
          success: false,
          errors: [
            `Should be primary <boolean> but got <${typeof value}> ${value}`,
          ],
        };
      }
    };
    return make_validator(parser);
  }

  public static Record<T extends { [_: string]: unknown }>(params: {
    [K in keyof T]: Validator<T[K]>;
  }): Validator<T> {
    const parser = (value: unknown): Result<T> => {
      if (typeof value !== `object` || value == null) {
        return {
          success: false,
          errors: [`Should be a record but got <${typeof value}> ${value}`],
        };
      }

      const response: Record<string, any> = {};
      let errors: Array<string> = [];
      for (const key of Object.keys(params)) {
        if (!hasKey(key, value)) {
          errors.push(`->${key} : Missing key`);
          continue;
        }
        const field_value = value[key];

        const parsed_field = params[key].parse(field_value);
        if (parsed_field.success === false) {
          errors = errors.concat(
            parsed_field.errors.map((error) => {
              if (error.substr(0, 2) === `->`) return `->${key}${error}`;
              return `->${key} : ${error}`;
            })
          );
        } else {
          response[key] = parsed_field.value;
        }
      }

      // Response
      if (errors.length > 0) {
        return {
          success: false,
          errors,
        };
      }
      return {
        success: true,
        value: response as T,
      };
    };
    return make_validator(parser);
  }
}
