const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  )
}

const Content = (props) => {
  return (
    <>
      <Part name={props.pe.parts[0]} exercises={props.pe.exercises[0]} />
      <Part name={props.pe.parts[1]} exercises={props.pe.exercises[1]} />
      <Part name={props.pe.parts[2]} exercises={props.pe.exercises[2]} />
    </>
  )
}

const Total = (props) => {
  return (
    <>
      <p>Number of exercises {props.total}</p>
    </>
  )
}

const Part = (props) => {
  return (
    <>
      <p>{props.name} {props.exercises}</p>
    </>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content
        pe={{
          parts: [part1, part2, part3],
          exercises: [exercises1, exercises2, exercises3],
        }}
      />
      <Total total={exercises1 + exercises2 + exercises3} />
    </div>
  )
}

export default App