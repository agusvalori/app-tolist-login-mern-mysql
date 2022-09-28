import { Box, Typography } from '@mui/material'
import React from 'react'

export const AboutPage = () => {
  return (
    <Box>
      <Box>
        <Typography variant={"h5"}>Lista de tareas</Typography>
        <Typography>Realizadas con</Typography>
        <ul>
          <li>Reactjs</li>
          <li>Expressjs</li>
          <li>MYSQL</li>
        </ul>
      </Box>
    </Box>
  )
}
