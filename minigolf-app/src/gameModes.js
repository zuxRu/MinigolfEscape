export const GAME_MODES = [
  {
    id: 'standard',
    name: 'Standard Mode',
    description: 'Classic mini-golf scoring',
    icon: '⛳',
    prompts: {
      1: { type: 'standard', text: 'Play hole 1 as normal. Good luck!' },
      2: { type: 'standard', text: 'Keep up the momentum!' },
      3: { type: 'standard', text: 'Halfway through the front 9!' },
      4: { type: 'standard', text: 'Focus and aim carefully' },
      5: { type: 'standard', text: 'You\'re doing great!' },
      6: { type: 'standard', text: 'Almost there!' },
      7: { type: 'standard', text: 'Keep your eye on the ball' },
      8: { type: 'standard', text: 'One more hole to go!' },
      9: { type: 'standard', text: 'Final hole - make it count!' },
    }
  },
  {
    id: 'chaos',
    name: 'Chaos Mode',
    description: 'Random challenges and wild twists!',
    icon: '🌪',
    prompts: {
      1: {
        type: 'spinner',
        text: 'Spin the wheel!',
        options: [
          'Play with eyes closed',
          '+2 strokes if you miss',
          'Use opposite hand',
          'Double points this hole'
        ]
      },
      2: {
        type: 'challenge',
        text: 'Everyone must hop on one foot while putting!',
        penalty: 1
      },
      3: {
        type: 'question',
        text: 'Who can name 5 countries starting with "S"?',
        reward: 'Winner gets -1 stroke'
      },
      4: {
        type: 'modifier',
        text: 'Score multiplier: x2 this hole!',
        icon: '✖️'
      },
      5: {
        type: 'spinner',
        text: 'Spin for your fate!',
        options: [
          'Backwards shot required',
          'No penalty strokes',
          'Must sing while putting',
          'Free mulligan'
        ]
      },
      6: {
        type: 'challenge',
        text: 'Take your shot while doing a silly dance!',
        penalty: 0
      },
      7: {
        type: 'dare',
        text: 'Lowest score must do 5 push-ups',
        icon: '💪'
      },
      8: {
        type: 'spinner',
        text: 'What will it be?',
        options: [
          'Switch balls with another player',
          'Play left-handed only',
          'Must compliment every shot',
          'Bonus: -2 strokes for hole-in-one'
        ]
      },
      9: {
        type: 'challenge',
        text: 'FINAL CHAOS: Everyone closes eyes for this putt!',
        penalty: 2
      },
    }
  },
  {
    id: 'date_night_pg',
    name: 'Date Night (PG)',
    description: 'Fun questions for couples!',
    icon: '💕',
    prompts: {
      1: {
        type: 'question',
        text: 'If you could travel anywhere together, where would you go?',
        note: 'Discuss while you play!'
      },
      2: {
        type: 'challenge',
        text: 'Take a selfie together mid-putt!',
        bonus: 'Post and tag @thegreatescape for -2 strokes'
      },
      3: {
        type: 'question',
        text: 'What\'s your favorite memory together?',
        note: 'Share your stories!'
      },
      4: {
        type: 'dare',
        text: 'Loser of this hole serenades the winner!',
        icon: '🎵'
      },
      5: {
        type: 'question',
        text: 'If you could have any superpower as a couple, what would it be?',
        note: 'Be creative!'
      },
      6: {
        type: 'challenge',
        text: 'Play this hole while holding hands!',
        penalty: 0
      },
      7: {
        type: 'question',
        text: 'What\'s something new you want to try together?',
        note: 'Dream big!'
      },
      8: {
        type: 'dare',
        text: 'Winner gets to choose what to have for dinner tonight!',
        icon: '🍽'
      },
      9: {
        type: 'challenge',
        text: 'Final hole: Make a wish together before putting!',
        bonus: 'Hole-in-one makes it come true! ✨'
      },
    }
  },
  {
    id: 'drinking',
    name: 'Drinking Mode',
    description: 'Responsible fun for adults 18+',
    icon: '🍺',
    prompts: {
      1: {
        type: 'rule',
        text: 'Highest score this hole takes a sip!',
        icon: '🍻'
      },
      2: {
        type: 'challenge',
        text: 'Everyone takes a sip before putting',
        note: 'Steady hands!'
      },
      3: {
        type: 'rule',
        text: 'Hole-in-one: Everyone else drinks!',
        icon: '🎉'
      },
      4: {
        type: 'game',
        text: 'Never Have I Ever: Share before playing this hole',
        note: 'Loser takes a sip'
      },
      5: {
        type: 'rule',
        text: 'Score over 5 strokes: Take a sip per extra stroke',
        icon: '🍺'
      },
      6: {
        type: 'challenge',
        text: 'Truth or Dare: Loser of this hole chooses!',
        penalty: 0
      },
      7: {
        type: 'rule',
        text: 'Last place takes 2 sips',
        icon: '🥃'
      },
      8: {
        type: 'game',
        text: 'Categories: Name types of cocktails. First to mess up drinks!',
        note: 'Play while waiting'
      },
      9: {
        type: 'finale',
        text: 'FINAL HOLE: Overall loser finishes their drink!',
        icon: '🏆'
      },
    }
  }
];

export const getGameMode = (modeId) => {
  return GAME_MODES.find(mode => mode.id === modeId) || GAME_MODES[0];
};

export const getPromptForHole = (modeId, holeNumber) => {
  const mode = getGameMode(modeId);
  return mode.prompts[holeNumber] || { type: 'standard', text: 'Play this hole!' };
};
