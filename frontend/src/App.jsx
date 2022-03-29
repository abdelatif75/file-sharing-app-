import { useState } from 'react'
import axios from './utils/axios'
import Progress from './components/progress'
import {useDropzone} from 'react-dropzone';
import styled from 'styled-components';


function App() {
  const [progress, setProgress] = useState(0)

  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
    acceptedFiles
  } = useDropzone({maxFiles: 1});

  let files = acceptedFiles.map(file => <li key={file.path}>{file.path}</li>)

  const send = e => {
    e.preventDefault()
    const data = new FormData()
    data.append('file', acceptedFiles[0])
    axios.post('/upload', data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (data) => {
        setProgress(Math.round(100 * (data.loaded / data.total)))
      }})
      .catch(e => console.log(e) )
  }

  return (
    <>
      <form onSubmit={send} >
        <div className="container">
          <Container {...getRootProps({isFocused, isDragAccept, isDragReject})}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop some files here, or click to select files</p>
          </Container>
          <File>
            {files}
          </File>
        </div>
        <div>
          {( progress !== 0 && progress !== 100 ) && <Progress done={`${progress}`}/>}
        </div>
        <button type="submit" style={{
          border: 'none',
          backgroundColor: '#2196f3',
          padding: '20px 100px',
          width: '100%'
        }}>send</button>
      </form>
    </>
  )
}

export default App

const getColor = (props) => {
  if (props.isDragAccept) {
      return '#00e676';
  }
  if (props.isDragReject) {
      return '#ff1744';
  }
  if (props.isFocused) {
      return '#2196f3';
  }
  return '#eeeeee';
}

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${props => getColor(props)};
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border .24s ease-in-out;
`;

const File = styled.ul`
  list-style: none;
  list-style-type: none;
  list-style-position: inside;
  li{
    color: #f06406;
  }
`