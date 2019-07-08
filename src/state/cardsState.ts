import { createStore } from 'hookstated';

export type Card = {
  front: string;
  back: string;
  notes: string[];
  tags: string[];
  isArchieved: boolean;
};

type cardsState = {
  cards: Card[];
};

const cardsState = createStore<cardsState>('cards', {
  state: {
    cards: [
      {
        front: 'front',
        back: 'back',
        tags: [],
        notes: [],
        isArchieved: false,
      },
      {
        front: 'front',
        back: 'back',
        tags: [],
        notes: [],
        isArchieved: false,
      },
      {
        front: 'front',
        back: 'back',
        tags: [],
        notes: [],
        isArchieved: false,
      },
    ],
  },
});

export default cardsState;
