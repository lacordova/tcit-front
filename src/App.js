import PostsList from "./components/PostsList";
import PostForm from "./components/PostForm"
import { Container } from 'react-bootstrap';

function App() {
    return (
    <Container>
      <PostsList/>
      <PostForm/>
    </Container > 
)}

export default App;
