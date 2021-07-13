import Form from "./Form"

function DefinitionsList(props) {
    return (
        <div>
            {props.definitions.map(definition => <Form key={definition.id} {...definition} />)}
        </div>
    )
}

export default DefinitionsList;