import { useForm, FormProvider } from "react-hook-form";
import {
  Box,
  Button,
  Flex,
  Text,
  TextField,
  TextArea,
  Checkbox,
  Select,
  Option,
} from "@simplybusiness/mobius-simplybusiness";
import { ErrorMessage } from "@hookform/error-message";
import { useYupValidationResolver } from "./resolvers/yup";
import { createJoiResolver } from "./resolvers/joi";

const Error = ({ name }) => (
  <ErrorMessage
    name={name}
    render={({ message }) => (
      <Text color="error" elementType="span">
        {message}
      </Text>
    )}
  />
);

const validationState = (errors, name) => {
  if (errors[name]) {
    return "invalid";
  }
  return "valid";
};

const RESOLVER_TYPE = "joi";

function ContactForm() {
  let resolver;
  if (RESOLVER_TYPE === "yup") {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    resolver = useYupValidationResolver();
  } else {
    resolver = createJoiResolver();
  }
  const formMethods = useForm({
    resolver,
    reValidateMode: "onBlur",
  });
  const onSubmit = (data) => console.log(data);
  const subject = formMethods.watch("subject");

  return (
    <Box maxWidth="600px" margin="auto" padding="size-20">
      <form onSubmit={formMethods.handleSubmit(onSubmit)}>
        <FormProvider {...formMethods}>
          <Flex gap="size-20" flexDirection="column">
            <Flex gap="size-20">
              <Box flexBasis="100%">
                <TextField
                  label="First name"
                  {...formMethods.register("firstName", {
                    required: "First name is required",
                  })}
                  onChange={(value) => formMethods.setValue("firstName", value)}
                  validationState={validationState(
                    formMethods.formState.errors,
                    "firstName"
                  )}
                />
                <Error name="firstName" />
              </Box>
              <Box flexBasis="100%">
                <TextField
                  label="Last name"
                  {...formMethods.register("lastName")}
                  onChange={(value) => formMethods.setValue("lastName", value)}
                  validationState={validationState(
                    formMethods.formState.errors,
                    "lastName"
                  )}
                />
                <Error name="lastName" />
              </Box>
            </Flex>
            <TextField
              label="Email address"
              {...formMethods.register("email")}
              onChange={(value) => formMethods.setValue("email", value)}
              validationState={validationState(
                formMethods.formState.errors,
                "email"
              )}
            />
            <Error name="email" />
            <Select
              label="Subject"
              {...formMethods.register("subject")}
              onChange={(value) => formMethods.setValue("subject", value)}
              validationState={validationState(
                formMethods.formState.errors,
                "subject"
              )}
            >
              <Option value="">Select a subject</Option>
              <Option value="billing">Billing</Option>
              <Option value="account">Account</Option>
              <Option value="technical_support">Technical support</Option>
              <Option value="other">Other</Option>
            </Select>
            <Error name="subject" />

            <TextField
              label="Other subject"
              {...formMethods.register("subjectOther")}
              onChange={(value) => formMethods.setValue("subjectOther", value)}
              isDisabled={subject !== "other"}
              validationState={validationState(
                formMethods.formState.errors,
                "subjectOther"
              )}
            />
            <Error name="subjectOther" />
            {/* TODO: Rows doesn't work */}
            {/*
              Warning: Function components cannot be given refs. Attempts to
              access this ref will fail. Did you mean to use React.forwardRef()?
              
              Check the render method of `TextAreaInput`.
            */}
            <TextArea
              label="Message"
              rows={100}
              {...formMethods.register("message")}
              onChange={(value) => formMethods.setValue("message", value)}
              validationState={
                formMethods.formState.errors.message && "invalid"
              }
            />
            <Error name="message" />
            <Checkbox
              label="I agree to the terms and conditions"
              {...formMethods.register("agree")}
              onChange={(value) => formMethods.setValue("agree", value)}
              validationState={formMethods.formState.errors.agree && "invalid"}
            />
            <Error name="agree" />
            <Flex gap="size-20">
              <Button type="submit" width="100%">
                Send
              </Button>
              <Button type="reset" width="100%">
                Reset
              </Button>
            </Flex>
          </Flex>
        </FormProvider>
      </form>
    </Box>
  );
}

export { ContactForm };
