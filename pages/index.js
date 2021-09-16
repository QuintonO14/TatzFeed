import Head from 'next/head'
import Link from 'next/link'
import styled from 'styled-components';

const Main = styled.main`
  display: flex;
  background-color: black;
  background: url('./tattoo.jpg') no-repeat center fixed;
  background-size: cover;
  position: relative;
  height: 100%;
  text-align: center;

  a {
    display: block;
    font-size: 3rem;
    text-decoration: none;
    margin: auto;
    color: white;
    padding: 1rem;
    background-color: #6d6d6d;
    background-image: linear-gradient(315deg, #2d3436 0% #d3d3d3 74%);
    border-radius: 1rem;
    border: 5px solid #000;

    &:hover {
      background-color: white;
      color: black;
    }
    
    &:active {
      background-color: white;
      color: black;
    }
  }
`

export default function Home() {
  return (
    <>
       <Head>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <meta charSet="utf-8" />
          <title>TatzFeed</title>
          <meta name="description" content="A collaboration of many tattoos from around the world" />
          <link rel="icon" type="image/png" sizes="16x16" 
          href="/favicon.ico" />
      </Head>
      <Main>
        <Link href="/tattoo">
          <a>Enter TatzFeed</a>
        </Link>         
      </Main>
    </>
  )
}
