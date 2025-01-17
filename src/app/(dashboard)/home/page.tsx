'use client'

import { useEffect, useState } from 'react'

import { Box, Typography, Grid2, Card, CardContent, Button, Avatar } from '@mui/material'

import { styled } from '@mui/material/styles'

import { getUserSession } from '@/app/api/auth/signout'

const WelcomeCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(2),
  borderRadius: theme.spacing(1)
}))

const SectionCard = styled(Card)(({ theme }) => ({
  boxShadow: theme.shadows[2],
  transition: 'transform 0.3s',
  '&:hover': {
    transform: 'scale(1.05)'
  }
}))

export default function Page() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    picture: null,
    id: '',
    role: ''
  })

  useEffect(() => {
    const fetchUserSession = async () => {
      const res = await getUserSession()

      setUser(JSON.parse(res))
    }

    fetchUserSession()
  }, [])

  return (
    <Box sx={{ p: 4 }}>
      {/* Welcome Section */}
      <Grid2 container spacing={4}>
        <Grid2 size={{ xs: 12 }}>
          <WelcomeCard>
            <Typography variant='h4' gutterBottom>
              Welcome Back, {user.name}
            </Typography>
            <Typography variant='subtitle1'>Heres a quick overview of your dashboard.</Typography>
          </WelcomeCard>
        </Grid2>

        {/* Stats Section */}
        <Grid2 container spacing={4} mt={2}>
          <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
            <SectionCard>
              <CardContent>
                <Typography variant='h5' gutterBottom>
                  150
                </Typography>
                <Typography variant='body2'>New Users</Typography>
              </CardContent>
            </SectionCard>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
            <SectionCard>
              <CardContent>
                <Typography variant='h5' gutterBottom>
                  $2,300
                </Typography>
                <Typography variant='body2'>Revenue</Typography>
              </CardContent>
            </SectionCard>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
            <SectionCard>
              <CardContent>
                <Typography variant='h5' gutterBottom>
                  78%
                </Typography>
                <Typography variant='body2'>Task Completion</Typography>
              </CardContent>
            </SectionCard>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
            <SectionCard>
              <CardContent>
                <Typography variant='h5' gutterBottom>
                  12
                </Typography>
                <Typography variant='body2'>Pending Approvals</Typography>
              </CardContent>
            </SectionCard>
          </Grid2>
        </Grid2>

        {/* Action Section */}
        <Grid2 size={{ xs: 12, md: 4 }}>
          <SectionCard>
            <CardContent>
              <Typography variant='h6' gutterBottom>
                Quick Actions
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                <Button variant='contained' color='primary'>
                  Create New Task
                </Button>
                <Button variant='outlined' color='secondary'>
                  View Reports
                </Button>
                <Button variant='text' color='info'>
                  Update Profile
                </Button>
              </Box>
            </CardContent>
          </SectionCard>
        </Grid2>

        {/* Team Section */}
        <Grid2 size={{ xs: 12, md: 6 }}>
          <Typography variant='h5' gutterBottom>
            Meet the Team
          </Typography>
          <Grid2 container spacing={6}>
            {['Alice', 'Bob', 'Charlie', 'Diana'].map((name, index) => (
              <Grid2 size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                <Card>
                  <CardContent>
                    <Avatar
                      sx={{ width: 64, height: 64, margin: '0 auto', mb: 2 }}
                      alt={name}
                      src={`/images/avatars/${index + 1}.png`}
                    />
                    <Typography variant='h6' align='center'>
                      {name}
                    </Typography>
                    <Typography variant='body2' align='center' color='textSecondary'>
                      Team Member
                    </Typography>
                  </CardContent>
                </Card>
              </Grid2>
            ))}
          </Grid2>
        </Grid2>
      </Grid2>
    </Box>
  )
}
