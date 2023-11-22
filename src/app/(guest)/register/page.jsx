'use client';
import RegisterForm from '@/components/RegisterForm'
import * as S from './style';
import React from 'react'

const RegisterPage = () => {
  return (
    <S.RegisterWrap>
      <RegisterForm/>
    </S.RegisterWrap>
  )
}

export default RegisterPage