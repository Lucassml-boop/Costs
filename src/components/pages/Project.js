import {parse, v4 as uuidv4} from 'uuid'

import styles from './Project.module.css'

import {useParams} from 'react-router-dom'
import {useState, useEffect} from "react"

import Loading from '../layouts/Loading'
import Container from '../layouts/Container'
import ProjectForm from '../projects/ProjectForm'
import Message from '../layouts/Message'
import ServiceForm from '../service/ServiceForm'
import ServiceCard from '../service/ServiceCard'



function Project(){
    const {id} = useParams()

    const [project, setProject] = useState({})
    const [services, setServices] = useState({})
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)
    const [message, setMessage] = useState()
    const [type, setType] = useState()

    useEffect(()=>{
        setTimeout( ()=>{
            fetch(`http://localhost:5000/projects/${id}`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then((resp) => resp.json())
            .then((data) => {
                setProject({ ...data, services: data.services || [] })
                setServices(data.services)
            })
            .catch((err) => console.error(err))
        }, 500)
    }, [id])

    function editPost(project){
        setMessage('')

        if(project.budget < project.cost){
            setMessage('O orçamento não pode ser menor que o custo do projeto!')
            setType('error')
            return false
        }
    }

    function createService(project){
        setMessage('')
        if (!project.services) {
            project.services = []
        }

        if (project.services.length === 0) {
            setMessage('Nenhum serviço foi adicionado!')
            setType('error')
            return 
        }
        const lastService = project.services[project.services.length - 1]

        if (!lastService || !lastService.cost) {
            setMessage('Erro ao adicionar serviço. Preencha os campos corretamente.')
            setType('error')
            return 
        }
        const newService = { ...lastService, id: uuidv4() }

        const newCost = (parseFloat(project.cost) || 0) + parseFloat(newService.cost)

        // maxium value validation
        if (newCost > parseFloat(project.budget)) {
            setMessage('Orçamento ultrapassado, verifique o valor do serviço')
            setType('error')
            return 
        }

        const updatedProject = {
            ...project,
            cost: newCost,
            services: [...project.services, newService]
        }
        fetch(`http://localhost:5000/projects/${project.id }`,{
            method : "PATCH",
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(project),
        })
        .then( (resp) => resp.json())
        .then ((data) =>{
            setProject(data)
            setShowProjectForm(false)
            setMessage('Projeto atualizado!')
            setType('success')
            setShowServiceForm(false)
        })
        .catch((err) => console.error(err))
        
        
}

    function removeService(){}



    function toggleProjectForm(){
        setShowProjectForm(!showProjectForm)
    }

    function toggleServiceForm(){
        setShowServiceForm(!showServiceForm)
    }


    return <>{project.name ? 
    <div className={styles.project_details}>
        <Container customClass ="column">
            {message && <Message type={type} msg={message} />}
            <div className={styles.details_container}>
                <h1>Projecto: {project.name}</h1>
                <button className={styles.btn} onClick={toggleProjectForm}>{!showProjectForm ? 'Editar Projeto' : 'Fechar'}</button>
                {!showProjectForm ? (
                    <div className={styles.project_info}>
                        <p>
                            <span>Categoria:</span> {project.category.name}
                        </p>
                        <p>
                            <span>Total de Orçamento:</span> R${project.budget}
                        </p>
                        <p>
                            <span>Total Utilizado:</span> R${project.cost}
                        </p>
                    </div>
                ) : (
                    <div className={styles.project_info}>
                        <ProjectForm handleSubmit={editPost}
                        btnText="Concluir edição"
                        projectData={project}
                        />
                    </div>
                )}
            </div>
            <div className={styles.service_form_container}>
                <h2>Adicione um serviço:</h2>
                <button className={styles.btn_d} onClick={toggleServiceForm}>
                    {!showServiceForm ? 'Adicionar serviço' : 'Fechar'}
                </button>
                <div className={styles.project_info}>
                    {showServiceForm && (
                        <ServiceForm
                            handleSubmit={createService}
                            btnText="Adicionar Serviço"
                            projectData={project} 
                        />
                    )}
                </div>
            </div>
            <h2>Serviço</h2>
            <Container customClass="start">
                {services.length > 0 &&
                services.map((service) => (
                    <ServiceCard
                    id={service.id}
                    name={service.name}
                    cost={service.cost}
                    description={service.description}
                    key={service.id}
                    handleRemove={removeService}
                    />
                ))}
                {services.length === 0 && <p>não existem serviços cadastrados</p>}
            </Container>
        </Container>
    </div> : <Loading/>}</>
}

export default Project