import React, { useState } from 'react';
import {
  Button,
  ButtonGroup,
  ChakraProvider,
  Container,
  Flex,
  Heading,
  Text,
} from '@chakra-ui/react';

const choices = ['rock', 'paper', 'scissors'];
const outcomes = {
  rock: {
    beats: 'scissors',
    message: 'Rock smashes scissors!',
  },
  paper: {
    beats: 'rock',
    message: 'Paper covers rock!',
  },
  scissors: {
    beats: 'paper',
    message: 'Scissors cut paper!',
  },
};

function App() {
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState('');
  const [gamesPlayed, setGamesPlayed] = useState(0);

  const resetGame = () => {
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult('');
  };

  const handlePlayerChoice = (choice) => {
    const computerRandomChoice = choices[Math.floor(Math.random() * choices.length)];
    setPlayerChoice(choice);
    setComputerChoice(computerRandomChoice);

    if (choice === computerRandomChoice) {
      setResult("It's a tie!");
    } else if (outcomes[choice].beats === computerRandomChoice) {
      setResult('You win! ' + outcomes[choice].message);
    } else {
      setResult('You lose! ' + outcomes[computerRandomChoice].message);
    }

    setGamesPlayed(gamesPlayed + 1);
  };

  return (
    <Container maxW="md" py={10}>
      <Heading as="h1" size="xl" mb={6} textAlign="center">
        Rock Paper Scissors
      </Heading>
      <Heading as="h2" size="md" mb={4} textAlign="center">
        Games Played: {gamesPlayed}
      </Heading>
      <Flex justify="center" mb={6}>
        <ButtonGroup>
          {choices.map((choice) => (
            <Button
              key={choice}
              colorScheme={playerChoice === choice ? 'green' : null}
              onClick={() => handlePlayerChoice(choice)}
              disabled={result !== ''}
            >
              {choice}
            </Button>
          ))}
        </ButtonGroup>
      </Flex>
      {playerChoice && computerChoice && (
        <Flex justify="center">
          <Text fontSize="xl" fontWeight="bold" mb={4}>
            You chose: {playerChoice}
          </Text>
          <Text fontSize="xl" fontWeight="bold" mx={4}>
            Computer chose: {computerChoice}
          </Text>
        </Flex>
      )}
      {result && (
        <Flex justify="center" direction="column" alignItems="center">
          <Text fontSize="2xl" fontWeight="bold" my={4}>
            {result}
          </Text>
          <Button colorScheme="teal" size="md" onClick={resetGame}>
            Start New Game
          </Button>
        </Flex>
      )}
    </Container>
  );
}

function Root() {
  return (
    <ChakraProvider>
      <App />
    </ChakraProvider>
  );
}

export default Root;
