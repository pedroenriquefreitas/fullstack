import React from 'react'

const Courses = (props) => {
   const tot_courses = () => props.courses.map(course =>
    <Course courses={course} key={course.id} />
  )
   return (
     <div>
       {tot_courses()}
     </div>
   )
 }

const Course = (props) => {
  return (
    <div>
     <Header courses={props.courses} />
     <Content courses={props.courses}/>
     <Total courses={props.courses} />
    </div>
  )
}

const Header = (props) => {
  return (
    <div>
      <h1>{props.courses.name}</h1>
    </div>
  )
}

const Total = (props) => {
  const total = props.courses.parts.reduce((sum, p) => {
    return sum + p.exercises;
  }, 0)

  return (
    <div>
      <b>total of {total} exercises</b>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>
        {props.part} {props.exercises}
      </p>
    </div>
  )
}

const Content = (props) => {

  const lines = () => props.courses.parts.map(part =>
   <Part part={part.name} exercises={part.exercises} key={part.id} />
 )
  return (
    <div>
      {lines()}
    </div>
  )
}

export default Courses
