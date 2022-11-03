import { Box, Flex, Heading, Link, Text } from '@chakra-ui/react';
import NextLink from 'next/link';
import { Post, useCurrentUserQuery } from '../generated/graphql';
import EditDeleteButtons from './EditDeleteButtons';

interface PostProps {
  post: Omit<Post, 'body'>;
}

const Post = ({ post }: PostProps) => {
  const { data } = useCurrentUserQuery();

  return (
    <Box p={5} borderWidth="1px" mt="15px" w="750px">
      <Flex justify="space-between">
        <Flex direction="column">
          <Box>
            <NextLink href={`post/${post.id}`}>
              <Link>
                <Heading fontSize="xl">{post.title}</Heading>
              </Link>
            </NextLink>
          </Box>

          <Box>
            <Text mt={4}>{post.bodySnippet}...</Text>
          </Box>
        </Flex>

        {post.authorId === data?.currentUser?.id ? (
          <Flex direction="column">
            <EditDeleteButtons postId={post.id} />
          </Flex>
        ) : null}
      </Flex>
    </Box>
  );
};

export default Post;
