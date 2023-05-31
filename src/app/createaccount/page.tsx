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

const CreateAccount = () => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [isAlertVisible, setAlertVisible] = React.useState(false);
    const [alertMessage, setAlertMessage] = React.useState("")

    const router = useRouter();
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const validationSchema = Yup.object().shape({
        firstName: Yup.string().max(15, 'Must be 15 characters or less').required('Required'),
        lastName: Yup.string().max(20, 'Must be 20 characters or less').required('Required'),
        email: Yup.string().email("Invalid email").required("Email is required"),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required').matches(/^(.*[!@#$%^&*()\-_=+[\]{};':"\\|,.<>/?])+.*$/, 'Must have at least one symbol')
    });

    const formik = useFormik({
        validationSchema,
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        },
        onSubmit: data => {
            fetch('/api/createaccount', {
                method: 'POST',
                body: JSON.stringify(data)
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.status === 200) {
                        router.push('/dashboard')
                    } else {
                        setAlertVisible(true)
                        setAlertMessage(data.message)
                    }
                });
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
            <form
                className='flex flex-center flex-col justify-center items-center h-screen'
                onSubmit={formik.handleSubmit}>
                <h1 className='text-center font-bold text-2xl text-white'>Create Account</h1>
                <div className='w-3/4'>
                    <FormInput
                        type="text"
                        placeholder="First Name"
                        onChange={formik.handleChange}
                        id="firstName"
                        name="firstName"
                        value={formik.values.firstName}
                    />
                    {formik.touched.firstName && formik.errors.firstName ? (
                        <div className='text-red-600' style={{ height: '20px' }}>
                            {formik.errors.firstName}
                        </div>
                    ) : (
                        <div style={{ height: '20px', visibility: 'hidden' }}></div>
                    )}
                    <FormInput
                        type="text"
                        placeholder="Last Name"
                        onChange={formik.handleChange}
                        id="lastName"
                        name="lastName"
                        value={formik.values.lastName}
                    />
                    {formik.touched.lastName && formik.errors.lastName ? (
                        <div className='text-red-600' style={{ height: '20px' }}>
                            {formik.errors.lastName}
                        </div>
                    ) : (
                        <div style={{ height: '20px', visibility: 'hidden' }}></div>
                    )}
                    <FormInput
                        type="text"
                        placeholder="Email"
                        onChange={formik.handleChange}
                        id="email"
                        name="email"
                        value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <div className='text-red-600' style={{ height: '20px' }}>
                            {formik.errors.email}
                        </div>
                    ) : (
                        <div style={{ height: '20px', visibility: 'hidden' }}></div>
                    )}
                    <div className='relative'>
                        <FormInput
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            id="password"
                            name="password"
                            onChange={formik.handleChange}
                            value={formik.values.password}
                        />
                        {formik.touched.password && formik.errors.password ? (
                            <div className='text-red-600' style={{ height: '20px' }}>
                                {formik.errors.password}
                            </div>
                        ) : (
                            <div style={{ height: '20px', visibility: 'hidden' }}></div>
                        )}

                        <div className='-translate-y-[60px] translate-x-4 w-5'>
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
                        type='submit'
                    >
                        Create Account
                    </motion.button>
                    <motion.div
                        whileHover={{ scale: 1.01 }}
                        className="text-white-500 mt-1 text-center cursor-pointer"><Link href="/login">Login</Link></motion.div>
                </div>
                <div className='absolute center bottom-10'>
                    {isAlertVisible &&
                        <Alert
                            type="error"
                            message={alertMessage}
                        />}
                </div>
            </form>
        </div>
    )
}
export default CreateAccount