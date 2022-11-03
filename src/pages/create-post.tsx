import { Box, Flex, Button, Link, Text } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { InputField } from '../components/InputField';
import {
  CurrentUserDocument,
  CurrentUserQuery,
  PostsDocument,
  PostsQuery,
  useCreatePostMutation,
  useLoginMutation,
} from '../generated/graphql';
import { toErrorMap } from '../util/toErrorMap';
import { useIsAuth } from '../util/useIsAuth';

interface CreatePostProps {}

const CreatePost = ({}: CreatePostProps) => {
  useIsAuth();
  const router = useRouter();
  const [createPost] = useCreatePostMutation();

  return (
    <Flex direction="column" align="center">
      <Text mt="150px" fontSize="4xl" mb="20px">
        Create Post
      </Text>

      <Formik
        initialValues={{ title: '', body: '' }}
        onSubmit={async (values, actions) => {
          const response = await createPost({
            variables: {
              title: values.title,
              body: values.body,
            },
            update: (cache) => {
              cache.evict({ fieldName: 'posts' });
            },
          });

          if (response.data?.createPost.errors) {
            actions.setErrors(toErrorMap(response.data.createPost.errors));
          } else {
            router.push('/');
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box>
              <InputField name="title" placeholder="Title" />
            </Box>

            <Box mt="15px">
              <InputField
                name="body"
                placeholder="Body"
                textarea={true}
                height="200px"
              />
            </Box>

            <Flex w="350px" mt="15px" justify="flex-end">
              <Button
                colorScheme="blue"
                isLoading={isSubmitting}
                mr="5px"
                onClick={() => console.log('Implement save in the future')}
              >
                Save
              </Button>
              <Button colorScheme="blue" type="submit" isLoading={isSubmitting}>
                Post
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </Flex>
  );
};

export default CreatePost;
