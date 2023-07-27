import { Flex, Text } from '@chakra-ui/react';
import NavBar from '../components/NavBar/NavBar';
import Post from '../components/Post';
import { useGetPostsByUserQuery } from '../generated/graphql';
import { useIsAuth } from '../util/useIsAuth';
import BlogCard from '../components/BlogCard';

interface UserPostsProps {}

const UserPosts = ({}: UserPostsProps) => {
  useIsAuth();
  const { data, refetch } = useGetPostsByUserQuery();

  refetch();

  return (
    <>
      <NavBar />

      <Flex direction="column" align="center">
        <Text fontSize="2xl" mt="20px" mb="20px">
          Your Posts
        </Text>
        {data?.getPostsByUser.map((post) => (
          <BlogCard post={post as any} key={post.id} />
        ))}
      </Flex>
    </>
  );
};

export default UserPosts;
