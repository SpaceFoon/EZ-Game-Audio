import { ActionIcon, useMantineColorScheme } from '@mantine/core';
import { SunIcon, MoonIcon } from '@radix-ui/react-icons';

export default function SwitchTheme() {
    
    const { colorScheme, toggleTheme } = useMantineColorScheme();
    const dark = colorScheme === 'dark';

    return (
        <div className="App">
            <ActionIcon
             variant="outline"
             color={dark ? 'yellow' : 'blue'}
             onClick={() => {toggleTheme()}}
             title='Toggle Theme'
            >
                {dark ? (
                    <SunIcon style={{ width: 20, height: 20 }} />
                ) : (
                    <MoonIcon style={{ width: 20, height: 20 }} />
                )}
            </ActionIcon>
            
            
        </div>
    )
    
}