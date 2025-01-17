'use client'

import { useState } from 'react'

import { Box, Typography, Card, CardContent, TextField, Button, Avatar, Tabs, Tab } from '@mui/material'

function TabPanel({ children, value, index }) {
  return (
    <div role='tabpanel' hidden={value !== index}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
}

export default function SettingsPage() {
  const [tabValue, setTabValue] = useState(0)

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
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

            <Box component='form' sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Avatar
                  sx={{ width: 100, height: 100, mb: 2 }}
                  src='/images/avatars/default-profile.png'
                  alt='Profile Picture'
                />
                <Button variant='outlined' component='label'>
                  Upload Image
                  <input type='file' hidden />
                </Button>
              </Box>

              <TextField fullWidth label='Name' variant='outlined' defaultValue='John Doe' />
              <TextField fullWidth label='Email' variant='outlined' defaultValue='john.doe@example.com' />
              <TextField fullWidth label='Password' variant='outlined' type='password' />

              <Button variant='contained' color='primary'>
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
