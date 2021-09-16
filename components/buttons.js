import { FcLike, FcIdea } from 'react-icons/fc'
import { FaDownload, FaFacebook, FaTwitter, FaInstagramSquare } from 'react-icons/fa'
import styled  from 'styled-components'
import { useState } from 'react'

const imgButtons = ({abbreviateNumber, tattoo}) => {
    const [likes, setLike] = useState(tattoo.likes)
    const [wants, setWants] = useState(tattoo.wants)
    let [isLiked, setLiked] = useState(false)
    let [isWanted, setWanted] = useState(false)

    const handleLike = async (id) => {
        setLiked(!isLiked)       
        if(isLiked === true) {
            setLike(likes - 1)
        } else {
            setLike(likes + 1)
        }
        const body = {
            id : id,
            payload: isLiked === true ? - 1 : 1
        }
        await fetch(`/api/tattoo/${id}`, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: 'PUT',
          body: JSON.stringify(body)
        })
      }

    const handleWant = async (id) => {
        setWanted(!isWanted)
        if(isWanted === true) {
            setWants(wants - 1)
        } else {
            setWants(wants + 1)
        }
        const body = {
            id: id,
            payload: isWanted === true ? -1 : 1
        }
        await fetch(`/api/tattoo/${id}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type' : 'application/json'
            },
            method: 'PATCH',
            body: JSON.stringify(body)
        })
    }
    
    return (
        <Buttons>
        <Button
          style={isLiked ? {opacity: 0.3} : {opacity: 1}}
          data-tip="Love It!" 
          onClick={() => handleLike(tattoo._id)}>
          <FcLike /><strong>{abbreviateNumber(likes)}</strong>
        </Button>
        <Button
          style={isWanted ? {opacity: 0.3} : {opacity: 1}}
          data-tip="New Tat Idea" 
          onClick={() => handleWant(tattoo._id)}>
          <FcIdea /><strong>{abbreviateNumber(wants)}</strong>
        </Button>
        <Button data-tip="Download">
            <a href={tattoo.image}>
             <FaDownload style={{"color" : "green"}} />
            </a>
        </Button>
        <Button data-tip="Share to Facebook"><FaFacebook style={{"color" : "#3b5998"}} /></Button>
        <Button data-tip="Share to Instagram"><FaInstagramSquare/></Button>
        <Button data-tip="Share to Twitter"><FaTwitter style={{"color" : "#1DA1F2"}} /></Button>
      </Buttons>
    )
}

export default imgButtons

const Buttons = styled.div`
  width: 100%;
  margin: auto;
  background-color: white;
  box-sizing: border-box;
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
`

const Button = styled.button`
  color: black;
  border: none;
  background: none;
  outline: none;
  padding-top: 1%;
  font-size: 2rem;
`