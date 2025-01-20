'use client'
import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'

import type * as z from 'zod'

import { Box, Typography, Card, CardContent, Button, Avatar, Tabs, Tab, Alert } from '@mui/material'

import { useDispatch, useSelector } from 'react-redux'

import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import { setUser } from '@/store/slices/authSlice'

import CustomTextField from '@/@core/components/mui/TextField'
import { UserSchema } from '@/schemas'
import { Update } from '@/actions/updateUser'
import { useEdgeStore } from '@/lib/edgestore'

import type { RootState } from '@/store/store'

interface TabPanelProps {
  children: ReactNode
  value: number
  index: number
}

function TabPanel({ children, value, index }: TabPanelProps) {
  return (
    <div role='tabpanel' hidden={value !== index}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
}

export default function SettingsPage() {
  const [tabValue, setTabValue] = useState(0)

  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')

  const handleTabChange = (event: any, newValue: any) => {
    setTabValue(newValue)
  }

  const form = useForm<z.infer<typeof UserSchema>>({
    resolver: zodResolver(UserSchema)
  })

  const [image, setImage] = useState<string>(form.getValues('image') || '')

  const [file, setFile] = useState<File>()
  const { edgestore } = useEdgeStore()

  const user = useSelector((state: RootState) => state.auth.user)

  // const [userState, setUserState] = useState({
  //   name: user.name,
  //   email: user.email,
  //   image: user.image,
  //   id: user.id,
  //   role: user.role
  // })

  useEffect(() => {
    if (user.image) {
      setImage(user.image)
    }
  }, [user.image])

  const dispatch = useDispatch()

  const onSubmit = (values: z.infer<typeof UserSchema>) => {
    console.log('this is image from onsubmit :', image)
    setError('')
    setSuccess('')

    Update(values).then(data => {
      if (data?.success) {
        setSuccess(data?.success)
        dispatch(
          setUser({
            id: user.id,
            email: values.email,
            name: values.name,
            image,
            role: user.role
          })
        )
      }

      if (data?.error) {
        setError(data?.error)
      }
    })
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant='h4' gutterBottom>
        Settings
      </Typography>

      <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 4 }}>
        <Tab label='Profile Settings' />
        <Tab label='User Settings' />
      </Tabs>

      {/* Profile Settings Tab */}
      <TabPanel value={tabValue} index={0}>
        <Card>
          <CardContent>
            <Typography variant='h5' gutterBottom>
              Profile Settings
            </Typography>

            <Box
              component='form'
              onSubmit={form.handleSubmit(onSubmit)}
              sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Avatar sx={{ width: 100, height: 100, mb: 2 }} src={image} alt='Profile Picture' />
                <input
                  type='file'
                  accept='image/*'
                  onChange={e => {
                    const selectedFile = e.target.files?.[0]

                    console.log('File selected:', selectedFile)

                    if (selectedFile) {
                      setFile(selectedFile) // Update the file state
                      console.log('File state updated:', selectedFile)
                    } else {
                      console.log('No file selected')
                    }
                  }}
                />
                <Button
                  variant='outlined'
                  component='button'
                  onClick={async () => {
                    if (file) {
                      const res = await edgestore.myPublicImages.upload({ file })

                      setImage(res.url)
                      form.setValue('image', image)
                    }
                  }}
                >
                  Upload Image
                </Button>
              </Box>

              {/* <TextField fullWidth label='Email' variant='outlined' defaultValue={user.email} /> */}
              <CustomTextField
                defaultValue={user.email}
                {...form.register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: 'Enter a valid email address'
                  }
                })}
                error={!!form.formState.errors.email}
                helperText={form.formState.errors.email?.message}
                autoFocus
                fullWidth
                label='Email'
              />
              <CustomTextField
                {...form.register('name', {
                  required: 'Name is required'
                })}
                error={!!form.formState.errors.name}
                helperText={form.formState.errors.name?.message}
                autoFocus
                fullWidth
                label='Name'
                defaultValue={user.name}
              />
              <CustomTextField
                {...form.register('password', {
                  required: 'Password is required'
                })}
                error={!!form.formState.errors.password}
                helperText={form.formState.errors.password?.message}
                autoFocus
                fullWidth
                label='Password'
                type='password'
                placeholder='Enter your password to save changes'
              />

              {success && <Alert severity='success'>{success}</Alert>}
              {error && <Alert severity='error'>{error}</Alert>}

              <Button variant='contained' type='submit' color='primary'>
                Save Changes
              </Button>
            </Box>
          </CardContent>
        </Card>
      </TabPanel>

      {/* User Settings Tab */}
      <TabPanel value={tabValue} index={1}>
        <Card>
          <CardContent>
            <Typography variant='h5' gutterBottom>
              User Settings
            </Typography>
            <Typography variant='body1' color='textSecondary'>
              Additional user preferences and configurations can go here.
            </Typography>
          </CardContent>
        </Card>
      </TabPanel>
    </Box>
  )
}
