import { useRef, useState } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { FaUpload } from 'react-icons/fa'
import { useS3Upload } from 'next-s3-upload'
import Head from 'next/head'

const newTat = () => {
  const { FileInput, openFileDialog, uploadToS3 } = useS3Upload();
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState()
  let caption = useRef();
  let router = useRouter();

  const handleFile = async (file) => {
    let { url } = await uploadToS3(file)
    setFile(url);
  }


  const handleSubmit  = async  (e) => {
    e.preventDefault();
    if(file) {
      const body = {
        caption : caption.current.value,
        image: file,
        likes: 0,
        wants: 0,
        created_at: Date.now()
      }
      fetch('/api/tattoo/tattoo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
      })
      router.push('/tattoo')
    } else {
      setMsg('An image is required')
      setTimeout(() => {
        setMsg(null)
      }, 1500)
    }
  }

  return (
    <>
      <Head>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <meta charSet="utf-8" />
            <title>TatzFeed | Upload</title>
            <meta name="description" content="Upload all of your favorite tattoos here!" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon.ico" />
      </Head>
      <Form onSubmit={handleSubmit} autoComplete="off">
        <FormTitle>Add Your Own Tattoo</FormTitle>
        <Text
          ref={caption}
          draggable="false"
          rows="4"
          maxLength="150"
          placeholder="Write a caption in 150 characters!"
          required 
        ></Text>
        {msg && <Error>{msg}</Error>}
        <Upload onClick={openFileDialog} htmlFor="image_url">
        <FileInput
          type="file"
          id="file"
          accept=".jpeg, .png, .jpg"
          onChange={handleFile}
        /><Fa style={{background: 'none', border: 'none'}}><FaUpload/></Fa></Upload>
        <Image id="img" src={file ? file : '/placeholder.png'} placeholder="Choose Some Files" alt={file? file.name : null} />
        <Submit type="submit" className="btn">
          Submit
        </Submit>
      </Form>
      </>
  )
}

const Error = styled.strong`
  margin: auto;
  margin-top: 0.5rem;
  display: block;
  color: rgba(255, 0, 0, 0.6);
  background-color: rgba(255, 0, 0, 0.1);
`

const Form = styled.form`
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  background-color: white;
  margin-top: 5rem;

  @media(min-width: 600px){
    width: 50%;
    height: auto;
    margin: auto;
    border: 0.5rem solid black;
  }
`
const FormTitle = styled.h1`
  text-align: center;
  font-size: 2rem;
  color: #000;
`

const Image = styled.img`
  margin: 1rem 0;
  height: 50%;
  width: 90%;

  @media (min-width:600px){
    height: 100%;
    width: 60%
  }
`

const Upload = styled.label`
  display: block;
  width: fit-content;
  color: black;
  cursor: pointer;
  margin: auto;
  text-align: center;
`
const Text = styled.textarea`
  width: 90%;
  margin: auto;
  outline: none;
  resize: none;
  font-size: 1rem;
`

const Input = styled.input`
  width: 90%;
  font-size: 1rem;
`

const Fa = styled(FaUpload)`
  background-color: #f1f1f1;
  padding: 0.6rem;
  height: 50px;
  width: 100%;
  border-radius: 0.5rem;
  border: 1px solid black;
  outline: black
`

const Submit = styled.button`
  border: none;
  width: 100%;
  font-size: 2rem;
  padding: 1rem;
  color: white;
  background-color: #515151;

  &:hover {
    background-color #000000;
    background-image linear-gradient(315deg, #000000 0%, #7f8c8d 74%);
    color: white;
  }

  &:active {
    background-color #000000;
    background-image linear-gradient(315deg, #000000 0%, #7f8c8d 74%);
    color: white;
  }
  
`

export default newTat