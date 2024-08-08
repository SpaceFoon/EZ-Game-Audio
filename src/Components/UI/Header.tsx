/**
 * Renders the application header with the given props.
 * @param {boolean} isDarkMode - Whether the application is in dark mode or not.
 * @returns {JSX.Element} The application header.
 */
import { Grid, Title, Center, Container, Group, Burger, Drawer, Button, Text } from '@mantine/core';
import SwitchTheme from './SwitchTheme';
import { IconMusic } from '@tabler/icons-react';
import { FaMusic } from 'react-icons/fa';
import { useDisclosure } from '@mantine/hooks';
  const [opened, { toggle }] = useDisclosure(false);
export default function Header() {
  return (
    <Container>
      {/* <Paper shadow= "xs" p="xl"> */}
      <Grid align="center" justify="space-between" style={{ padding: '20px 0' }}>
        <Grid.Col span={2}>
          <Center>
            <FaMusic size={32} />
            <IconMusic size={32} />
            
            <Text size="l"> Test Text </Text>
            <img src="src\assets\EZ-PZ-logo.webp" alt="EZ Batch Audio Converter" height="64" />
          </Center>
        </Grid.Col>
        <Grid.Col span={8}>
          <Center>
            <Title order={1} style={{ fontFamily: 'Arial, sans-serif', fontWeight: 700 }}>
              EZ Batch Audio Converter
            </Title>
          </Center>
        </Grid.Col>
    <Grid.Col span={2}>
          <Group align='right'>
            <Burger opened={opened} onClick={toggle} />
          </Group>
        </Grid.Col>
      </Grid>
{/* 
      <Drawer
        opened={opened}
        onClose={toggle}
        title="Menu"
        padding="xl"
        size="md"
      >
        <Button variant="subtle" fullWidth onClick={toggle}>Convert</Button>
        <Button variant="subtle" fullWidth onClick={toggle}>Options</Button>
        <Button variant="subtle" fullWidth onClick={toggle}>About</Button>
        <Button variant="subtle" fullWidth onClick={toggle}>Exit</Button>
      </Drawer> */}
    </Container>
  );
}