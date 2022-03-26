import Head from 'next/head'
import Layout, { siteTitle } from '@components/layout'
import { getSortedPostsData } from '@lib/posts'
import { Button, Container, Heading, VStack } from '@chakra-ui/react'
import Entry from './entry/index'

export default function Home({ allPostsData }) {
  return <Entry />
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData,
    },
  }
}
