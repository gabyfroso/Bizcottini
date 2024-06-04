import React, { useContext } from 'react'

import { AllElementsContext, AllElementsProvider, Main } from './common/Contexts'

import STLNav from './css/Header.module.css';

function LiPrincipal() {
  const { setFocus } = useContext(Main);
  return(
    <li>
      <button onClick={()=>{setFocus('All')}}>
        <h1>Todos</h1>
      </button>
    </li>
  )
}

function LiArr({ ArrayToUl = [] }) {
  const { Focus, setFocus } = useContext(Main);
  const { All0PrincipalArray } = useContext(AllElementsContext);

  return (
    <>
      {
        ArrayToUl.map((elem, i) => {
          console.log(All0PrincipalArray[elem]);
          const src = All0PrincipalArray[elem]?.img?.src || '';
          const alt = All0PrincipalArray[elem]?.img?.alt || `${elem}IMG`;

          return (
            <li key={i}>
              <button onDoubleClick={() => { setFocus(elem) }}
                className={`${Focus === elem ? STLNav.FocusNav : STLNav.GenLi}`}>
                <h1>{elem}</h1>
                <img src={src} alt={alt} />
              </button>
            </li>
          )
        })
      }
    </>
  )
}

function Nav() {
  const { Focus } = useContext(Main);
  const { All0PrincipalName } = useContext(AllElementsContext);

  console.log(All0PrincipalName);

  return (
    <div className={STLNav.AsideNav}>
      <nav style={{ display: 'flex', flexDirection: 'column' }}>
        <div>
          <abbr>{Focus === 'All' ? 'Todos' : Focus}</abbr>
          <div style={{ rotate: '90deg' }}>{'>'}</div>
        </div>

        {
          Array.isArray(All0PrincipalName) &&
          <ul
            style={{
              display: 'flex', flexDirection: 'row',
              flexWrap: 'nowrap',
              minHeight: 100, width: '100%'
            }}>
            <LiPrincipal/>
            <LiArr ArrayToUl={All0PrincipalName} />
            <LiArr ArrayToUl={All0PrincipalName} />
            <LiArr ArrayToUl={All0PrincipalName} />
          </ul>
        }
      </nav>
    </div>
  )
}

export default Nav