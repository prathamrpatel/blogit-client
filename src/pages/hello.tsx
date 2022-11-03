import { useHelloQuery } from '../generated/graphql';

interface HelloProps {}

const Hello = ({}: HelloProps) => {
  const { data } = useHelloQuery();

  if (data) {
    return <div>{data.hello}</div>;
  } else {
    return <div>hello world</div>;
  }
};

export default Hello;
