import { useCallback } from "react";
import * as yup from "yup";
import { messages } from "./messages";

const localeMessages = messages.en;

const validationSchema = yup.object({
  firstName: yup.string().required(localeMessages.firstName.empty),
  lastName: yup.string().required(localeMessages.lastName.empty),
  email: yup
    .string()
    .email(localeMessages.email.email)
    .required(localeMessages.email.empty),
  subject: yup.string().required(localeMessages.subject.empty),
  subjectOther: yup
    .string()
    .ensure()
    .when("subject", {
      is: (subject) => subject === "other",
      then: yup.string().required(localeMessages.subjectOther.empty),
    }),
  message: yup.string().required(localeMessages.message.empty),
  agree: yup.boolean().oneOf([true], localeMessages.agree.invalid),
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
