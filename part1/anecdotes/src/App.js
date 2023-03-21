import { useState } from 'react';

export const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.',
  ];

  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));
  const [selected, setSelected] = useState(0);

  const nextAnecdote = () => {
    let next = selected;
    while (next === selected) {
      next = Math.floor(Math.random() * anecdotes.length);
    }
    setSelected(next);
  };

  const addVote = () => {
    const aux = [...votes];
    aux[selected] += 1;
    setVotes([...aux]);
  };

  const getMostVoteAnecdote = () => {
    const aux = [...votes];
    const getHigh = aux.sort((a, b) => b - a)[0];
    if (getHigh === 0) return '';
    const mostVoted = votes.indexOf(getHigh);
    return anecdotes[mostVoted];
  };

  return (
    <div>
      <div>
        <h1>Anecdote of the day</h1>
        <p>{anecdotes[selected]}</p>
        <p>has {votes[selected]} votes</p>
        <button onClick={addVote}>vote</button>
        <button onClick={nextAnecdote}>next anecdote</button>
      </div>
      {getMostVoteAnecdote() !== '' && (
        <div>
          <h1>Anecdote with most votes</h1>
          <p>{getMostVoteAnecdote()}</p>
        </div>
      )}
    </div>
  );
};
