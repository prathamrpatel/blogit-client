import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Avatar,
  useColorModeValue,
  useMediaQuery,
  Link,
} from '@chakra-ui/react';
import { Post } from '../generated/graphql';
import IdentityIcon from './IdentityIcon';
import NextLink from 'next/link';
import EditDeleteButtons from './EditDeleteButtons';

interface BlogCardProps {
  post: Omit<Post, 'body'>;
}

export default function BlogCard({ post }: BlogCardProps) {
  const [isLargerThan800] = useMediaQuery('(min-width: 800px)');
  const [isLargerThan500] = useMediaQuery('(min-width: 500px)');

  return (
    <Center py={6}>
      <Box
        minW={isLargerThan800 ? '700px' : isLargerThan500 ? '450px' : '300px'}
        maxW={isLargerThan800 ? '700px' : isLargerThan500 ? '450px' : '300px'}
        w={'full'}
        // eslint-disable-next-line react-hooks/rules-of-hooks
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'md'}
        p={6}
        overflow={'hidden'}
      >
        <Stack>
          <Text
            colorScheme="pink"
            color={'pink.400'}
            textTransform={'uppercase'}
            fontWeight={800}
            fontSize={'sm'}
            letterSpacing={1.1}
          >
            Blog
          </Text>
          <NextLink href={`post/${post.id}`}>
            <Heading
              // eslint-disable-next-line react-hooks/rules-of-hooks
              color={useColorModeValue('gray.700', 'white')}
              fontSize={'2xl'}
              fontFamily={'body'}
              as={Link}
            >
              {post?.title}
            </Heading>
          </NextLink>

          <Box maxH="100px" minH="50px" overflow={'hidden'}>
            <Text color={'gray.500'}>{post.bodySnippet}</Text>
          </Box>
        </Stack>
        <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
          {/* <Avatar
          // bgImg={<IdentityIcon />}
          // src={'https://avatars.githubusercontent.com/u/47313528?v=4'}
          /> */}
          <IdentityIcon
            username={post.author.username}
            width="50px"
            style={{ border: '2px solid black', borderRadius: '50%' }}
          />
          <Stack direction={'column'} spacing={0} fontSize={'sm'}>
            <Text fontWeight={600}>{post.author.username}</Text>
            <Text color={'gray.500'}>
              {new Date(post.createdAt).toLocaleString()} · 5min read
            </Text>
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
}
