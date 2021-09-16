import fetch from 'isomorphic-unfetch'
import {  useState } from 'react'
import ReactToolTip from 'react-tooltip'
import styled from 'styled-components'
import Head from 'next/head'
import Link from 'next/link'
import dynamic from 'next/dynamic'
const Buttons = dynamic(() => import('../components/buttons'))

const Tattoo = ({data}) => {
  let [isVisible, setVisible] = useState(false)
  setTimeout(() => {
    setVisible(true)
  }, 100)

  const showCap = async (tattoo) => {
    const caption = document.getElementById(tattoo._id);
    caption.setAttribute("style", "display:block")
  }

  const hideCap = async (tattoo) => {
    const caption = document.getElementById(tattoo._id);
    caption.setAttribute("style", "display: none");
  }

  //Abbreviates Likes and Wants for convenience
  const abbreviateNumber = (number) => {
    const SI_SYMBOL = ["", "k", "M", "G", "T", "P", "E"];
    const tier = Math.log10(Math.abs(number)) / 3 | 0;
    if(tier == 0) return number;
    const suffix = SI_SYMBOL[tier];
    const scale = Math.pow(10, tier * 3);
    const scaled = number / scale;
    return scaled.toFixed(0) + suffix;
  }

   return (
       <Page>
         <Head>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <meta charSet="utf-8" />
          <title>TatzFeed</title>
          <meta name="description" content="A collaboration of many tattoos from around the world" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon.ico" />
        </Head>
          <Link href="/newTat">
                <Submit>Add Your Ink!</Submit>
          </Link>    
            {data.sort((a,b) => b.created_at - a.created_at).map((tattoo, index) => {
              return (
               <Tattoos
                  onMouseEnter={() => showCap(tattoo)}
                  onMouseLeave={() => hideCap(tattoo)}
                  key={index}>
                  <Image
                  src={tattoo.image}
                  alt={tattoo.tag}
                   />
                   <Caption id={tattoo._id}>{tattoo.caption}</Caption>
                   <Buttons 
                   abbreviateNumber={abbreviateNumber} 
                   tattoo={tattoo} />
                   {isVisible === true && <ReactToolTip />}
               </Tattoos>
              )  
            })}
        </Page>
    )
}

export default Tattoo


const Caption = styled.figcaption`
  display: block;
  text-align: center;
  color: white;
  background-color: rgba(0, 0, 0, 0.3);

  @media(min-width: 1024px){
    display: none;
    border-radius: 1rem;
    position: absolute;
    bottom: 30%;
    width: 100%;
  }
`

const Image = styled.img`
  width: 100%;
  height: 90%;
  border-top-right-radius: 1rem;
  border-top-left-radius: 1rem;

  @media(min-width:1024px){
    height: 15rem;
    margin: auto;
  }
`

const Page = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5rem;

  @media(min-width: 1024px){
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;
  }
`

const Submit = styled.a`
  padding: 0.5rem;
  margin: 1rem;
  font-size: 1.5rem;
  position: absolute;
  box-shadow: 0 0 2px 1px;
  left: 0;
  top: 0;
  border-radius: 0.5rem;
  color: black;
  text-align: center;
  border: 1px solid black;
  text-decoration: none;
  background-color: #008000ab;
  cursor: pointer;

  &:hover {
    color: white;
  }
`

const Tattoos = styled.figure`
  background-color: #000;
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 100%;
  height: auto;
  margin: auto;
  margin-top: 1rem;
  position: relative;
  border-radius: 1rem;
  border: 0.2rem ridge;

  @media(min-width: 600px){
    width: 50%;
  }

  @media(min-width: 1000px) {
    width: 30%;
    margin-top: 1rem;
  }

  @media(min-width: 1200px) {
    width: 20%;
  }
`

export async function getStaticProps() {
  const res = await fetch("http://localhost:3000/api/tattoo/tattoo");
  const json = await res.json();
  return {
    props: {
      data: json,
    },
  };
}
