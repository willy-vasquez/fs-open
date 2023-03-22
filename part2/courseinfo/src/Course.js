import React from 'react';

export const Course = ({ course }) => {
  const { id, name, parts } = course;
  return (
    <div key={id}>
      <Header name={name} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  );
};

const Header = ({ name }) => {
  return <h1>{name}</h1>;
};

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
    </>
  );
};

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
};

const Total = ({ parts }) => {
  const getTotal = () => {
    return parts.reduce((acc, curr) => acc + curr.exercises, 0);
  };
  return <p style={{ fontWeight: 800 }}>Number of exercises {getTotal()}</p>;
};
