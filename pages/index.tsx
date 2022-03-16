import Head from 'next/head'
import Layout, { siteTitle } from '@components/layout'
import { getSortedPostsData } from '@lib/posts'
import { Button, Container, Heading, VStack } from '@chakra-ui/react'

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <VStack>
        <Heading>Open World</Heading>
        <Container>
          <Button>Play Now</Button>
        </Container>
      </VStack>
    </Layout>
  )
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData,
    },
  }
}
