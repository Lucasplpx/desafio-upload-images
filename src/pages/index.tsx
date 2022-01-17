import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

type ImageParams = {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
};

export default function Home(): JSX.Element {
  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    'images',
    async ({ pageParam = 0 }) => {
      const response = await api.get('images', {
        params: {
          after: pageParam,
        },
      });

      return response.data;
    },
    {
      getNextPageParam: (lastPage, pages) => lastPage.after,
    }
  );

  const formattedData = useMemo<ImageParams[]>(() => {
    return data?.pages.map<ImageParams[]>(image => image.data).flat();
  }, [data]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />

        {hasNextPage && !isFetchingNextPage && (
          <Button mt={10} onClick={() => fetchNextPage()}>
            Carregar mais
          </Button>
        )}

        {isFetchingNextPage && <Button mt={10}>Carregando...</Button>}
      </Box>
    </>
  );
}
