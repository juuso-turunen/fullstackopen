const Header = (props) => <h2>{props.course}</h2>

const Content = ({parts}) => (
  <div>
    {parts.map((part) =>
      <Part key={part.id} part={part} />
    )}
  </div>
)

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
)

const Total = ({parts}) =>
<p><strong>
  Number of exercises {parts.reduce((sum, part) => sum + part.exercises, 0)}
</strong></p>

const Course = ({course}) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course