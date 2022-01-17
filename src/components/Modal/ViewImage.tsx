import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  const handleCloseModal = (): void => {
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleCloseModal} isCentered size="4xl">
      <ModalOverlay />
      <ModalContent mx="auto" w="auto" h="auto" maxW="900px" maxH="600px">
        <ModalBody p="0">
          <Image src={imgUrl} maxW="900px" maxH="600px" objectFit="cover" />
        </ModalBody>
        <ModalFooter
          h={8}
          px={3}
          borderBottomRadius="md"
          bgColor="pGray.800"
          justifyContent="start"
        >
          <Link href={imgUrl} target="_blank" fontSize="14px" fontWeight="400">
            Abrir original
          </Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
