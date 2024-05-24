'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import EmailInput from '../Common/Inputs/EmailInput';
import PasswordInput from '../Common/Inputs/PasswordInput';
import { validateEmail } from '../Common/Inputs/EmailInput/validateEmail';
import { useProtectedToken, useRegisterNewUser } from '@/hooks/useVerification';
import Loading from '../Common/LoadingAndError/Loading';
import { useUserLoggedIn } from '@/store';
import { useQueryClient } from 'react-query';
import { useNotification } from '@/hooks/useNotification';

export default function RegisterComponent() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { setUserLoggedInData } = useUserLoggedIn(state => state);
  const authenticationToken = useProtectedToken();
  const { tokenIsProtected } = queryClient.getQueryData('protected');
  const {
    mutate: sendNewUserData,
    data: registerData,
    isError,
    error,
    isLoading,
    isSuccess,
  } = useRegisterNewUser();
  const [state, setState] = useState({
    emailAddress: '',
    password: '',
    confirmPassword: '',
  });

  const handleEmailAddress = emailAddress => {
    setState(prevState => ({
      ...prevState,
      emailAddress: emailAddress.email.link,
    }));
  };

  const handlePassword = password => {
    setState(prevState => ({ ...prevState, password: password.password.link }));
  };

  const handleConfirmPassword = confirmPassword => {
    setState(prevState => ({
      ...prevState,
      confirmPassword: confirmPassword.password.link,
    }));
  };

  const canRegister = useMemo(
    () =>
      validateEmail(state.emailAddress) &&
      state.password.length >= 8 &&
      state.password === state.confirmPassword,
    [state]
  );

  const handleRegister = event => {
    event.preventDefault();
    sendNewUserData({
      email: state.emailAddress,
      password: state.password,
    });
  };

  const succeedFunction = () => {
    setUserLoggedInData({
      token: loginData.token,
      isLogin: isSuccess,
      loginMessage: loginData?.message,
    });
    localStorage.setItem(
      'user',
      JSON.stringify({ email: state.emailAddress, token: registerData.token })
    );
    router.push('/');
  };

  useEffect(() => {
    useNotification(isError, error, isSuccess, succeedFunction, router);
  }, [isError, isSuccess]);

  useEffect(() => {
    if (tokenIsProtected) {
      router.push('/');
    }
  }, [tokenIsProtected]);

  return (
    <>
      <EmailInput
        title="Email address"
        placeholder="Email"
        value={state.emailAddress}
        setValue={handleEmailAddress}
        isLoginPage={true}
      />
      <PasswordInput
        title="Password"
        placeholder="Password"
        value={state.password}
        setValue={handlePassword}
        isLoginPage={true}
      />
      <PasswordInput
        title="Confirm Password"
        placeholder="Password"
        value={state.confirmPassword}
        setValue={handleConfirmPassword}
        isLoginPage={true}
      />

      <div>
        <button
          disabled={!canRegister}
          onClick={handleRegister}
          type="submit"
          className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
            canRegister
              ? 'bg-indigo-600 text-white hover:bg-indigo-500'
              : 'bg-gray-500 text-gray-400 cursor-not-allowed'
          }`}
        >
          {!isLoading ? 'Sign up' : <Loading />}
        </button>
      </div>
    </>
  );
}
