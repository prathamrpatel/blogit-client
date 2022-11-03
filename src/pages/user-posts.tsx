import { Flex, Text } from '@chakra-ui/react';
import NavigationBar from '../components/NavigationBar';
import Post from '../components/Post';
import { useGetPostsByUserQuery } from '../generated/graphql';
import { useIsAuth } from '../util/useIsAuth';

interface UserPostsProps {}

const UserPosts = ({}: UserPostsProps) => {
  useIsAuth();
  const { data, refetch } = useGetPostsByUserQuery();

  refetch();

  return (
    <>
      <NavigationBar />

      <Flex direction="column" align="center">
        <Text fontSize="2xl" mt="20px" mb="20px">
          Your Posts
        </Text>
        {data?.getPostsByUser.map((post) => (
          <Post post={post} key={post.id} />
        ))}
      </Flex>
    </>
  );
};

export default UserPosts;
