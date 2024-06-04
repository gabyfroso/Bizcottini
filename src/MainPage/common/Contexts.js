import React, { useState, useEffect } from 'react';

import Header from '../Header';
import Aside from '../Aside';
import Footer from '../Footer';

import './App.css';

const Main = React.createContext();

const AllElementsContext = React.createContext();

const CarritoContext = React.createContext();
const FavoritosContext = React.createContext();

function FetchAllElements() {

    const tempoAllElements = {
        Principales: {
            elem: {
                props: {
                    img: {
                        url: "",
                        alt: 'altElem'
                    },
                    tipo: ["dulce", "salado"]
                },
                Array: [
                    {
                        title: "subelem",
                        SuperTags: [],
                        tags: [],
                        description: [],
                        Disponible: true,
                        enable: false
                    }
                ]
            },
            elem2: {
                props: {
                    img: {
                        url: "",
                        alt: 'altElem2'
                    },
                    tipo: ["dulce", "salado"]
                },
                Array: [
                    {
                        title: "subelem",
                        SuperTags: [],
                        tags: [],
                        description: [],
                        Disponible: true,
                        enable: false
                    }
                ]
            }
        }
    }

    let Response = tempoAllElements;

    fetch('./json/Comunes.json')
        .then(res => {
            if (Array.isArray(res)) {
                Response = res;
            } else {
                //console.error('res no fue array, err in Contexts.js');
            }

        })
        .catch(err => {
            console.error(err);
        })

    return Response;
}

const AllElementsProvider = ({ children }) => {
    const [All0Extra1Arr, setAll0Extra1Arr] = useState([]);
    const [All0PrincipalName, set0PrincipalName] = useState([]);
    const [All0PrincipalArray, setAll0PrincipalArray] = useState({});

    useEffect(() => {
        const FAllElem = FetchAllElements();

        if (FAllElem?.Principales) {
            const allNameElems = Object.keys(FAllElem.Principales);
            set0PrincipalName(allNameElems);
            setAll0PrincipalArray(FAllElem.Principales);
        } else {
            console.error('CRITICAL ERR');
        }


    }, [])


    return (
        <AllElementsContext.Provider value={{ All0PrincipalName, All0PrincipalArray }}>
            {children}
        </AllElementsContext.Provider>
    )
}


const CarritoProvider = ({ children }) => {
    const [Carrito, setCarrito] = useState([]);
    const [AllElements, setAllElements] = useState([]);

    useEffect(() => {
        setAllElements(FetchAllElements());
    }, []);


    return (
        <CarritoContext.Provider>
            {children}
        </CarritoContext.Provider>
    )
}

const FavoritosProvider = ({ children }) => {
    const [Favoritos, setFavoritos] = useState([]);
    const [AllElements, setAllElements] = useState([]);

    useEffect(() => {
        setAllElements(FetchAllElements());
    }, [])

    return (
        <FavoritosContext.Provider>
            {children}
        </FavoritosContext.Provider>
    )
}




const MainProvider = ({ children }) => {
    const [Focus, setFocus] = useState('Todos');
    const [FocusPage, setFocusPage] = useState('Main');

    return (
        <Main.Provider 
        value={{
            Focus, FocusPage,
            setFocus, setFocusPage
        }}>
            <AllElementsProvider>
                <CarritoProvider>
                    <FavoritosProvider>
                        <div className='App'>
                            <Header />
                            <Aside />
                            {children}
                            <Footer />
                        </div>
                    </FavoritosProvider>
                </CarritoProvider>
            </AllElementsProvider>
        </Main.Provider>
    )
}

export {
    Main, 
    AllElementsContext, CarritoContext, FavoritosContext,
    AllElementsProvider, CarritoProvider, FavoritosProvider,
}

export default MainProvider;