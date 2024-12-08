import React from 'react'
import Hero from '../components/Hero'
import Biography from '../components/Biography'
import Departments from '../components/Departments'
import MessageForm from '../components/MessageForm'

export default function Home() {
  return (
    <div>
      <Hero title="Welcome to MeeCare medical institude | Your trusted health care provider"
      imageUrl={"/hero.png"}/>
      <Biography imageUrl={"/about.png"}/>
      <Departments/>
      <MessageForm/>
    </div>
  )
}
