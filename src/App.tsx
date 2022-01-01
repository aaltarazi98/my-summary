import  {useState, useEffect}  from 'react';
import CssBaseline from '@mui/material/CssBaseline'
import theme from './theme'
import { ThemeProvider } from '@emotion/react';
import SetUp from './SetUp'
import Interface from './Interface'
import {Route, Routes, useNavigate} from 'react-router-dom'

function App() {
  const [setUp] = useState(JSON.parse(localStorage.getItem('setUp') || 'false'))
  const navigate: Function = useNavigate()

  useEffect(()=>{
    if (setUp){
      navigate('/Interface')
    }else{
      navigate('/SetUp')
    }
  },[])

  return (
    <ThemeProvider theme = {theme}>
      <CssBaseline enableColorScheme/>
      <Routes>
        <Route path="/Interface/*" element={<Interface/>}/>
        <Route path="/SetUp/*" element={<div className="setUp"><SetUp/></div>}/>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
