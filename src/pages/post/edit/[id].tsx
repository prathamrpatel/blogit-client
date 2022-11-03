import { gql } from '@apollo/client';
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import { InputField } from '../../../components/InputField';
import NavigationBar from '../../../components/NavigationBar';
import {
  usePostQuery,
  useUpdatePostMutation,
} from '../../../generated/graphql';
import { toErrorMap } from '../../../util/toErrorMap';
import { useIsAuth } from '../../../util/useIsAuth';
import createPost from '../../create-post';

interface PostProps {}

const Post = ({}: PostProps) => {
  useIsAuth();
  const router = useRouter();
  const { data } = usePostQuery({
    variables: {
      postId: Number(router.query.id),
    },
  });
  const [updatePost] = useUpdatePostMutation();

  if (!data?.post) {
    return <div>Post not found</div>;
  }

  return (
    <Flex direction="column" align="center">
      <Text mt="150px" fontSize="4xl" mb="20px">
        Update Post
      </Text>

      <Formik
        initialValues={{ title: data.post.title, body: data.post.body }}
        onSubmit={async (values, actions) => {
          const response = await updatePost({
            variables: {
              postId: data.post!.id,
              title: values.title,
              body: values.body,
            },
            update: (cache) => {
              cache.evict({ fieldName: 'posts' });
            },
          });

          console.log('akldjfa;ldkfj');

          if (response.data?.updatePost?.errors) {
            actions.setErrors(toErrorMap(response.data.updatePost.errors));
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
              <Button colorScheme="blue" type="submit" isLoading={isSubmitting}>
                Update
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </Flex>
  );
};

export default Post;
