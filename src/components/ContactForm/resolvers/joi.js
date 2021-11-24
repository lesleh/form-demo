import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { messages } from "./messages";

const formatMessages = (messages) => {
  return Object.keys(messages).reduce((acc, key) => {
    acc[`string.${key}`] = messages[key];
    return acc;
  }, {});
};

const schema = Joi.object({
  firstName: Joi.string()
    .required()
    .messages(formatMessages(messages.en.firstName)),
  lastName: Joi.string()
    .required()
    .messages(formatMessages(messages.en.lastName)),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages(formatMessages(messages.en.email)),
  subject: Joi.string()
    .required()
    .messages(formatMessages(messages.en.subject)),
  subjectOther: Joi.string().when("subject", {
    is: "other",
    then: Joi.string().required(),
  }),
  message: Joi.string().required().messages({
    "any.required": messages.en.message.empty,
  }),
  agree: Joi.boolean().invalid(false).messages({
    "any.invalid": messages.en.agree.invalid,
  }),
});

export function createJoiResolver() {
  return joiResolver(schema, {
    joi: Joi,
    abortEarly: false,
  });
}
