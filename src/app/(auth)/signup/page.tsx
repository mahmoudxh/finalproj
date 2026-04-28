"use client"
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { signupDataType, SignUpSchema } from './Signup.schema' 
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'


export default function page() {
    const router = useRouter()

    const form = useForm( {
        defaultValues : {
            name : "",
            email : "",
            password : "",
            rePassword : "",
            phone : ""
        },
        resolver : zodResolver(SignUpSchema)
    })

    async function handleSignup (values : signupDataType){
        try {
            const res = await fetch ("https://ecommerce.routemisr.com/api/v1/auth/signup",{
            body : JSON.stringify(values),
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
        })
        const finalRes = await res.json()
        console.log(finalRes)

        if(res.ok){
            toast.success("Sign up Successfully",{
                position : "top-center",
                richColors : true
            })
            router.push("/login")
        } else {
                toast.error("Failed to Sign up",{
                position : "top-center",
                richColors : true
            })
        }

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
        <div className='bg-amber-100 p-5 w-10/12 mx-auto rounded-2xl '>
            <h1 className='text-3xl my-2 mx-auto'>Sign Up</h1>

            <form onSubmit={form.handleSubmit(handleSignup)}>
                <Controller
                    name="name"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid} className='my-2'>
                        <FieldLabel htmlFor={field.name}>userName</FieldLabel>
                        <Input
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            placeholder="Enter Your Name"
                            autoComplete="off"
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
                <Controller
                    name="email"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid} className='my-2'>
                        <FieldLabel htmlFor={field.name}>userEmail</FieldLabel>
                        <Input
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            placeholder="Enter Your Email"
                            autoComplete="off"
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
                <Controller
                    name="password"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid} className='my-2'>
                        <FieldLabel htmlFor={field.name}>userPassword</FieldLabel>
                        <Input
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            placeholder="Enter Your password"
                            autoComplete="off"
                            type="password"
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
                <Controller
                    name="rePassword"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid} className='my-2'>
                        <FieldLabel htmlFor={field.name}>rePassword</FieldLabel>
                        <Input
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            placeholder="Enter the rePassword"
                            autoComplete="off"
                            type="password"
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
                <Controller
                    name="phone"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid} className='my-2'>
                        <FieldLabel htmlFor={field.name}>userPhone</FieldLabel>
                        <Input
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            placeholder="Enter Your Phone"
                            autoComplete="off"
                            type='tel'
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />

                <Button className='w-full my-2 bg-black text-white text-xl cursor-pointer'> Submit </Button>
            </form>
        </div>
        </>
    )
}
