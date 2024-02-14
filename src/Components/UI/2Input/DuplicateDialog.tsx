import { useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, Group, Text } from '@mantine/core';

export default function DuplicateDialog({conversionList, handleDuplicate}) {
  const [opened, { close, open }] = useDisclosure(false);
  const [response, setResponse] = useState(null);

  const handleButtonClick = (response) => {
    setResponse(response);
    handleDuplicate(response);
    close();
  }

  return (
    <>
      <Modal opened={opened} onClose={close} size="auto" title="File already exists!">
        <Text>The file ${outputFile} already exists </Text>

        <Group wrap="nowrap" mt="md">
        </Group>

        <Group mt="xl">
          <Button onClick={() => handleButtonClick("o")}>Overwrite</Button>
          <Button onClick={() => handleButtonClick("r")}>Rename</Button>
          <Button onClick={() => handleButtonClick("s")}>Skip</Button>
          {/* put a line break here */}
          
          <Button onClick={() => handleButtonClick("oa")}> Overwrite All</Button>
          <Button onClick={() => handleButtonClick("ra")}>Rename All</Button>
          <Button onClick={() => handleButtonClick("sa")}>Skip All</Button>
        </Group>
      </Modal>
    </>
  );
}