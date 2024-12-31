import styles from './Input.module.css'

function input({type, text, name, placeholder, handleOnchange, value}) {
    return(
        <div className={styles.form_control}>
            <label htmlFor={name}>{text}:</label>
            <input 
            type={type}
            name={name}
            id={name}
            placeholder={placeholder}
            onChange={handleOnchange}
            />
        </div>
    )
}

export default input;