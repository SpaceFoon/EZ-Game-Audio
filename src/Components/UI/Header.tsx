import { Grid } from '@mantine/core';
import  SwitchTheme from './SwitchTheme';

export default function Header  () {
  return (
    <>
    <Grid>
        <Grid.Col span={2}><SwitchTheme/></Grid.Col>
        <Grid.Col span={8}><h1>EZ Batch Audio Converter</h1></Grid.Col>
        <Grid.Col span={2}></Grid.Col>
    </Grid>
    </>
  )
}