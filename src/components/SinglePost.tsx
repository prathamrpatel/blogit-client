import { Post, useCurrentUserQuery } from '../generated/graphql';
import { Box, Heading, Text, Flex } from '@chakra-ui/react';
import EditDeleteButtons from './EditDeleteButtons';

interface SinglePostProps {
  post: Omit<Post, 'bodySnippet'>;
}

const SinglePost = ({ post }: SinglePostProps) => {
  const { data } = useCurrentUserQuery();

  return (
    <Flex w="700px" mx="auto" direction="column" align="center">
      {data?.currentUser?.id === post.authorId ? (
        <Flex mt="20px">
          <EditDeleteButtons postId={post.id} />
        </Flex>
      ) : null}

      <Box mt="20px">
        <Heading>{post.title}</Heading>
      </Box>

      <Box mt="20px" w="700px" mb="20px">
        <Text>{post.body}</Text>
      </Box>
    </Flex>
  );
};

export default SinglePost;
