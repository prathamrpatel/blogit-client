import { Flex, Button } from '@chakra-ui/react';
import Post from '../components/Post';
import { useCurrentUserQuery, usePostsQuery } from '../generated/graphql';
import { NextPage } from 'next';
import Welcome from '../components/Welcome';
import NavBar from '../components/NavBar/NavBar';
import BlogCard from '../components/BlogCard';

interface IndexProps {}

const Index: NextPage = ({}: IndexProps) => {
  const { data: currentUserData } = useCurrentUserQuery();
  const { data, fetchMore } = usePostsQuery({
    variables: {
      take: 15,
      cursor: null,
    },
  });

  if (!data?.posts) {
    // Use the UI 404 template
    return <div>posts could not be loaded</div>;
  }

  return (
    <Flex direction="column">
      <NavBar />

      {currentUserData?.currentUser ? (
        <Flex direction="column" align="center">
          {data.posts.posts.map((post) => (
            <BlogCard post={post} key={post.id} />
          ))}
          {data.posts.hasMore ? (
            <Button
              mt="40px"
              mb="40px"
              onClick={() => {
                fetchMore({
                  variables: {
                    take: 15,
                    cursor:
                      data.posts.posts[data.posts.posts.length - 1].createdAt,
                  },
                });
              }}
            >
              Load More
            </Button>
          ) : null}
        </Flex>
      ) : (
        <Welcome />
      )}
    </Flex>
  );
};

export default Index;
