import { useCallback } from "react";
import * as yup from "yup";
import { messages } from "./messages";

const validationSchema = yup.object({
  firstName: yup.string().required(messages.en.firstName.empty),
  lastName: yup.string().required(messages.en.lastName.empty),
  email: yup
    .string()
    .email(messages.en.email.email)
    .required(messages.en.email.empty),
  subject: yup.string().required(messages.en.subject.empty),
  subjectOther: yup
    .string()
    .ensure()
    .when("subject", {
      is: (subject) => subject === "other",
      then: yup.string().required(messages.en.subjectOther.empty),
    }),
  message: yup.string().required(messages.en.message.empty),
  agree: yup.boolean().oneOf([true], messages.en.agree.invalid),
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
