import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Form from '../components/Form';
import Table from '../components/Table';
import Header from '../components/Header';
import Footer from '../components/Footer';

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
      </main>
        <Footer />


    </div>
  )
}
