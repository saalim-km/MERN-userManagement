import Login from './components/Login'
import { Toaster } from 'react-hot-toast'

const App = () => {
  return (
    <div>
      <Toaster position='top-right' reverseOrder={false}/>
      <Login/>
    </div>
  )
}

export default App
