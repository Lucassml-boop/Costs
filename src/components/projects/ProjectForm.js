import { useEffect, useState } from "react";

import Select from "../form/Select";
import SubmitButton from "../form/SubmitButton";
import Input from "../form/input";

import styles from "./ProjectForm.module.css";

function ProjectForm({ handleSubmit, btnText, projectData }) {
    const [categories, setCategories] = useState([]);
    const [project, setProject] = useState(
        projectData || { name: "", budget: "", category_id: "" }
    );

    useEffect(() => {
        fetch("http://localhost:5000/categories")
            .then((resp) => resp.json())
            .then((data) => setCategories(data))
            .catch((error) => console.error("Erro ao buscar categorias:", error));
    }, []);

    function handleChange(e) {
        setProject({ ...project, [e.target.name]: e.target.value });
    }

    function handleCategory(e) {
        const selectedCategory = e.target.value;
        const categoryName = e.target.options[e.target.selectedIndex].text;
        setProject({
            ...project,
            category_id: selectedCategory,
            category: { id: selectedCategory, name: categoryName },
        });
    }

    const submit = (e) => {
        e.preventDefault();
        handleSubmit(project);
    };

    return (
        <form onSubmit={submit}>
            <Input
                type="text"
                text="Nome do projeto"
                name="name"
                placeholder="Insira o nome do projeto"
                handleOnChange={handleChange}
                value={project.name}
            />
            <Input
                type="number"
                text="Orçamento do projeto"
                name="budget"
                placeholder="Insira o orçamento total"
                handleOnChange={handleChange}
                value={project.budget}
            />
            <Select
                name="category_id"
                text="Selecione a categoria"
                options={categories}
                handleOnChange={handleCategory}
                value={project.category_id}
            />
            <SubmitButton text={btnText} />
        </form>
    );
}

export default ProjectForm;
