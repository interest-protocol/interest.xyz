import { Box, Typography } from '@interest-protocol/ui-kit';
import { propOr } from 'ramda';
import { ChangeEventHandler, DragEventHandler, FC, useState } from 'react';
import toast from 'react-hot-toast';

import { FolderSVG } from '@/components/svg';

import { CreateTokenFormImageProps } from '../create-token.types';
import { getBase64 } from '../create-token.utils';

const CreateTokenFormImage: FC<CreateTokenFormImageProps> = ({ setValue }) => {
  const [dragging, setDragging] = useState(false);

  const handleChangeFile: ChangeEventHandler<HTMLInputElement> = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return toast.error('Something went wrong');

    if (!file.type.includes('image/'))
      return toast.error('Make sure that you are sending an image');

    const imageBase64 = await getBase64(file).catch(() =>
      toast.error('Something went wrong')
    );

    setValue('imageUrl', imageBase64);
  };

  const handleDropFile: DragEventHandler<HTMLDivElement> = async (e) => {
    e.preventDefault();

    if (e.dataTransfer.items) {
      const item = e.dataTransfer.items[0];

      if (item.kind !== 'file' || !item.type.includes('image/'))
        return toast.error('Make sure that you are sending an image');

      const file = item.getAsFile();

      if (!file) return toast.error('Something went wrong');

      const imageBase64 = await getBase64(file).catch((e) =>
        toast.error(propOr('Something went wrong', 'message', e))
      );

      setValue('imageUrl', imageBase64);

      return;
    }

    const file = e.dataTransfer.files[0];

    if (!file) return toast.error('Something went wrong');

    if (!file.type.includes('image/'))
      return toast.error('Make sure that you are sending an image');

    const imageBase64 = await getBase64(file).catch(() =>
      toast.error('Something went wrong')
    );

    setValue('imageUrl', imageBase64);
  };

  return (
    <Box
      p="l"
      gap="m"
      display="flex"
      bg="#9CA3AF1A"
      borderRadius="xs"
      borderWidth="1px"
      alignItems="center"
      height="4.59375rem"
      onDrop={handleDropFile}
      width={['100%', '19.5rem']}
      border="1px solid #BBB9FD99"
      onDragEnter={() => setDragging(true)}
      onDragLeave={() => setDragging(false)}
      onDragOver={(e) => e.preventDefault()}
      borderStyle={dragging ? 'solid' : 'dashed'}
      borderColor={dragging ? 'primary' : 'outlineVariant'}
    >
      <FolderSVG maxWidth="1.4rem" maxHeight="1.4rem" width="100%" />

      <Typography
        size="medium"
        variant="label"
        color="#FFFFFF"
        fontFamily="Inter"
        fontSize="0.875rem"
      >
        Drop your file here or{' '}
        <Typography
          as="label"
          size="medium"
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          htmlFor="file"
          variant="label"
          color="primary"
          cursor="pointer"
          fontFamily="Inter"
          textDecoration="underline"
        >
          upload
        </Typography>
        <Box display="none">
          <input
            id="file"
            type="file"
            accept="image/*"
            onChange={handleChangeFile}
          />
        </Box>
      </Typography>
    </Box>
  );
};

export default CreateTokenFormImage;
