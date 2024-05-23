import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import EmailInput from '../Common/Inputs/EmailInput';
import PasswordInput from '../Common/Inputs/PasswordInput';
import { validateEmail } from '../Common/Inputs/EmailInput/validateEmail';
import { useProtectedToken, useRegisterNewUser } from '@/app/hooks/useVerification';
import Loading from '../Common/LoadingAndError/Loading';
import { notifyError, notifyWarning } from '../Common/Notify';
import { useUserLoggedIn } from '@/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useQueryClient } from 'react-query';

export default function RegisterComponent() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { setUserLoggedInData } = useUserLoggedIn(state => state);
  const authenticationToken = useProtectedToken();
  const { tokenIsProtected } = queryClient.getQueryData('protected');
  const {
    mutate: sendNewUserData,
    data: registerData,
    isError: isRegisterErrored,
    error: registerError,
    isLoading: isRegisterLoading,
    isSuccess: isRegisterSucceed,
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

  useEffect(() => {
    if (isRegisterErrored) {
      const { status: registerErrorStatus, data: registerErrorData } =
        registerError?.response;
      if (registerErrorStatus === 400) {
        notifyWarning(registerErrorData?.error);
        setTimeout(() => {
          router.push('/login');
        }, 3500);
      } else if (registerErrorStatus === 500) {
        notifyError(registerErrorData?.error);
      }
    } else if (isRegisterSucceed) {
      localStorage.setItem(
        'user',
        JSON.stringify({ email: state.emailAddress, token: registerData.token })
      );
      setUserLoggedInData({
        token: loginData.token,
        isLogin: isLoginSucceed,
        loginMessage: loginData?.message,
      });
      router.push('/');
    }
  }, [isRegisterErrored, isRegisterSucceed]);

  useEffect(() => {
    if (tokenIsProtected) {
      router.push('/');
    }
  }, [tokenIsProtected]);

  return (
    <section className="max-w-3xl mx-auto bg-gray-100 rounded-2xl border-4 border-gray-700 print:border-0 page print:max-w-letter print:max-h-letter print:mx-0 print:my-o xsm:p-8 print:bg-white md:h-letter lg:h-letter">
      <ToastContainer
        autoClose={2000}
        closeButton={true}
        style={{ width: '400px' }}
      />

      {/*
          This example requires updating your template:
  
          ```
          <html class="h-full bg-white">
          <body class="h-full">
          ```
        */}
      <div className="flex bg-gray-700 h-[70vh] w-[60vh] flex-1 flex-col justify-center px-6 py-12 lg:px-8">
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
                {!isRegisterLoading ? 'Sign up' : <Loading />}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
