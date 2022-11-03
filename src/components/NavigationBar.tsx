import { Flex, Box, Text, Button, Link, Divider } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useCurrentUserQuery, useLogoutMutation } from '../generated/graphql';
import { DarkModeSwitch } from './DarkModeSwitch';
import { useApolloClient } from '@apollo/client';

interface NavigationBarProps {}

const NavigationBar = ({}: NavigationBarProps) => {
  const apolloClient = useApolloClient();
  const { data } = useCurrentUserQuery({});
  const [logout] = useLogoutMutation();
  let body = null;

  if (!data?.currentUser) {
    body = (
      <>
        <Box ml="650px">
          <NextLink href="/register">
            <Button colorScheme="blue">Register</Button>
          </NextLink>
        </Box>

        <Box ml="5px">
          <NextLink href="/login">
            <Button colorScheme="blue">Login</Button>
          </NextLink>
        </Box>

        <Box ml="5px">
          <DarkModeSwitch />
        </Box>
      </>
    );
  } else {
    body = (
      <>
        <Box ml="595px">
          <NextLink href={'/user-posts'}>
            <Link fontSize="xl">{data.currentUser.username}</Link>
          </NextLink>
        </Box>

        <Box ml="15px">
          <NextLink href="/create-post">
            <Button colorScheme="blue">Create</Button>
          </NextLink>
        </Box>

        <Box ml="5px">
          <NextLink href="/">
            <Button
              colorScheme="blue"
              onClick={async () => {
                await logout();
                await apolloClient.resetStore();
              }}
            >
              Logout
            </Button>
          </NextLink>
        </Box>

        <Box ml="5px">
          <DarkModeSwitch />
        </Box>
      </>
    );
  }

  return (
    <Box mt="10px">
      <Flex align="center">
        <Box ml="225px">
          <NextLink href="/">
            <Link fontSize="3xl">Blogging</Link>
          </NextLink>
        </Box>

        {body}
      </Flex>

      <Divider w="1000px" h="1px" m="auto" bgColor="black" mt="10px" />
    </Box>
  );
};

export default NavigationBar;
