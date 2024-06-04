import React from 'react'

import Nav from './Nav';

import STLHeader from './css/Header.module.css'

function Header() {
  return (
    <header>
      <ul style={{ display: 'grid', gridTemplateColumns: '33% 33% 33%' }}>
        <li style={{textAlign: 'start'}}>
          <img alt='IndexIMG' />
        </li>
        <li>
          Bizcottini
        </li>
        <li style={{textAlign: 'end'}}>
          User
          <img alt='UserIMG' />
        </li>
      </ul>
      <Nav />
    </header>
  )
}

export default Header