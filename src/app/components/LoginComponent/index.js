import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import EmailInput from '../Common/Inputs/EmailInput';
import PasswordInput from '../Common/Inputs/PasswordInput';
import { validateEmail } from '../Common/Inputs/EmailInput/validateEmail';
import { useProtectedRoute, useLoginUser } from '@/app/hooks/useVerification';
import { notifyError, notifyWarning } from '../Common/Notify';
import Loading from '../Common/LoadingAndError/Loading';
import { useUserLoggedIn } from '@/store';

export default function LoginComponent() {
  const router = useRouter();
  const { setUserLoggedInData } = useUserLoggedIn(state => state);
  const {
    mutate: sendUserData,
    data: loginData,
    isError: isLoginErrored,
    error: loginError,
    isLoading: isLoginLoading,
    isSuccess: isLoginSucceed,
  } = useLoginUser();
  const [state, setState] = useState({
    emailAddress: '',
    password: '',
  });
  const [token, setToken] = useState('');
  const authenticationToken = useProtectedRoute(token);

  const handleEmailAddress = emailAddress => {
    setState(prevState => ({
      ...prevState,
      emailAddress: emailAddress.email.link,
    }));
  };

  const handlePassword = password => {
    setState(prevState => ({ ...prevState, password: password.password.link }));
  };

  const canLogin = useMemo(
    () => validateEmail(state.emailAddress) && state.password.length >= 8,
    [state]
  );

  const handleLogin = event => {
    event.preventDefault();
    sendUserData({ email: state.emailAddress, password: state.password });
  };

  useEffect(() => {
    if (isLoginErrored) {
      const { status: loginErrorStatus, data: loginErrorData } =
        loginError?.response;

      if (loginErrorStatus === 401) {
        notifyWarning(loginErrorData?.error);
      } else if (loginErrorStatus === 404 || loginErrorStatus === 500) {
        notifyError(loginErrorData?.error);
      }
    } else if (isLoginSucceed) {
      setUserLoggedInData({
        token: loginData.token,
        isLogin: isLoginSucceed,
        loginMessage: loginData?.message,
      });
      localStorage.setItem(
        'user',
        JSON.stringify({ email: state.emailAddress, token: loginData.token })
      );
      router.push('/');
    }
  }, [isLoginErrored, isLoginSucceed]);

  useEffect(() => {
    const userStore = localStorage.getItem('user');
    const userData = JSON.parse(userStore);
    if (!!userData?.token) {
      setToken(userData?.token);
      setTimeout(() => {}, 1000);
      // console.log(authenticationToken);
      // router.push('/');
    }
  }, []);

  return (
    <section className="max-w-3xl mx-auto bg-gray-100 rounded-2xl border-4 border-gray-700 print:border-0 page print:max-w-letter print:max-h-letter print:mx-0 print:my-o xsm:p-8 print:bg-white md:h-letter lg:h-letter">
      {/*
          This example requires updating your template:
  
          ```
          <html class="h-full bg-white">
          <body class="h-full">
          ```
        */}
      <div className="flex bg-gray-700 h-[60vh] w-[60vh] flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-300">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <EmailInput
              title="Email address"
              placeholder="Email"
              value={state.emailAddress}
              setValue={handleEmailAddress}
              isLoginPage={true}
            />
            <PasswordInput
              title="Password"
              placeholder="Email"
              value={state.password}
              setValue={handlePassword}
              isLoginPage={true}
            />

            <div>
              <button
                disabled={!canLogin}
                onClick={handleLogin}
                type="submit"
                className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
                  canLogin
                    ? 'bg-indigo-600 text-white hover:bg-indigo-500'
                    : 'bg-gray-500 text-gray-400 cursor-not-allowed'
                }`}
              >
                {!isLoginLoading ? 'Sign in' : <Loading />}
              </button>
            </div>

            <div className="text-sm text-center">
              <div className="font-semibold text-indigo-300 hover:text-indigo-500">
                <Link href="/forget-password">Forgot password?</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
