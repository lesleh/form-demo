import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";

const schema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  subject: Joi.string().required(),
  subjectOther: Joi.string().when("subject", {
    is: "other",
    then: Joi.string().required(),
  }),
  message: Joi.string().required(),
  agree: Joi.boolean().falsy("").required(),
});

export function createJoiResolver() {
  return joiResolver(schema, {
    joi: Joi,
    abortEarly: false,
  });
}
