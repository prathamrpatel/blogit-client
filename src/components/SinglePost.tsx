import { Post, useCurrentUserQuery } from '../generated/graphql';
import { Box, Heading, Text, Flex, Center } from '@chakra-ui/react';
import EditDeleteButtons from './EditDeleteButtons';

interface SinglePostProps {
  post: Omit<Post, 'bodySnippet'>;
}

const SinglePost = ({ post }: SinglePostProps) => {
  const { data } = useCurrentUserQuery();

  return (
    <Center>
      {data?.currentUser?.id === post.authorId ? (
        <Flex mt="20px">
          <EditDeleteButtons postId={post.id} />
        </Flex>
      ) : null}

      <Flex direction="column" align="center">
        <Box mt="20px">
          <Heading>{post.title}</Heading>
        </Box>

        <Box mt="20px" w="700px" mb="20px">
          <Text overflowWrap={'normal'}>{post.body}</Text>
        </Box>
      </Flex>
    </Center>
  );
};

export default SinglePost;
