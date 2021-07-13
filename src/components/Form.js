function Form({id, description}) {
    return (
        <div className="definition">
            <h3 id={`definition-${id}`}>{description}</h3>
            <input type="text" name="answer" id={`answer-${id}`} />
        </div>
    )
}

export default Form;