import './App.css';
import ToDoApp from './pages/ToDoApp';
import { BrowserRouter, Routes , Route } from 'react-router-dom';


function App() {
  return (
    <div>
      <ToDoApp/>
    </div>
    // <BrowserRouter basename='/en'>
    //   <Routes>
    //     <Route path="/home" element={"Hello"}/>{''}
    //     <Route path="/test" element={<p>Test page route</p>}/>

    //   <Route path="/blog" element={<p>Blog</p>}/>
    //    <Route path="/blog/:slug" element={<p>Blog Post</p>}/> 
    //    {/* http://localhost:3000/en/blog/blog_post_slug */}

    //   </Routes>
    //   {/* <ToDoApp/> */}
    // </BrowserRouter>
  );
}

export default App;
