import { Input, Box, Flex, Button, Link, Text } from '@chakra-ui/react';
import NextLink from 'next/link';
import { InputField } from '../components/InputField';
import { Formik, Form } from 'formik';
import {
  CurrentUserDocument,
  CurrentUserQuery,
  useRegisterMutation,
} from '../generated/graphql';
import { toErrorMap } from '../util/toErrorMap';
import { useRouter } from 'next/router';

interface RegisterProps {}

const Register = ({}: RegisterProps) => {
  const router = useRouter();
  const [register] = useRegisterMutation();

  return (
    <Flex direction="column" align="center">
      <Text mt="150px" fontSize="4xl" mb="20px">
        Register
      </Text>

      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={async (values, actions) => {
          const response = await register({
            variables: {
              username: values.username,
              password: values.password,
            },
            update: (cache, { data }) => {
              cache.writeQuery<CurrentUserQuery>({
                query: CurrentUserDocument,
                data: {
                  __typename: 'Query',
                  currentUser: data?.register.user,
                },
              });
            },
          });

          if (response.data?.register.errors) {
            actions.setErrors(toErrorMap(response.data.register.errors));
          } else if (response.data?.register.user) {
            router.push('/');
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box>
              <InputField name="username" placeholder="Username" />
            </Box>

            <Box mt="15px">
              <InputField name="password" placeholder="Password" />
            </Box>

            <Flex w="350px" mt="15px" justify="space-between">
              <NextLink href="/login">
                <Link>Already have an account?</Link>
              </NextLink>
              <Button colorScheme="blue" type="submit" isLoading={isSubmitting}>
                Register
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </Flex>
  );
};

export default Register;
