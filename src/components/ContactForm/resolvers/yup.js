import { useCallback } from "react";
import * as yup from "yup";

const validationSchema = yup.object({
  firstName: yup.string().required("Required"),
  lastName: yup.string().required("Required"),
  email: yup.string().email("Must be a valid email").required("Required"),
  subject: yup.string().required("Required"),
  subjectOther: yup
    .string()
    .ensure()
    .when("subject", {
      is: (subject) => subject === "other",
      then: yup.string().required("Required"),
    }),
  message: yup.string().required("Required"),
  agree: yup.boolean().oneOf([true], "Required"),
});

export const useYupValidationResolver = () =>
  useCallback(async (data) => {
    try {
      const values = await validationSchema.validate(data, {
        abortEarly: false,
      });

      return {
        values,
        errors: {},
      };
    } catch (errors) {
      return {
        values: {},
        errors: errors.inner.reduce(
          (allErrors, currentError) => ({
            ...allErrors,
            [currentError.path]: {
              type: currentError.type ?? "validation",
              message: currentError.message,
            },
          }),
          {}
        ),
      };
    }
  }, []);
