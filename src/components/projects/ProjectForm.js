import Input from '../form/input'

import styles from './ProjectForm.module.css';

function ProjectForm(){
    return (
        <form className={styles.form}>
            <Input 
            type="text"
            text="Nome do projeto"
            name="name"
            placeholder="Insira o nome do projeto"
            />
            <Input 
            type="number"
            text="Orçamento do projeto"
            name="budget"
            placeholder="Insira o orçamento total"
            />
            <div>
                <select name="category_id">
                    <option disabled selected>Selecione a categorio</option>
                </select>
            </div>
            <div>
                <input type="submit" value="Criar projeto"/>
            </div>
        </form>
    )
}

export default ProjectForm