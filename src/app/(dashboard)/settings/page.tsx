'use client'
import { useEffect, useState } from 'react'

import type * as z from 'zod'

import { Box, Typography, Card, CardContent, Button, Avatar, Tabs, Tab, Alert } from '@mui/material'

import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import { getUserSession } from '@/app/api/auth/signout'
import CustomTextField from '@/@core/components/mui/TextField'
import { UserSchema } from '@/schemas'
import { Update } from '@/actions/updateUser'
import { useEdgeStore } from '@/lib/edgestore'

function TabPanel({ children, value, index }) {
  return (
    <div role='tabpanel' hidden={value !== index}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
}

export default function SettingsPage() {
  const [tabValue, setTabValue] = useState(0)

  const [user, setUser] = useState({
    name: '',
    email: '',
    picture: null,
    id: '',
    role: ''
  })

  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')

  const handleTabChange = (event: any, newValue: any) => {
    setTabValue(newValue)
  }

  const form = useForm<z.infer<typeof UserSchema>>({
    resolver: zodResolver(UserSchema)
  })

  const watchedImage = form.watch('image')
  const [image, setImage] = useState<string>(form.getValues('image') || '/images/avatars/default-profile.png')

  const [urls, setUrls] = useState<{
    url: '/images/avatars/default-profile.png'
    thumbnailUrl: string | null
  }>()

  const [file, setFile] = useState<File>()
  const { edgestore } = useEdgeStore()

  useEffect(() => {
    const fetchUserSession = async () => {
      const res = await getUserSession()

      setUser(JSON.parse(res))
      setImage(JSON.parse(res).image)
    }

    fetchUserSession()
  }, [])

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    console.log(file)

    if (file) {
      const imageUrl = URL.createObjectURL(file)

      setImage(imageUrl)
      console.log(imageUrl)

      // Update the form field value
      form.setValue('image', imageUrl) // Store the file itself
    }
  }

  const onSubmit = (values: z.infer<typeof UserSchema>) => {
    console.log('this is image from onsubmit :', image)
    setError('')
    setSuccess('')

    Update(values).then(data => {
      setError(data?.error)
      setSuccess(data?.success)
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
