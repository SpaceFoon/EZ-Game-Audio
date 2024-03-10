declare namespace JSX {
    interface WaveformProps {
    size?: string | number;
    stroke?: string | number;
    speed?: string | number;
    color?: string;
}
        interface IntrinsicElements {
            'l-waveform': WaveformProps; // Use the custom props interface
        }
    
}
