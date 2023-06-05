import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import Header from './components/Header'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import HomeScreen from './screens/HomeScreen'
import ProtectedRoute from './routing/ProtectedRoute'
import './App.css'
import AdminDashboard from './screens/admin/AdminDashboard'
import AdminLogin from './screens/admin/AdminLogin'

function App() {
  return (
    <Router>
      <Header />
      <main className='container content'>
        <Routes>
          <Route path='/' element={<HomeScreen />} />
          <Route path='/login' element={<LoginScreen />} />
          <Route path='/register' element={<RegisterScreen />} />
          <Route element={<ProtectedRoute />}>
            <Route path='/user-profile' element={<ProfileScreen />} />
          </Route>
          <Route path='*' element={<Navigate to='/' replace />} />
          <Route path='/admin/' element={<AdminLogin />}/>
          <Route path='/admin/dashboard' element={<AdminDashboard />}/>
        </Routes>
      </main>
    </Router>
  )
}

export default App
