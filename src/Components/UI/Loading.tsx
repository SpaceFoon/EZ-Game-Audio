import React from 'react';
import 'ldrs/waveform';


interface WaveformProps {
    size?: string | number;
    stroke?: string | number;
    speed?: string | number;
    color?: string;
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'l-waveform': WaveformProps;
        }
    }
}

const Loading: React.FC<WaveformProps> = ({
    size = "45",
    stroke = "3.5",
    speed = ".7",
    color = "white"
}) => {
    return (
        <l-waveform
            size={size}
            stroke={stroke}
            speed={speed}
            color={color}
        />
    );
};

export default Loading;
