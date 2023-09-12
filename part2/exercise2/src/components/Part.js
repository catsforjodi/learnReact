const Part = ({part}) => {
    // console.log(part)
    return(
        <div key={part.id}>
            {part.name} {part.exercises}
        </div>
    )
}

export default Part