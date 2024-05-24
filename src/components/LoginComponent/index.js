'use client';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import EmailInput from '../Common/Inputs/EmailInput';
import PasswordInput from '../Common/Inputs/PasswordInput';
import { validateEmail } from '../Common/Inputs/EmailInput/validateEmail';
import { useProtectedToken, useLoginUser } from '@/hooks/useVerification';
import Loading from '../Common/LoadingAndError/Loading';
import { useUserLoggedIn } from '@/store';
import { useQueryClient } from 'react-query';
import { useNotification } from '@/hooks/useNotification';

export default function LoginComponent() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { setUserLoggedInData } = useUserLoggedIn(state => state);
  const {
    mutate: sendUserData,
    data: loginData,
    isError,
    error,
    isLoading,
    isSuccess,
  } = useLoginUser();
  const [state, setState] = useState({
    emailAddress: '',
    password: '',
  });
  const authenticationToken = useProtectedToken();
  const { tokenIsProtected } = queryClient.getQueryData('protected');

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

  const succeedFunction = () => {
    setUserLoggedInData({
      token: loginData.token,
      isLogin: isSuccess,
      loginMessage: loginData?.message,
    });
    localStorage.setItem(
      'user',
      JSON.stringify({ email: state.emailAddress, token: loginData.token })
    );
    router.push('/');
  };

  useEffect(() => {
    useNotification(isError, error, isSuccess, succeedFunction);
  }, [isError, isSuccess]);

  useEffect(() => {
    if (tokenIsProtected) {
      router.push('/');
    }
  }, [tokenIsProtected]);

  return (
    <>
      {' '}
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
          {!isLoading ? 'Sign in' : <Loading />}
        </button>
      </div>
      <div className="text-sm text-center">
        <div className="font-semibold text-indigo-300 hover:text-indigo-500">
          <Link href="/forget-password">Forgot password?</Link>
        </div>
      </div>
    </>
  );
}
