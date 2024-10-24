import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import AuthPage from './pages/AuthPage'
import Dashboard from './pages/Dashboard'
import HomeNavbar from './components/HomeNavbar'
import CreateNewPost from './pages/CreateNewPost'
import { Provider } from 'react-redux'
import store from './store'
import BlogPostPage from './pages/BlogPostPage'
import ReqAuth from './components/ReqAuth'

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='*' element={<AuthPage />} />
          <Route element={<ReqAuth />}>
            <Route element={<HomeNavbar />}>
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/create' element={<CreateNewPost />} />
              <Route path='/posts/:post_id' element={<BlogPostPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}