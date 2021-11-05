import React, { useState, useEffect } from 'react'
import { store } from '../firebaseconfig'

const Home = () => {
    const [ user, setUser ] = useState({ username: '', password: ''})
    const [ loged, setLoged ] = useState('')
    const [ loginError, setLoginError ] = useState('')
    const [ customers, setCustomers ] = useState([])
    const [ leads, setLeads ] = useState([])

    const google_sheets_url = 'https://sheets.googleapis.com/v4/spreadsheets/144ekOHQpni-iOmnV5KpKoQ2wkQ1597yehQY3Ez3mrkI/values/ronda1!A:E?key=AIzaSyAtlxUEuKZG1L3L9SLjFXXUzCezLkZ6kOU'

    const refineCustomerName = full_name => {
        const names = full_name.split(' ')
        let name
        if(names[0].length > 4){
            name = names[0]
        } else {
            name = names[0] + ' ' + names[1]
        }
        return name
    }

    const sendMessage = lead => {
        const db = {
            name: lead.customer_name,
            salesman: lead.salesperson_code,
        }
        saveLead(db)
        const name = refineCustomerName(lead.customer_name)
        const salesman = salesperson[lead.salesperson_code]
        let car_year = 2014
        let this_year = new Date().getFullYear()
        for(let i = 2014; i < this_year+1; i++){
            if(lead.customer_car.includes(i)){
                car_year = i
            }
        }
        let car_type = 'auto'
        for(let car of hyundai_cars){
            if(lead.customer_car.includes(car)){
                car_type = car
            }
        }
        if(car_type === 'auto'){
            car_year = ''
        }
        const message = `Hola ${name}, cómo estás? soy ${salesman} de Dalton Hyundai Country, queremos reiterarte el gusto que tuvimos al verte estrenar tu ${car_type} ${car_year}. Ahora queremos que conozcas nuestra renovada división: Dalton Seguros, aprovecha los precios de lanzamiento ${name} y cotiza con nosotros tu vehículo de cualquier marca, seguro que te llevas una grata sorpresa con nuestros precios y coberturas.`

        let encoded = message

        for(let i=0; i < message.length; i++ ){
            encoded = encoded.replace(' ', '%20')
        }
    
        let message_url = `https://wa.me/52${lead.customer_phone}/?text=${encoded}`

        window.open(message_url, "_blank")
    }

    const saveLead = async lead => {
        try{
            await store.collection('leads').add(lead)
        } catch(e){
            console.log(e)
        }
    }

    const loginCleanup = () => {
        setUser({username: '', password: ''})
    }

    const loadLeads = user => {
        const filtered = customers.filter( customer => customer.salesperson_code === user)
        setLeads(filtered)
    }

    const verifyUser = () => {
        if(passwords[user.username] !== user.password){
            setLoginError('El usuario o contraseña son incorrectos')
            loginCleanup()
            return
        } else {
            setLoged(salesperson[user.username])
            loadLeads(user.username)
        }        
    }

    const hyundai_cars = ['ELANTRA', 'CRETA', 'ACCENT', 'GRAND I10', 'SANTA FE', 'SONATA', 'TUCSON', 'IX35', 'PALISADE', 'IONIQ', 'STAREX']

    const passwords = {
        'DABL': 'DABL',
        'SYCC': 'SYCC',
        'CMGC': 'CMGC',
        'AOJG': 'AOJG',
        'LGHB': 'LGHB',
        'HAVT': 'HAVT',
        'JAR': 'JAR',
        'SCA': 'SCA',
        'EGGM': 'EGGM',
        'GIMN': 'GIMN',
        'MACG': 'MACG',
        'ASU': 'ASU',
        'JGBM': 'JGBM',
        'JRUG': 'JRUG',
    }

    const salesperson = {
        'SYCC': 'Sandra',
        'CMGC': 'Cinthya',
        'AOJG': 'Alan',
        'LGHB': 'Luis Gerardo',
        'HAVT': 'Hector',
        'JAR': 'Javier',
        'SCA': 'Sol Campos',
        'EGGM': 'Eduardo',
        'GIMN': 'Gabriel',
        'MACG': 'Martha',
        'ASU': 'Antonio',
        'JGBM': 'Jonathan',
        'JRUG': 'Rafael',
        'DABL': 'David'
    }

    useEffect(() => {
        class Customer{
            constructor(customer_name, customer_phone, customer_car, salesperson_code){
                this.customer_name = customer_name;
                this.customer_phone = customer_phone;
                this.customer_car = customer_car;
                this.salesperson_code = salesperson_code;
            }
        }

        const arrangeCustomers = leads => {
            leads.shift()
            let customers_array = []
            for(let lead of leads){
                customers_array.push(new Customer(lead[0],lead[2],lead[3],lead[4]))
            }
            setCustomers(customers_array)
        }

        const getCustomers = async () => {
            try{
                const response = await fetch(google_sheets_url)
                const customers = await response.json()
                arrangeCustomers(customers.values)
            } catch (e) {
                alert(e)
            }
        }
        getCustomers()
    }, [])

    return (
        <div className='home'>
            {
                loged?
                (
                    <section className='user-box'>
                        <p>Usuario: {salesperson[user.username]}</p>
                        <button
                            onClick={ e => window.location.reload()}
                        >
                            Cerrar Sesión
                        </button>
                    </section>
                )
                :
                (
                    <section className='login-box'>
                        <h3>INICIAR SESION</h3>
                        <input
                            placeholder='Clave de asesor'
                            type="text"
                            value={user.username}
                            onFocus={ e => setLoginError('')}
                            onChange={
                                e => setUser({...user, username: e.target.value.toUpperCase().slice(0,4)})
                            }
                        />
                        <input
                            placeholder='Contraseña'
                            type="password"
                            value={user.password}
                            onFocus={ e => setLoginError('')}
                            onChange={
                                e => setUser({...user, password: e.target.value.toUpperCase().slice(0,4)})
                            }
                        />
                        {
                            loginError?
                            (
                                <p>{loginError}</p>
                            )
                            :
                            (
                                <span></span>
                            )
                        }
                        <button
                            className='major-edit-button'
                            onClick={
                                e => {
                                    verifyUser()
                                }
                                    
                            }
                        >
                            Iniciar Sesión
                        </button>
                    </section>
                )
            }
            <section className='leads'>
                {
                    leads.length > 0?
                    (
                        leads.map( lead => (
                                <div 
                                    className='lead'
                                    key={lead.customer_name}
                                    onClick={
                                        e => {
                                            sendMessage(lead)
                                        }
                                    }
                                >
                                    <p>{lead.customer_name}</p>
                                    <p>{lead.customer_phone}</p>
                                    <p>{lead.customer_car}</p>
                                </div>
                            )
                        )
                    )
                    :
                    (
                        <span></span>
                    )
                }
            </section>
        </div>
    )
}

export default Home
