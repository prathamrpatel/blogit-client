import { Stack, Center, Text, Heading, Box } from '@chakra-ui/react';
import EditDeleteButtons from './EditDeleteButtons';
import { useCurrentUserQuery } from '../generated/graphql';

interface BlogProps {
  postId: number;
  title: string;
  body: string;
  authorId: number;
}

const Blog = ({ postId, title, body, authorId }: BlogProps) => {
  const { data } = useCurrentUserQuery();

  return (
    <Center py={6}>
      <Box maxW="500px">
        <Stack>
          <Center>
            <Heading size="2xl" mx="20px">
              {title}
            </Heading>
          </Center>

          <Center>
            <Text fontSize="lg" mt="20px" mx="20px" mb="20px">
              {body}
            </Text>
          </Center>

          <Center>
            {data?.currentUser?.id === authorId ? (
              <EditDeleteButtons postId={postId} />
            ) : null}
          </Center>
        </Stack>
      </Box>
    </Center>
  );
};

export default Blog;
