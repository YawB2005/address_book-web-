import {useState} from 'react';
import {auth} from '../firebase';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [isLogin, setIsLogin] = useState(true)
    const navigate = useNavigate();

    //Function for creating the contact
    const CreateAccount = async (e) => {
        e.preventDefault();
        try {
          //Creating account here using the built-in firebase function createUserWithEmailAndPassword
            const userData = await createUserWithEmailAndPassword(auth, email, password);
            setUser(userData.user)
            navigate('/home');
        } catch (error) {
            console.error('Error signing up:', error)
        }
    }

    //Function for handling the logging in of the contact
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
          //Signing in here using the built-in firebase function signInWithEmailAndPassword
            const userData = await signInWithEmailAndPassword(auth, email, password);
            setUser(userData.user);
            navigate('/home');
            alert("Welcomeee")
        } catch (error) {
            console.error('Error signing up:', error)
        }
    }
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-center text-2xl font-bold text-gray-800">
          Login to Your Account
        </h2>
        <form className="mt-8 space-y-6"
        onSubmit ={isLogin ? handleLogin : CreateAccount}
        >
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                value = {email}
                onChange = {(e) => setEmail(e.target.value)}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value = {password}
                onChange = {(e) => setPassword(e.target.value)}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">

            {/* <div className="text-center">
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                Forgot your password?
              </a>
            </div> */}
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isLogin ? 'Log In': 'Sign Up'}
            </button>

            <button
              type="button"
              onClick = {() => setIsLogin(!isLogin)}
              className = "text-blue-600 hover:underline"
            >
                {isLogin ? 'Create an Account': 'Already have an account'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
