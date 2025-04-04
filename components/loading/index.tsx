import { Box, Motion, Theme, useTheme } from '@interest-protocol/ui-kit';
import { FC } from 'react';

const Loading: FC = () => {
  const { dark } = useTheme() as Theme;

  const boxColor = [dark ? '#FBF8FD' : '#131316', dark ? '#B4C5FF' : '#0053DB'];

  return (
    <Box position="relative">
      <Motion
        width="1rem"
        height="1rem"
        position="absolute"
        background={boxColor[0]}
        transition={{ duration: 3, ease: 'backOut', repeat: Infinity }}
        animate={{
          scale: [1, 0.75, 0.5, 1],
          x: ['0rem', '0.5rem', '1rem', '0rem'],
          y: ['0rem', '0.5rem', '1rem', '0rem'],
          background: [boxColor[0], boxColor[1], boxColor[0]],
        }}
      />
      <Motion
        width="1rem"
        height="1rem"
        position="absolute"
        background={boxColor[0]}
        transition={{ duration: 3, ease: 'backOut', repeat: Infinity }}
        animate={{
          scale: [1, 0.75, 0.5, 1],
          x: ['0rem', '0.5rem', '1rem', '0rem'],
          y: ['0rem', '-0.5rem', '0rem', '0rem'],
          background: [boxColor[0], boxColor[1], boxColor[0]],
        }}
      />
      <Motion
        width="1rem"
        height="1rem"
        position="absolute"
        background={boxColor[0]}
        transition={{ duration: 3, ease: 'backOut', repeat: Infinity }}
        animate={{
          scale: [1, 0.75, 0.5, 1],
          x: ['0rem', '0.5rem', '1rem', '0rem'],
          y: ['0rem', '-0.5rem', '-1rem', '0rem'],
          background: [boxColor[0], boxColor[1], boxColor[0]],
        }}
      />
      <Motion
        width="1rem"
        height="1rem"
        position="absolute"
        background={boxColor[0]}
        transition={{ duration: 3, ease: 'backOut', repeat: Infinity }}
        animate={{
          scale: [1, 0.75, 0.5, 1],
          x: ['0rem', '-0.5rem', '0rem', '0rem'],
          y: ['0rem', '0.5rem', '1rem', '0rem'],
          background: [boxColor[0], boxColor[1], boxColor[0]],
        }}
      />
      <Motion
        width="1rem"
        height="1rem"
        position="absolute"
        background={boxColor[0]}
        transition={{ duration: 3, ease: 'backOut', repeat: Infinity }}
        animate={{
          scale: [1, 0.75, 0.5, 1],
          x: ['0rem', '-0.5rem', '0rem', '0rem'],
          y: ['0rem', '-0.5rem', '0rem', '0rem'],
          background: [boxColor[0], boxColor[1], boxColor[0]],
        }}
      />
      <Motion
        width="1rem"
        height="1rem"
        position="absolute"
        background={boxColor[0]}
        transition={{ duration: 3, ease: 'backOut', repeat: Infinity }}
        animate={{
          scale: [1, 0.75, 0.5, 1],
          x: ['0rem', '-0.5rem', '0rem', '0rem'],
          y: ['0rem', '-0.5rem', '-1rem', '0rem'],
          background: [boxColor[0], boxColor[1], boxColor[0]],
        }}
      />
      <Motion
        width="1rem"
        height="1rem"
        position="absolute"
        background={boxColor[0]}
        transition={{ duration: 3, ease: 'backOut', repeat: Infinity }}
        animate={{
          scale: [1, 0.75, 0.5, 1],
          x: ['0rem', '-0.5rem', '-1rem', '0rem'],
          y: ['0rem', '-0.5rem', '0rem', '0rem'],
          background: [boxColor[0], boxColor[1], boxColor[0]],
        }}
      />
      <Motion
        width="1rem"
        height="1rem"
        position="absolute"
        background={boxColor[0]}
        transition={{ duration: 3, ease: 'backOut', repeat: Infinity }}
        animate={{
          scale: [1, 0.75, 0.5, 1],
          x: ['0rem', '-0.5rem', '-1rem', '0rem'],
          y: ['0rem', '-0.5rem', '-1rem', '0rem'],
          background: [boxColor[0], boxColor[1], boxColor[0]],
        }}
      />
      <Motion
        width="1rem"
        height="1rem"
        position="absolute"
        background={boxColor[0]}
        transition={{ duration: 3, ease: 'backOut', repeat: Infinity }}
        animate={{
          scale: [1, 0.75, 0.5, 1],
          x: ['0rem', '-0.5rem', '-1rem', '0rem'],
          y: ['0rem', '0.5rem', '1rem', '0rem'],
          background: [boxColor[0], boxColor[1], boxColor[0]],
        }}
      />
    </Box>
  );
};

export default Loading;
