import { Flex, Button } from '@chakra-ui/react';
import NavigationBar from '../components/NavigationBar';
import Post from '../components/Post';
import { usePostsQuery } from '../generated/graphql';

interface IndexProps {}

const Index = ({}: IndexProps) => {
  const { data, fetchMore } = usePostsQuery({
    variables: {
      take: 15,
      cursor: null,
    },
  });

  if (!data?.posts) {
    return <div>posts could not be loaded</div>;
  }

  return (
    <Flex direction="column">
      <NavigationBar />

      <Flex direction="column" align="center">
        {data.posts.posts.map((post) => (
          <Post post={post} key={post.id} />
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
    </Flex>
  );
};

export default Index;
