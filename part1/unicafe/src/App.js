import { useState } from 'react';

export const App = () => {
  // save clicks of each button to its own state
  const [feedback, setFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
    all: 0,
    average: 0,
    positive: 0,
  });

  const addFeedback = (key) => {
    const all = ++feedback.all;
    const newFeedback = {
      ...feedback,
      [key]: ++feedback[key],
      all,
      average: ((feedback.good - feedback.bad) / all).toFixed(2),
      positive: ((feedback.good / all) * 100).toFixed(2),
    };
    setFeedback({ ...newFeedback });
  };

  return (
    <div>
      <div>
        <h1>give feedback</h1>
        <Button type={'good'} addFeedback={addFeedback} />
        <Button type={'neutral'} addFeedback={addFeedback} />
        <Button type={'bad'} addFeedback={addFeedback} />
      </div>
      <h1>statistics</h1>
      {feedback.all > 0 ? (
        <Statistics feedback={feedback} />
      ) : (
        <p>No feedback given</p>
      )}
    </div>
  );
};

const Button = ({ type, addFeedback }) => (
  <button onClick={() => addFeedback(type)}>{type}</button>
);

const Statistics = ({ feedback }) => {
  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={feedback.good} />
        <StatisticLine text="neutral" value={feedback.neutral} />
        <StatisticLine text="bad" value={feedback.bad} />
        <StatisticLine text="all" value={feedback.all} />
        <StatisticLine text="average" value={feedback.average} />
        <StatisticLine text="positive" value={feedback.positive} />
      </tbody>
    </table>
  );
};

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>
      {value}
      {text === 'positive' && <>%</>}
    </td>
  </tr>
);
