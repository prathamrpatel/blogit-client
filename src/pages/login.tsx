import { Box, Flex, Button, Link, Text } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { InputField } from '../components/InputField';
import {
  CurrentUserDocument,
  CurrentUserQuery,
  useLoginMutation,
} from '../generated/graphql';
import { toErrorMap } from '../util/toErrorMap';

interface LoginProps {}

const Login = ({}: LoginProps) => {
  const router = useRouter();
  const [login] = useLoginMutation();

  return (
    <Flex direction="column" align="center">
      <Text mt="150px" fontSize="4xl" mb="20px">
        Login
      </Text>

      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={async (values, actions) => {
          const response = await login({
            variables: {
              username: values.username,
              password: values.password,
            },
            update: (cache, { data }) => {
              cache.writeQuery<CurrentUserQuery>({
                query: CurrentUserDocument,
                data: {
                  __typename: 'Query',
                  currentUser: data?.login.user,
                },
              });
            },
          });

          if (response.data?.login.errors) {
            actions.setErrors(toErrorMap(response.data.login.errors));
          } else if (response.data?.login.user) {
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
              <NextLink href="/register">
                <Link>Don't have an account?</Link>
              </NextLink>
              <Button colorScheme="blue" type="submit" isLoading={isSubmitting}>
                Login
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </Flex>
  );
};

export default Login;
