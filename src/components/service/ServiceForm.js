import {useState} from "react";

import Input from '../form/input'
import SubmitButton from '../form/SubmitButton'

import styles from '../projects/ProjectForm.module.css'


function ServiceForm({ handleSubmit, btnText, projectData }){

    const [service, setService] = useState({
        name: '',
        cost: '',
        description: ''
    })

    function submit(e) {
        e.preventDefault();
    
        const updatedProject = { 
            ...projectData, 
            services: projectData.services ? [...projectData.services, service] : [service]
        }
        projectData.services.push(service)
        handleSubmit(updatedProject)
    }

    function handleChange(e){
        setService({...service,[e.target.name]: e.target.value})
    }


    return (
        <form onSubmit={submit} className={styles.form}>
            <Input
                type="text"
                text="Nome do serviço"
                name="name"
                placeholder="Insira o nome do serviço"
                handleOnChange={handleChange}
                value={service.name}
            />
            <Input
                type="number"
                text="Custo do serviço"
                name="cost"
                placeholder="Insira o valor do serviço"
                handleOnChange={handleChange}
                value={service.cost}
            />
            <Input
                type="text"
                text="Descrição do serviço"
                name="description"
                placeholder="Descreva o serviço"
                handleOnChange={handleChange}
                value={service.description}
            />
            <SubmitButton text={btnText}/>
         </form>
    )
}

export default ServiceForm