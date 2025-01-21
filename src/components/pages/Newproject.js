import { useNavigate } from "react-router-dom";

import ProjectForm from "../projects/ProjectForm";

import styles from "./Newproject.module.css";

function Newproject() {
    const navigate = useNavigate();

    function createPost(project) {
        // Inicializa os valores padrão
        project.cost = 0;
        project.services = [];

        fetch("http://localhost:5000/projects", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(project),
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log("Projeto criado com sucesso:", data);
                navigate("/projects", {
                    state: { message: "Projeto criado com sucesso!" },
                });
            })
            .catch((err) => console.error("Erro ao criar o projeto:", err));
    }

    return (
        <div className={styles.newproject_container}>
            <h1>Criar Projeto</h1>
            <p>Crie seu projeto para depois adicionar os serviços</p>
            <ProjectForm handleSubmit={createPost} btnText="Criar projeto" />
        </div>
    );
}

export default Newproject;
