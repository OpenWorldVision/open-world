import Head from 'next/head'
import Layout, { siteTitle } from '@components/layout'
import { Button, Container, Heading, VStack } from '@chakra-ui/react'
import Entry from './entry/index'

export default function Home({ allPostsData }) {
  return <Entry />
}
