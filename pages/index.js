import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Form from '../components/Form';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {Text} from "@chakra-ui/react"


export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>EasyFresh101</title>
        <meta name="description" content="Easy Fresh Technologies 101" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.main}>
        <Form />
        
        < a href="/api/orders"
                 target="_blank"
                 rel="noopener noreferrer"
                >
                <Text
                  mt={2}
                  fontSize='md'
                  // fontWeight={'Bold'}
                  color={"blue.500"}
                  noOfLines={5}
              >
                  See All Orders
                                </Text>
                </a>

      </main>
      <Footer />


    </div>
  )
}
