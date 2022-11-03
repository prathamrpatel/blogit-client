import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Box, IconButton } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useDeletePostMutation } from '../generated/graphql';
import NextLink from 'next/link';

interface EditDeleteButtonsProps {
  postId: number;
}

const EditDeleteButtons = ({ postId }: EditDeleteButtonsProps) => {
  const router = useRouter();
  const [deletePost] = useDeletePostMutation();

  return (
    <>
      <Box mt="5px" mr="15px">
        <NextLink
          href={
            router.pathname.includes('/post/[id]')
              ? `edit/${postId}`
              : `post/edit/${postId}`
          }
        >
          <IconButton
            icon={<EditIcon />}
            aria-label="Edit post"
            colorScheme="gray"
            variant="solid"
          />
        </NextLink>
      </Box>

      <Box mt="5px">
        <IconButton
          icon={<DeleteIcon />}
          aria-label="Delete post"
          colorScheme="red"
          variant="solid"
          onClick={() => {
            deletePost({
              variables: { postId },
              update: (cache) => {
                cache.evict({ id: 'Post:' + postId });
              },
            });
            router.push('/');
          }}
        />
      </Box>
    </>
  );
};

export default EditDeleteButtons;
