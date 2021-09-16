import { useState, useEffect } from "react"
import styled, { ThemeProvider, keyframes }  from "styled-components";
import { useRouter } from 'next/router'
import { lightTheme, darkTheme, GlobalStyles } from "./ThemeConfig" 
import DarkModeToggle from 'react-dark-mode-toggle'

function MyApp({ Component, pageProps }) {
  const [theme, setTheme] = useState("light") 
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState(() => false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const handleStart = () => { setLoading(true); };
    const handleComplete = () => { setLoading(false); };
    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);
  }, [router]);

  const toggleTheme = () => {
    theme == 'light' ? setTheme('dark') : setTheme('light');
  }

  return (
    <ThemeProvider theme={theme == 'light' ? lightTheme : darkTheme}>
      <GlobalStyles />
       {loading ? (<Loader />) : ( 
        <>
            <Theme onClick={toggleTheme}>
          <DarkModeToggle
          onChange={setIsDarkMode}
          checked={isDarkMode}
          size={80}
          />
        </Theme>
        <Component {...pageProps} />
      
        </>
       )}
    </ThemeProvider>
  ) 
}

const spin = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`

const Loader = styled.div`
  border: 0.2em solid rgba(0, 0, 0, 0.1);
  border-top: 0.2em solid #767676;
  border-radius: 50%;
  position: absolute;
  top: 25%;
  left: 40%;
  width: 15.0rem;
  height: 15.0rem;
  animation: ${spin} 0.6s linear infinite;
  
`
const Theme = styled.figure`
  background: none;
  outline: none;
  border: none;
  position: absolute;
  top: 0;
  right: 0;
`
export default MyApp