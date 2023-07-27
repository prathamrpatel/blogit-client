import { useRouter } from 'next/router';
import { useCurrentUserQuery, usePostQuery } from '../../generated/graphql';
import NavBar from '../../components//NavBar/NavBar';
import SinglePost from '../../components/SinglePost';
import { useIsAuth } from '../../util/useIsAuth';
import Blog from '../../components/Blog';

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
      <NavBar />
      <Blog
        postId={data.post.id}
        title={data.post.title}
        body={data.post.body}
        authorId={data.post.authorId}
      />
    </>
  );
};

export default Post;
