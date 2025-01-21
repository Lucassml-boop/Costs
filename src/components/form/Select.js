import styles from './Select.module.css';

function Select({ options = [], text, name, handleOnChange, value }) {
    return (
        <div className={styles.form_control}>
            <label htmlFor={name}>{text}:</label>
            <select
                name={name}
                id={name}
                onChange={handleOnChange}
                value={value || ''}
            >
                <option value="" disabled>
                    Selecione uma opção
                </option>
                {options.length > 0 ? (
                    options.map((option) => (
                        <option value={option.id} key={option.id}>
                            {option.name}
                        </option>
                    ))
                ) : (
                    <option disabled>Nenhuma opção disponível</option>
                )}
            </select>
        </div>
    );
}

export default Select;
