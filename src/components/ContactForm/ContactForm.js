import { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import {
  Box,
  Button,
  Flex,
  Text,
  TextField,
  TextArea,
} from "@simplybusiness/mobius-simplybusiness";
import { ErrorMessage } from "@hookform/error-message";

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

function ContactForm() {
  const formMethods = useForm();
  const onSubmit = (data) => console.log(data);
  console.log(formMethods.formState.errors);
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
                  validationState={
                    formMethods.formState.errors.firstName && "invalid"
                  }
                />
                <Error name="firstName" />
              </Box>
              <Box flexBasis="100%">
                <TextField
                  label="Last name"
                  {...formMethods.register("lastName", {
                    required: "Last name is required",
                  })}
                  onChange={(value) => formMethods.setValue("lastName", value)}
                  validationState={
                    formMethods.formState.errors.firstName && "invalid"
                  }
                />
                <Error name="lastName" />
              </Box>
            </Flex>
            {/* TODO: Rows doesn't work */}
            {/* TODO: TextArea appears broken, error about refs */}
            <TextArea
              label="Message"
              rows="10"
              {...formMethods.register("message", {
                required: "Message is required",
              })}
              onChange={(value) => formMethods.setValue("message", value)}
              validationState={
                formMethods.formState.errors.message && "invalid"
              }
            />
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
