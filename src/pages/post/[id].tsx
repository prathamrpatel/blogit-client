import { useRouter } from 'next/router';
import { useCurrentUserQuery, usePostQuery } from '../../generated/graphql';
import NavigationBar from '../../components/NavigationBar';
import SinglePost from '../../components/SinglePost';
import { useIsAuth } from '../../util/useIsAuth';

interface PostProps {}

const Post = ({}: PostProps) => {
  useIsAuth();
  const router = useRouter();
  const { data } = usePostQuery({
    variables: {
      postId: Number(router.query.id),
    },
  });

  if (!data?.post) {
    return <div>Post not found</div>;
  }

  return (
    <>
      <NavigationBar />
      <SinglePost post={data.post} />
    </>
  );
};

export default Post;
