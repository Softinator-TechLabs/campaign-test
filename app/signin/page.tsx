'use client';

import { handleSignin } from './action';
import { useFormState } from 'react-dom';

export type FormState = {
  message: string;
  error: Boolean;
};

const SignIn = () => {
  const initialValue: FormState = {
    error: false,
    message: ''
  };
  const [state, formAction] = useFormState(handleSignin, initialValue);
  return (
    <div className="max-w-md mx-auto w-100 my-5">
      <h2 className="text-xl font-semibold text-center mb-4">Sign In</h2>
      <form className="space-y-6" action={formAction}>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            name="password"
            type="password"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        {state.error && (
          <div className="text-red-500 p-0 my-1">{state.message}</div>
        )}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
            />
            <label
              htmlFor="remember-me"
              className="ml-2 block text-sm text-gray-900"
            >
              Remember me
            </label>
          </div>
          <div className="text-sm">
            <a
              href="#"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Forgot your password?
            </a>
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
