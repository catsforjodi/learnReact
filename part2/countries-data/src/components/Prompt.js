const Prompt = ({tooManyMatches}) => {
    if (tooManyMatches) {
        return <div>Too many matches, specify another filter</div>
    }
}

export default Prompt


