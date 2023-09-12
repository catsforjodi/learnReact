import Part from './Part'

const Course = ({ course }) => {
    return (
        <div>
            <h1>{course.name}</h1>
            {course.parts.map(part =>
                <Part part={part} key={part.id} />
            )}
            <strong>
                total of {course.parts.reduce((accumulator, currentValue) => accumulator + currentValue.exercises
                    , 0
                )} exercises
            </strong>
        </div>
    )
}

export default Course