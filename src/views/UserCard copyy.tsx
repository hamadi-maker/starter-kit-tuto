import React, { useState, useEffect } from 'react'

import {
  Card,
  CardContent,
  Typography,
  Avatar,
  IconButton,
  Box,
  Divider,
  TextField,
  Button,
  CircularProgress,
  Alert,
  Grid2 as Grid
} from '@mui/material'
import { Icon } from '@iconify/react'

import type { UserRole } from '@prisma/client'

import { getAllUsers } from '@/data/user'

// enum UserRole {
//   ADMIN = 'ADMIN',
//   USER = 'USER'
// }

// Updated interface to match your database schema
interface User {
  id: string
  email: string
  password: string | null
  image: string | null
  name: string | null
  role: UserRole
  emailVerified: Date | null
  createdAt: Date
  updatedAt: Date
}

const UserManagement: React.FC = () => {
  // Update the initial state type
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [editingUserId, setEditingUserId] = useState<string | null>(null)
  const [editedName, setEditedName] = useState('')
  const [editedEmail, setEditedEmail] = useState('')

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const data = await getAllUsers()

      console.log('data from user card : ', data)

      if (!data) {
        throw new Error('Failed to fetch users')
      }

      setUsers(data)
      setError(null)
    } catch (err) {
      setError('Error loading users. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  const handleEditClick = (user: User) => {
    setEditingUserId(user.id)
    setEditedName(user.name || '')
    setEditedEmail(user.email)
  }

  const handleSave = async (user: User) => {
    // Implement your save logic here
    setEditingUserId(null)
  }

  const handleDelete = async (user: User) => {
    // Implement your delete logic here
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Alert severity='error' sx={{ m: 2 }}>
        {error}
      </Alert>
    )
  }

  return (
    <Card elevation={3} sx={{ borderRadius: 2 }}>
      <CardContent sx={{ p: 0 }}>
        <Box sx={{ p: 3, bgcolor: 'primary.main' }}>
          <Typography variant='h5' sx={{ color: 'white', fontWeight: 600 }}>
            User Management
          </Typography>
        </Box>

        <Box sx={{ mt: 2 }}>
          {users.length === 0 ? (
            <Box sx={{ p: 3, textAlign: 'center' }}>
              <Typography color='text.secondary'>No users found</Typography>
            </Box>
          ) : (
            users.map((user, index) => (
              <React.Fragment key={user.id}>
                <Box
                  sx={{
                    px: 3,
                    py: 2,
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      bgcolor: editingUserId === user.id ? 'transparent' : 'action.hover'
                    }
                  }}
                >
                  <Grid container alignItems='center' spacing={2}>
                    <Grid size={{ xs: 12, sm: 1 }}>
                      <Avatar
                        src={user.image || undefined}
                        alt={user.name || 'User'}
                        sx={{
                          width: 45,
                          height: 45,
                          border: '2px solid',
                          borderColor: 'primary.light'
                        }}
                      />
                    </Grid>

                    <Grid size={{ xs: 12, sm: 7 }}>
                      {editingUserId === user.id ? (
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                          <TextField
                            fullWidth
                            size='small'
                            label='Name'
                            value={editedName}
                            onChange={e => setEditedName(e.target.value)}
                          />
                          <TextField
                            fullWidth
                            size='small'
                            label='Email'
                            value={editedEmail}
                            onChange={e => setEditedEmail(e.target.value)}
                          />
                        </Box>
                      ) : (
                        <>
                          <Typography variant='subtitle1' sx={{ fontWeight: 600 }}>
                            {user.name || 'Unnamed User'}
                          </Typography>
                          <Typography
                            variant='body2'
                            sx={{
                              color: 'text.secondary',
                              display: 'flex',
                              alignItems: 'center',
                              gap: 1
                            }}
                          >
                            <Icon icon='mdi:email-outline' />
                            {user.email}
                          </Typography>
                          <Typography
                            variant='caption'
                            sx={{
                              color: 'text.secondary',
                              mt: 0.5,
                              display: 'flex',
                              alignItems: 'center',
                              gap: 1
                            }}
                          >
                            <Icon icon='mdi:shield-outline' />
                            {user.role}
                          </Typography>
                        </>
                      )}
                    </Grid>

                    <Grid
                      size={{ xs: 12, sm: 4 }}
                      sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        gap: 1
                      }}
                    >
                      {editingUserId === user.id ? (
                        <>
                          <Button
                            variant='contained'
                            color='primary'
                            startIcon={<Icon icon='tabler:check' />}
                            onClick={() => handleSave(user)}
                          >
                            Save
                          </Button>
                          <Button
                            variant='outlined'
                            color='error'
                            startIcon={<Icon icon='tabler:x' />}
                            onClick={() => setEditingUserId(null)}
                          >
                            Cancel
                          </Button>
                        </>
                      ) : (
                        <>
                          <IconButton
                            onClick={() => handleEditClick(user)}
                            sx={{
                              bgcolor: 'primary.soft',
                              color: 'primary.main',
                              '&:hover': {
                                bgcolor: 'primary.main',
                                color: 'white'
                              }
                            }}
                          >
                            <Icon icon='tabler:edit' width={20} />
                          </IconButton>
                          <IconButton
                            onClick={() => handleDelete(user)}
                            sx={{
                              bgcolor: 'error.soft',
                              color: 'error.main',
                              '&:hover': {
                                bgcolor: 'error.main',
                                color: 'white'
                              }
                            }}
                          >
                            <Icon icon='tabler:trash' width={20} />
                          </IconButton>
                        </>
                      )}
                    </Grid>
                  </Grid>
                </Box>
                {index < users.length - 1 && <Divider />}
              </React.Fragment>
            ))
          )}
        </Box>
      </CardContent>
    </Card>
  )
}

export default UserManagement
