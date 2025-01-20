'use client'

import React, { useState } from 'react'

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
  Grid2 as Grid
} from '@mui/material'
import { Icon } from '@iconify/react'

interface User {
  id: string
  name: string
  email: string
  image: string
}

interface UserCardProps {
  users: User[]
  onEdit: (user: User) => void
  onDelete: (user: User) => void
  onSave: (user: User) => void
}

const UserCard: React.FC<UserCardProps> = ({ users, onEdit, onDelete, onSave }) => {
  const [editingUserId, setEditingUserId] = useState<string | null>(null)
  const [editedName, setEditedName] = useState('')
  const [editedEmail, setEditedEmail] = useState('')

  const handleEditClick = (user: User) => {
    setEditingUserId(user.id)
    setEditedName(user.name)
    setEditedEmail(user.email)
    onEdit(user)
  }

  const handleSave = (user: User) => {
    onSave({
      ...user,
      name: editedName,
      email: editedEmail
    })
    setEditingUserId(null)
  }

  const handleCancel = () => {
    setEditingUserId(null)
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
          {users.map((user, index) => (
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
                      src={user.image}
                      alt={user.name}
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
                          {user.name}
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
                          onClick={handleCancel}
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
                          onClick={() => onDelete(user)}
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
          ))}
        </Box>
      </CardContent>
    </Card>
  )
}

export default UserCard
