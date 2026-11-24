import { useContext, useEffect, useState } from 'react'
import loginImg from '../assets/login.png'
import { ShopContext } from '../context/ShopContext'
import { showError } from '../utils/notifications'
import { setStoredToken } from '../utils/storage'
import { STATES } from '../constants/states'
import { loginUser, registerUser } from '../services/userService'

/**
 * Muestra el formulario para iniciar sesión o crear una cuenta.
 * Al autenticar al usuario, guarda su token y redirige a la página principal.
 */
const Login = () => {
  const { token, setToken, navigate, getUserCart } = useContext(ShopContext)

  const [currentState, setCurrentState] = useState(STATES.LOGIN)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  /**
   * Envía las credenciales o los datos de registro según el estado del formulario.
   *
   * @param event - Evento de envío del formulario.
   */
  const onSubmitHandler = async (event) => {
    event.preventDefault()

    try {
      if (currentState === STATES.SIGN_UP) {
        const response = await registerUser({
          name,
          email,
          password,
        })

        if (response.data.success) {
          setToken(response.data.token)
          setStoredToken(response.data.token)
        } else {
          showError(response.data.message)
        }
      } else {
        const response = await loginUser({
          email,
          password,
        })

        if (response.data.success) {
          setToken(response.data.token)
          setStoredToken(response.data.token)

          await getUserCart(response.data.token)
        } else {
          showError(response.data.message)
        }
      }
    } catch (error) {
      console.error(error)

      showError(error.message)
    }
  }

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token])

  return (
    <section className="absolute top-0 left-0 h-full w-full z-50 bg-white">
      <div className="flex h-full w-full">
        <div className="w-1/2 hidden sm:block">
          <img src={loginImg} alt="" className="object-cover aspect-square h-full w-full" />
        </div>
        <div className="flex w-full sm:w-1/2 items-center justify-center">
          <form
            onSubmit={onSubmitHandler}
            className="flex flex-col items-center w-[90%] sm:max-w-md m-auto gap-y-5 text-gray-800"
          >
            <div className="w-full mb-4">
              <h3 className="bold-36">
                {currentState === STATES.LOGIN ? STATES.LOGIN : STATES.SIGN_UP}
              </h3>
            </div>
            {currentState === STATES.SIGN_UP && (
              <div className="w-full">
                <label htmlFor="name" className="medium-14">
                  Name
                </label>
                <input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  type="text"
                  placeholder="Name"
                  className="w-full px-3 py-1 ring-1 ring-slate-900/10 rounded-sm bg-primary mt-1"
                />
              </div>
            )}
            <div className="w-full">
              <label htmlFor="email" className="medium-14">
                Email
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="Email"
                className="w-full px-3 py-1 ring-1 ring-slate-900/10 rounded-sm bg-primary mt-1"
              />
            </div>
            <div className="w-full">
              <label htmlFor="password" className="medium-14">
                Password
              </label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="Password"
                className="w-full px-3 py-1 ring-1 ring-slate-900/10 rounded-sm bg-primary mt-1"
              />
            </div>
            <button type="submit" className="btn-dark w-full mt-5 py-1.75! rounded-sm!">
              {currentState === STATES.SIGN_UP ? STATES.SIGN_UP : STATES.LOGIN}
            </button>
            <div className="w-full flex flex-col gap-y-3 medium-14">
              <div className="underline">Forgot your password?</div>
              {currentState === STATES.LOGIN ? (
                <div className="underline">
                  Don't have an account?
                  <span onClick={() => setCurrentState(STATES.SIGN_UP)} className="cursor-pointer">
                    {' '}
                    Create account
                  </span>
                </div>
              ) : (
                <div className="underline">
                  Already have an account?
                  <span onClick={() => setCurrentState(STATES.LOGIN)} className="cursor-pointer">
                    {' '}
                    Login
                  </span>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Login
