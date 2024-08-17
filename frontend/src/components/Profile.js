import { Box, Image, Text, VStack } from '@chakra-ui/react';
import Posts from './Posts';

const Profile = () => {
  return (
    <Box>
      <VStack p={7} m="auto" width="fit-content" borderRadius={6} bg="gray.700">
        <Image
          borderRadius="full"
          boxSize="80px"
          src="https://img.freepik.com/premium-vector/man-avatar-profile-round-icon_24640-14044.jpg?w=1060"
          alt="Profile"
        />
        <Text>Varun</Text>
        <Text fontSize="lg" color="gray.400">
          Software Engineer
        </Text>
      </VStack>

      <Posts />
    </Box>
  );
};
export default Profile;
