import { useState } from 'react'
import axios from './utils/axios'

function App() {
  const [file, setFile] = useState()
  const [progress, setProgress] = useState()


  const send = e => {
    e.preventDefault()
    const data = new FormData()
    data.append('file', file)
    axios.post('/upload', data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (data) => {
        setProgress(Math.round(100 * (data.loaded / data.total)))
      }})
      .then(res => console.log(res))
      .catch(e => console.log(e) )
  }

  return (
    <>
      <form onSubmit={send} >
        <input type="file" name='file' onChange={e => setFile(e.target.files[0])} />
        {( progress !== 0 && progress !== 100 ) && <p>{progress}</p>}
        <button type="submit" >send</button>
      </form>
    </>
  )
}

export default App
