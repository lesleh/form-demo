import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  Flex,
  Text,
  TextField,
  TextArea,
  Checkbox,
} from "@simplybusiness/mobius-simplybusiness";

const Error = ({ error }) =>
  (error && (
    <Text color="error" margin={0}>
      {error}
    </Text>
  )) ||
  null;

function handleChange(formik, name, value) {
  formik.setFieldValue(name, value);
  formik.setFieldTouched(name, true);
}

function ContactFormik() {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
    },

    validationSchema: Yup.object({
      firstName: Yup.string().required("First name is required"),
      lastName: Yup.string().required("Last name is required"),
      message: Yup.string().required("Message is required"),
      agree: Yup.boolean().required(
        "You must agree to the terms and conditions"
      ),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    }),

    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <Box maxWidth="600px" margin="auto" padding="size-20">
      <form onSubmit={formik.handleSubmit}>
        <Flex gap="size-20" flexDirection="column">
          <Flex gap="size-20">
            <Box flexBasis="100%">
              <TextField
                name="firstName"
                label="First name"
                onChange={(value) => handleChange(formik, "firstName", value)}
                value={formik.values.firstName}
                validationState={formik.errors.firstName ? "invalid" : null}
              />
              <Error error={formik.errors.firstName} />
            </Box>
            <Box flexBasis="100%">
              <TextField
                name="lastName"
                label="Last name"
                onChange={(value) => handleChange(formik, "lastName", value)}
                value={formik.values.lastName}
                validationState={formik.errors.lastName ? "invalid" : null}
              />
              <Error error={formik.errors.lastName} />
            </Box>
          </Flex>
          <TextField
            name="email"
            label="Email address"
            onChange={(value) => handleChange(formik, "email", value)}
            value={formik.values.email}
            validationState={formik.errors.email ? "invalid" : null}
          />
          <Error error={formik.errors.email} />
          {/* TODO: Rows doesn't work */}
          {/*
              Warning: Function components cannot be given refs. Attempts to
              access this ref will fail. Did you mean to use React.forwardRef()?
              
              Check the render method of `TextAreaInput`.
            */}
          <TextArea
            name="message"
            label="Message"
            onChange={(value) => handleChange(formik, "message", value)}
            value={formik.values.message}
            validationState={formik.errors.message ? "invalid" : null}
            rows={100}
          />
          <Error error={formik.errors.message} />
          <Checkbox
            name="agree"
            label="I agree to the terms and conditions"
            onChange={(value) => handleChange(formik, "agree", value)}
            checked={formik.values.agree}
            validationState={formik.errors.agree ? "invalid" : null}
          />
          <Error error={formik.errors.agree} />
          <Flex gap="size-20">
            <Button type="submit" width="100%">
              Send
            </Button>
            <Button type="reset" width="100%">
              Reset
            </Button>
          </Flex>
        </Flex>
      </form>
    </Box>
  );
}

export { ContactFormik };
