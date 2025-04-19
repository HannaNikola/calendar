'use client'

import React, { useEffect } from 'react'
import axios from 'axios'


// axios.defaults.baseURL = "https://calendar-back-end-s3b2.onrender.com";

console.log('hello word')

export const TestApi = () => {

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const response = await axios.get('https://calendar-back-end-s3b2.onrender.com/api/events')
        console.log( response.data)
      } catch (error) {
        console.error( error)
      }
    }

    fetchData()
  }, [])

  return <></>
}

