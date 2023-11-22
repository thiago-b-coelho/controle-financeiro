'use client'
import LoginForm from '@/components/LoginForm'
import * as S from './style'
import React from 'react'

const LoginPage = () => {
  return (
    <S.LoginWrapper>
      <LoginForm />
    </S.LoginWrapper>
  )
}

export default LoginPage