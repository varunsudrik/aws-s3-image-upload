import { Box, Button, Input, Text, Image } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import axiosClient, { post, get } from '../config/axios';

const Posts = () => {
  const validFile = ['image/jpg', 'image/png', 'image/jpeg'];
  const [error, setError] = useState(false);
  const [imageLink, setImageLink] = useState({});

  useEffect(() => {
    getImages();
  }, []);

  const handelUpload = async e => {
    const file = e.target.files[0];
    const url = '/images';
    // console.log(file);

    if (!validFile.includes(file.type)) {
      setError(true);
    } else setError(false);
    const form = new FormData();
    form.append('image', file);
    await post(url, form);
  };

  const getImages = async () => {
    const dataArray = await get('/get-images');
    // console.log(dataArray.images);
    if (dataArray.images) {
      setImageLink(dataArray.images);
    }
  };
  // console.log(imageLink);
  return (
    <Box mt={6}>
      {error && (
        <>
          <Text color="red">Not Valid File</Text>
        </>
      )}

      <Input id="uploadImg" type="file" hidden onChange={handelUpload} />
      <Button
        as="label"
        htmlFor="uploadImg"
        colorScheme="blue"
        variant="outline"
        mb={4}
        cursor="pointer"
      >
        Upload
      </Button>

      <Text textAlign="left" mb={4}>
        Posts
        {imageLink &&
          imageLink.length > 0 &&
          imageLink?.map(img => (
            <Image boxSize="150px" key={img} src={img} alt="Profile" />
          ))}
      </Text>
    </Box>
  );
};
export default Posts;
