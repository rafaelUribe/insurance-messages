import React, { useState } from 'react'

const Menu = () => {
    const [menu, setMenu] = useState(false)

    const toggleMenu = () => {
        menu === true? setMenu(false) : setMenu(true)
    }

    return (
        <div className='menu'>
            <section className='menu-header'>
                <div className='menu-logo'>
                
                </div>
                <div className='menu-button'>
                    <button
                        onClick={e => toggleMenu()}
                    >

                    </button>
                </div>

            </section>
            <section className='menu-nav'>
                {
                    menu?
                    (
                        <nav>
                            <ul>
                                <li>
                                    <a href="/Home">Home</a>
                                </li>
                            </ul>
                            <ul>
                                <li>
                                    <a href="/Ranking">Ranking</a>
                                </li>
                            </ul>
                        </nav>
                    )
                    :
                    (
                        <span>

                        </span>
                    )
                }
            </section>
        </div>
    )
}

export default Menu
