'use client';
import React from 'react'
import { motion } from "framer-motion";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import FormInput from '../forminput';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Alert from '../alert'
import Image from 'next/legacy/image'

const Login = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [isAlertVisible, setAlertVisible] = React.useState(false);

  const router = useRouter();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required')
  });

  // create and API POST request to submit form data
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema,
    onSubmit: data => {
      alert(JSON.stringify(data));
      let status = 400
      if (status === 200) {
        router.push('/dashboard')
      } else {
        setAlertVisible(true)
      }
    },
  });

  const closeAlert = () => {
    setAlertVisible(false);
  };

  return (
    <div className="w-full 2xl:grid grid-cols-2">
      <div className='2xl:h-screen relative'>
        <Image
          src="/login-hero.jpg"
          alt="image"
          layout='fill' />
      </div>

      <form className='flex flex-center flex-col justify-center items-center h-screen' onSubmit={formik.handleSubmit}>
        <h1 className='text-center font-bold text-2xl text-white'>Test</h1>
        <div className='w-3/4'>
          <div className='translate-y-20 translate-x-4 w-5'>
            <Image
              src="/login-envelope.svg"
              alt="envelope"
              width="18"
              height="25" />
          </div>
          <FormInput
            type="text"
            placeholder="Email"
            onChange={formik.handleChange}
            id="email"
            name="email"
            value={formik.values.email} />

          <div className='relative'>
            <FormInput
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              id="password"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password} />
            <div className="flex flex-initial translate-y-4">
              <label className='w-full text-right'>
                <span className='pr-2'>Remember Me</span>
                <input type="checkbox" />
              </label>
            </div>
            <div className='-translate-y-16 translate-x-4 w-5'>
              <Image
                src={showPassword ? '/login-eye-slash-solid.svg' : '/login-eye-solid.svg'}
                alt="toggle show password"
                width="18"
                height="25"
                onClick={togglePasswordVisibility}
                className="2xl: absolute cursor-pointer"
              />
            </div>
          </div>
          <motion.button
            className="w-full text-black h-14 rounded-md mb-8 bg-rose-400"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.8 }}
            type='submit'>
            Sign in
          </motion.button>
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="text-white-500 mt-1 text-center cursor-pointer" ><Link href="/forgotpassword">Forgot Password</Link></motion.div>
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="text-white-500 mt-1 text-center cursor-pointer" ><Link href="/createaccount">Create Account</Link></motion.div>
        </div>
        {isAlertVisible && <Alert
          type="error"
          message='Invalid Credentials!'
          onclose={closeAlert} />}
      </form>
    </div>
  )
}
export default Login